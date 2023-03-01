import { StyleSheet, Text, View } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { ExpenseContext } from "../store/expense-context"
import { getDateMinusDays } from "../util/date"
import { fetchExpenses } from "../util/http"

const RecentExpenses = () => {
	const expensesCtx = useContext(ExpenseContext)

	useEffect(() => {
		async function callFetchExpenses() {
			const expenses = await fetchExpenses()
			expensesCtx.setExpenses(expenses)
		}

		callFetchExpenses()
	}, [])

	const recentExpenses = expensesCtx.expenses.filter(expense => {
		const today = new Date()
		const date7DaysAgo = getDateMinusDays(today, 7)

		return expense.date > date7DaysAgo
	})

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
