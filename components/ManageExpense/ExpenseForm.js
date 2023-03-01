import { Alert, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import Input from "./Input"
import Button from "../../UI/Button"
import { getFormattedDate } from "../../util/date"
import { GlobalStyles } from "../../constants/styles"

const ExpenseForm = ({
	submitButtonLabel,
	onCancel,
	onSubmit,
	defaultValues,
}) => {
	const [inputs, setInputs] = useState({
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : "",
			isValid: true,
		},
		date: {
			value: defaultValues ? getFormattedDate(defaultValues.date) : "",
			isValid: true,
		},
		description: {
			value: defaultValues ? defaultValues.description : "",
			isValid: true,
		},
	})

	const inputChangedHandler = (inputIdentifier, enteredValue) => {
		setInputs(prevState => {
			return {
				...prevState,
				[inputIdentifier]: { value: enteredValue, isValid: true },
			}
		})
	}

	const submitHandler = () => {
		const expenseData = {
			amount: +inputs.amount.value,
			date: new Date(inputs.date.value),
			description: inputs.description.value,
		}

		console.log("expense data => ", expenseData)

		const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
		const dateIsValid = expenseData.date.toString() !== "Invalid Date"
		const descriptionIsValid = expenseData.description.trim().length > 0

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			setInputs(prevState => {
				return {
					amount: { value: prevState.amount.value, isValid: amountIsValid },
					date: { value: prevState.date.value, isValid: dateIsValid },
					description: {
						value: prevState.description.value,
						isValid: descriptionIsValid,
					},
				}
			})
			return
		}

		onSubmit(expenseData)
	}

	const formisValid =
		!inputs.amount.isValid ||
		!inputs.date.isValid ||
		!inputs.description.isValid

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputsRow}>
				<Input
					label="Amount"
					inValid={!inputs.amount.isValid}
					textInputConfig={{
						keyboardType: "decimal-pad",
						onChangeText: inputChangedHandler.bind(this, "amount"),
						value: inputs["amount"].value,
					}}
					style={styles.rowInput}
				/>
				<Input
					label="Date"
					inValid={!inputs.date.isValid}
					textInputConfig={{
						placeholder: "YYYY-MM-DD",
						maxLength: 10,
						onChangeText: inputChangedHandler.bind(this, "date"),
						value: inputs["date"].value,
					}}
					style={styles.rowInput}
				/>
			</View>
			<Input
				label="Description"
				inValid={!inputs.description.isValid}
				textInputConfig={{
					multiline: true,
					onChangeText: inputChangedHandler.bind(this, "description"),
					value: inputs["description"].value,
				}}
			/>
			{formisValid && (
				<Text style={styles.errorText}>
					Invalid Input Values - please check your entered data!!
				</Text>
			)}
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
	errorText: {
		textAlign: "center",
		color: GlobalStyles.colors.error500,
		margin: 8,
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
