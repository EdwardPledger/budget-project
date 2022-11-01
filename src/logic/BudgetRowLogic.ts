import BudgetRow from '../interfaces/BudgetRow'
import BudgetRowApis from '../apis/BudgetRowsApis'

class BudgetRowLogic {
  static Insert = async (budgetRow : BudgetRow) => {
      const insertedBudgetRow = await BudgetRowApis.Insert(budgetRow)

      if (insertedBudgetRow?.budget_row_id != undefined) {
        return insertedBudgetRow.budget_row_id
      }
      else throw new Error('Unable to insert budget row record for budget name ' + budgetRow.name)
  }

  static Update = async (budgetRow : BudgetRow) => {
    await BudgetRowApis.Update(budgetRow) 
  }

  
}

export default BudgetRowLogic