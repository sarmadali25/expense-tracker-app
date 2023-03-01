import { createContext, useReducer } from "react"

export const ExpenseContext = createContext({
	expenses: [],
	addExpense: ({ description, amount, date }) => {},
	setExpenses: expenses => {},
	deleteExpense: id => {},
	updateExpense: (id, { description, amount, date }) => {},
})

const expensesReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			const id = new Date().toString() + Math.random().toString()
			return [{ ...action.payload, id: id }, ...state]

		case "SET":
			const inverted = action.payload.reverse()
			return inverted
		case "UPDATE":
			const updateableExpenseIndex = state.findIndex(
				expense => expense.id === action.payload.id
			)

			const updateableExpense = state[updateableExpenseIndex]

			const updatedItem = { ...updateableExpense, ...action.payload.data }
			const updatedExpenses = [...state]
			updatedExpenses[updateableExpenseIndex] = updatedItem
			return updatedExpenses
		case "DELETE":
			return state.filter(expense => expense.id !== action.payload)
		default:
			return state
	}
}

function ExpenseContextProvider({ children }) {
	const [expensesState, dispatch] = useReducer(expensesReducer, [])

	function addExpense(expenseData) {
		dispatch({ type: "ADD", payload: expenseData })
	}

	function setExpenses(expenses) {
		dispatch({ type: "SET", payload: expenses })
	}
	function deleteExpense(id) {
		dispatch({ type: "DELETE", payload: id })
	}

	function updateExpense(id, expenseData) {
		dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } })
	}

	const value = {
		expenses: expensesState,
		addExpense: addExpense,
		setExpenses: setExpenses,
		updateExpense: updateExpense,
		deleteExpense: deleteExpense,
	}
	return (
		<ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
	)
}

export default ExpenseContextProvider
