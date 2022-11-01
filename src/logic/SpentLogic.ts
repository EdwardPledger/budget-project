import Spent from '../interfaces/Spent'
import SpentApis from '../apis/SpentApis'

class SpentLogic {
  static Insert = async (spentAmount : number) => {
    const currentDate = new Date()

    const spent : Spent = {
      spent: spentAmount,
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear()
    }

    const insertedSpent = await SpentApis.Insert(spent)

    if (insertedSpent?.spent_id != undefined) {
      return insertedSpent.spent_id
    }
    else throw new Error('Unable to insert spent record')
  }
}

export default SpentLogic