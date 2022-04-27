import BudgetRow from '../interfaces/BudgetRow'
import { supabase } from '../helpers/supabase'

const getBudgetRows = async () => {
  try {
    const response = await supabase
      .from<BudgetRow>('budget_row')
      .select('*')

      if (response.error) throw response.error
      else {
        return response.data
      }
  } catch (error) {
    alert(error)
  }
}

export default getBudgetRows