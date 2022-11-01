import BudgetBalance from '../interfaces/BudgetBalance'
import { supabase } from '../helpers/supabase'

class BudgetBalanceApis {
  static Insert = async (amount : number) => {
    try {
      const response = await supabase
      .from<BudgetBalance>('budget_balance')
      .insert([
        {
          current_balance: amount
        }
      ])

    if (response.error) throw response.error
    else return response.data[0]
    }
    catch (error) {
      console.log(error)
      alert(error)
    }
  }

  static getBudgetAmount = async () => {
    try {
      const response = await supabase
        .from<BudgetBalance>('budget_balance')
        .select('budget_balance_id, current_balance')

      if (response.error) throw response.error
      else {
        return response.data[0]
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  static updateBudgetAmount = async (budgetBalance: BudgetBalance) => {
    try {
      const response = await supabase
        .from<BudgetBalance>('budget_balance')
        .update({
          current_balance: budgetBalance.current_balance
        })
        .match({ budget_balance_id: budgetBalance.budget_balance_id })
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }
}

export default BudgetBalanceApis