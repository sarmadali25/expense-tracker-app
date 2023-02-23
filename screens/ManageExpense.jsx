import { StyleSheet, Text, View } from "react-native"
import React, { useContext, useLayoutEffect } from "react"
import IconButton from "../UI/IconButton"
import { GlobalStyles } from "../constants/styles"
import Button from "../UI/Button"
import { ExpenseContext } from "../store/expense-context"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"

const ManageExpense = ({ route, navigation }) => {
	const expensesCtx = useContext(ExpenseContext)
	const editedExpenseId = route.params?.expenseId
	const isEditing = !!editedExpenseId

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		})
	}, [navigation, isEditing])

	const deletePressHandler = () => {
		expensesCtx.deleteExpense(editedExpenseId)
		navigation.goBack()
	}
	const cancelHandler = () => {
		navigation.goBack()
	}
	const confirmHandler = expenseData => {
		if (isEditing) {
			expensesCtx.updateExpense(editedExpenseId, expenseData)
		} else {
			expensesCtx.addExpense(expenseData)
		}
		navigation.goBack()
	}
	return (
		<View style={styles.container}>
			<ExpenseForm
				submitButtonLabel={isEditing ? "Update" : "Add"}
				onSubmit={confirmHandler}
				onCancel={cancelHandler}
			/>

			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deletePressHandler}
					/>
				</View>
			)}
		</View>
	)
}

export default ManageExpense

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: "center",
	},
})
