import { StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import Input from "./Input"
import Button from "../../UI/Button"

const ExpenseForm = ({ submitButtonLabel, onCancel, onSubmit }) => {
	const [inputValues, setInputValues] = useState({
		amount: "",
		date: "",
		description: "",
	})

	const inputChangedHandler = (inputIdentifier, enteredValue) => {
		setInputValues(prevState => {
			return {
				...prevState,
				[inputIdentifier]: enteredValue,
			}
		})
	}

	const submitHandler = () => {
		const expenseData = {
			amount: +inputValues.amount,
			date: new Date(inputValues.date),
			description: inputValues.description,
		}

		onSubmit(expenseData)
	}

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputsRow}>
				<Input
					label="Amount"
					textInputConfig={{
						keyboardType: "decimal-pad",
						onChangeText: inputChangedHandler.bind(this, "amount"),
						value: inputValues["amount"],
					}}
					style={styles.rowInput}
				/>
				<Input
					label="Date"
					textInputConfig={{
						placeholder: "YYYY-MM-DD",
						maxLength: 10,
						onChangeText: inputChangedHandler.bind(this, "date"),
						value: inputValues["date"],
					}}
					style={styles.rowInput}
				/>
			</View>
			<Input
				label="Description"
				textInputConfig={{
					multiline: true,
					onChangeText: inputChangedHandler.bind(this, "description"),
					value: inputValues["description"],
				}}
			/>

			<View style={styles.buttons}>
				<Button style={styles.button} mode={"flat"} onPress={onCancel}>
					Cancel
				</Button>
				<Button style={styles.button} onPress={submitHandler}>
					{submitButtonLabel}
				</Button>
			</View>
		</View>
	)
}

export default ExpenseForm

const styles = StyleSheet.create({
	form: {
		marginTop: 80,
	},
	buttons: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
	title: {
		fontSize: 24,
		color: "white",
		fontWeight: "bold",
		marginVertical: 24,
		// textAlign: "center ",
	},
	inputsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rowInput: {
		flex: 1,
	},
})
