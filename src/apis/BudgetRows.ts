import BudgetRow from '../interfaces/BudgetRow'
import { supabase } from '../helpers/supabase'

class BudgetRowApis {
  static getBudgetRows = async () => {
    try {
      const response = await supabase
        .from<BudgetRow>('budget_row')
        .select('budget_row_id, name, budget_amount, spent')
  
        if (response.error) throw response.error
        else {
          return response.data
        }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }
  
  static insertBudgetRow = async (budgetRow : BudgetRow) => {
    try {
      const response = await supabase
        .from<BudgetRow>('budget_row')
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
      console.log(error)
      alert(error)
    }
  }

  static updateBudgetRow = async (budgetRow : BudgetRow) => {
    try {
      const response = await supabase
      .from<BudgetRow>('budget_row')
      .update({ 
        name: budgetRow.name,
        budget_amount: budgetRow.budget_amount,
        spent: budgetRow.spent
      })
      .match({ budget_row_id: budgetRow.budget_row_id })

      if (response.error) throw response.error
      else return response.data
    } catch (error) {
      console.log(error)
      alert(error)
    }

  }
}



export default BudgetRowApis