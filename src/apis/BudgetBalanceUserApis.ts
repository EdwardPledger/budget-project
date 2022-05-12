import BudgetBalanceUser from '../interfaces/BudgetBalanceUser'
import { supabase } from '../helpers/supabase'

class BudgetBalanceUserApis {
  static getBudgetBalanceUserByUserId = async (userAccountId : bigint) => {
    try {
      const response = await supabase
      .from<BudgetBalanceUser>('budget_balance_user')
      .select('budget_balance_id, user_account_id')
      .match({ user_account_id: userAccountId })

      if (response.error) throw response.error
      else return response.data
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  static insertBudgetBalanceUser = async (budgetBalanceId : bigint, userAccountId : bigint) => {
    try {
      const response = await supabase
      .from<BudgetBalanceUser>('budget_balance_user')
      .insert({
        budget_balance_id: budgetBalanceId,
        user_account_id: userAccountId
      })

      if (response.error) throw response.error
      else return response.data
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }
}

export default BudgetBalanceUserApis