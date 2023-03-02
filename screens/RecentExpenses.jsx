import { StyleSheet, Text, View } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { ExpenseContext } from "../store/expense-context"
import { getDateMinusDays } from "../util/date"
import { fetchExpenses } from "../util/http"
import LoadingOverlay from "../UI/LoadingOverlay"
import ErrorOverlay from "../UI/ErrorOverlay"

const RecentExpenses = () => {
	const [isFetching, setIsFetching] = useState(true)
	const [error, setError] = useState()
	const expensesCtx = useContext(ExpenseContext)

	useEffect(() => {
		async function callFetchExpenses() {
			setIsFetching(true)
			try {
				const expenses = await fetchExpenses()
				expensesCtx.setExpenses(expenses)
			} catch (error) {
				setError("Could Not Fetch Expenses!!")
			}
			setIsFetching(false)
		}

		callFetchExpenses()
	}, [])

	const recentExpenses = expensesCtx.expenses.filter(expense => {
		const today = new Date()
		const date7DaysAgo = getDateMinusDays(today, 7)

		return expense.date > date7DaysAgo
	})

	function errorHandler() {
		setError(null)
	}

	if (error && !isFetching) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />
	}

	if (isFetching) {
		return <LoadingOverlay />
	}

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod="Last 7 days"
			fallbackText="No Expenses Register For Last 7 days."
		/>
	)
}

export default RecentExpenses

const styles = StyleSheet.create({})
