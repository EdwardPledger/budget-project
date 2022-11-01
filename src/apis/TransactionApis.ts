import { supabase } from '../helpers/supabase'
import Transaction from '../interfaces/Transaction'

class TransactionApis {
  static getTransactions = async () => {
    try {
      const response = await supabase
        .from<Transaction>('transaction')

    if (response.error) throw response.error
    else return response.data
    }
    catch (error) {
      console.log(error)
      alert(error)
    }
  }

  static insertTransaction = async (transaction : Transaction) => {
    try {
      const response = await supabase
        .from<Transaction>('transaction')
        .insert([
          {
            name: transaction.name,
            amount: transaction.amount
          }
        ])
    }
    catch (error) {
      console.log(error)
      alert(error)
    }
  }
}

export default TransactionApis