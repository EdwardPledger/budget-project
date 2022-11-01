import Spent from '../interfaces/Spent'
import { supabase } from '../helpers/supabase'

class SpentApis {
  // Insert spent record
  static Insert = async (spent : Spent) => {
    try {
      const response = await supabase
        .from<Spent>('spent')
        .insert([
          {
            spent: spent.spent,
            month: spent.month,
            year: spent.year
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


  // Get spent record by spent_id
  static GetSpentById = async (spentId : number) => {
    try {
      const response = await supabase
        .from<Spent>('spent')
        .select('spent_id, spent, month, year')

      if (response.error) throw response.error
      else {
        return response.data[0]
      }
    }
    catch (error) {
      console.log(error)
      alert(error)
    }
  }
  
  // Update spent record by spent_id
  static UpdateSpentById = async (spent : Spent) => {
    try {
      const response = await supabase
        .from<Spent>('spent')
        .update({
          spent: spent.spent,
          month: spent.month,
          year: spent.year
        })
        .match({ spent_id: spent.spent_id }) 

      if (response.error) throw response.error
      else return response.data[0]
    }
    catch (error) {
      console.log(error)
      alert(error)
    }
  }
}

export default SpentApis