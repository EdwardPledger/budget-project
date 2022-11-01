import BudgetRow from '../interfaces/BudgetRow'
import { supabase } from '../helpers/supabase'

class BudgetRowApis {
  // Insert budget row record
  static Insert = async (budgetRow : BudgetRow) => {
    try {
      const response = await supabase
        .from<BudgetRow>('budget_row')
        .insert([
          { 
            name: budgetRow.name, 
            budget_amount: budgetRow.budget_amount,
            spent_id: budgetRow.spent_id
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

  static getBudgetRows = async () => {
    try {
      const response = await supabase
        .from<BudgetRow>('budget_row')
        .select('budget_row_id, name, budget_amount, spent_id')
  
        if (response.error) throw response.error
        else {
          return response.data
        }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  static Update = async (budgetRow : BudgetRow) => {
    try {
      const response = await supabase
        .from<BudgetRow>('budget_row')
        .update({ 
          name: budgetRow.name,
          budget_amount: budgetRow.budget_amount,
        })
        .match({ budget_row_id: budgetRow.budget_row_id })

      if (response.error) throw response.error
      else return response.data
    } 
    catch (error) {
      console.log(error)
      alert(error)
    }
  }

  static deleteBudgetRow = async (budgetRowId : number) => {
    try {
        const response = await supabase
        .from<BudgetRow>('budget_row')
        .delete()
        .match({ budget_row_id: budgetRowId })

        if (response.error) throw response.error
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }
}



export default BudgetRowApis