import { StyleSheet, Text, View } from "react-native"
import React, { useContext } from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { ExpenseContext } from "../store/expense-context"

const AllExpenses = () => {
	const expensesCtx = useContext(ExpenseContext)

	return (
		<ExpensesOutput
			expenses={expensesCtx.expenses}
			expensesPeriod="Total"
			fallbackText="No Expenses Registered Yet!!"
		/>
	)
}

export default AllExpenses

const styles = StyleSheet.create({})
