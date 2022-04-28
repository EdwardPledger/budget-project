import BudgetRow from '../interfaces/BudgetRow'
import { supabase } from '../helpers/supabase'

class BudgetRowApis {
  static getBudgetRows = async () => {
    try {
      const response = await supabase
        .from<BudgetRow>('budget_row')
        .select('name, budget_amount, spent')
  
        if (response.error) throw response.error
        else {
          return response.data
        }
    } catch (error) {
      alert(error)
    }
  }
  
  static insertBudgetRows = async (budgetRow : BudgetRow) => {
    try {
      const response = await supabase
        .from<BudgetRow>('budget-row')
        .insert([
          { 
            name: budgetRow.name, 
            budget_amount: budgetRow.budget_amount,
            spent: budgetRow.spent 
          }
        ])
      
      if (response.error) throw response.error
      else return response.data
    } catch (error) {
      alert(error)
    }
  }
}



export default BudgetRowApis