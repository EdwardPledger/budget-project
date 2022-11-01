interface Transaction {
  transaction_id?: number,
  budget_row_id: number,
  name: string,
  amount: number
}

export default Transaction