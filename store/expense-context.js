import { createContext, useReducer } from "react"

const DUMMY_EXPENSES = [
	{
		id: "e1",
		description: " A pair of shoes",
		amount: 59.66,
		date: new Date("2023-02-13"),
	},
	{
		id: "e2",
		description: " A pair of trousers",
		amount: 96.16,
		date: new Date("2023-02-10"),
	},
	{
		id: "e3",
		description: " A motivational book",
		amount: 15.61,
		date: new Date("2023-02-09"),
	},
	{
		id: "e4",
		description: " A cricket bat ",
		amount: 72,
		date: new Date("2023-02-01"),
	},
	{
		id: "e5",
		description: " A water bottle ",
		amount: 72,
		date: new Date("2023-01-01"),
	},
	{
		id: "e6",
		description: " A pair of shoes",
		amount: 59.66,
		date: new Date("2023-02-13"),
	},
	{
		id: "e7",
		description: " A pair of trousers",
		amount: 96.16,
		date: new Date("2023-02-10"),
	},
	{
		id: "e8",
		description: " A motivational book",
		amount: 15.61,
		date: new Date("2023-02-09"),
	},
	{
		id: "e9",
		description: " A cricket bat ",
		amount: 72,
		date: new Date("2023-02-01"),
	},
	{
		id: "e10",
		description: " A water bottle ",
		amount: 72,
		date: new Date("2023-01-01"),
	},
]

export const ExpenseContext = createContext({
	expenses: [],
	addExpense: ({ description, amount, date }) => {},
	deleteExpense: id => {},
	updateExpense: (id, { description, amount, date }) => {},
})

const expensesReducer = (state, action) => {
	switch (action.type) {
		case "ADD":
			const id = new Date().toString() + Math.random().toString()
			return [{ ...action.payload, id: id }, ...state]
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
	const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

	function addExpense(expenseData) {
		dispatch({ type: "ADD", payload: expenseData })
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
		updateExpense: updateExpense,
		deleteExpense: deleteExpense,
	}
	return (
		<ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
	)
}

export default ExpenseContextProvider
