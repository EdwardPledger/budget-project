<template>
  <BudgetAmount 
    :budgetAmount="budgetAmount"  
  />
  <BudgetTable 
    @openUpdateBudgetRowModal="openUpdateBudgetRowModal"
    @addBudgetRow="addBudgetRow"
    @deleteBudgetRow="deleteBudgetRow" 
    :budgetRows="budgetRows" 
  />
  <UpdateCategoryModal 
    v-if="isModalVisible" 
    @submitUpdateBudgetRowModal="submitUpdateBudgetRowModal" 
    :budgetRow="budgetRowToBeUpdated" 
  />
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import BudgetRow from '../interfaces/BudgetRow'
import BudgetTable from './BudgetTable.vue'
import UpdateCategoryModal from './UpdateCategoryModal.vue'
import BudgetAmount from './BudgetAmount.vue'
import BudgetRowApis from '../apis/BudgetRows'

export default defineComponent({
  components: {  BudgetAmount, BudgetTable, UpdateCategoryModal },
  async setup() {
    const budgetRows = ref<BudgetRow[] | undefined>()
    budgetRows.value = await BudgetRowApis.getBudgetRows()

    const budgetAmount = ref<number>(2000)
    let isModalVisible = ref<boolean>(false)
    let budgetRowToBeUpdated = ref<BudgetRow>()
    //TODO: better way to handle null & length 0
    const openUpdateBudgetRowModal = (budgetRow : BudgetRow) => {
      budgetRowToBeUpdated.value = budgetRow
      isModalVisible.value = true
    }

    const submitUpdateBudgetRowModal = async (budgetRow : BudgetRow) =>  {
      isModalVisible.value = false

      if (budgetRows.value != null && budgetRows.value.length > 0) {
        let originalBudgetRow : BudgetRow = 
          budgetRows.value.filter(br => { return br.budget_row_id === budgetRow.budget_row_id })[0]
        
        budgetAmount.value += (originalBudgetRow.budget_amount - budgetRow.budget_amount)

        originalBudgetRow.name = budgetRow.name
        originalBudgetRow.budget_amount = budgetRow.budget_amount
        originalBudgetRow.spent = budgetRow.spent

        await BudgetRowApis.updateBudgetRow(budgetRow)
      }
    }

    const addBudgetRow = async (newBudgetRow : BudgetRow) => {
      const insertedBudgetRow = await BudgetRowApis.insertBudgetRow(newBudgetRow)

      if (budgetRows.value != null && budgetRows.value.length > 0 && insertedBudgetRow != null) {
        budgetRows.value.push(insertedBudgetRow[0])
        openUpdateBudgetRowModal(insertedBudgetRow[0])
      }
    }

    const deleteBudgetRow = async (budgetRow: BudgetRow) => {
      if (budgetRows.value != null && budgetRows.value.length > 0 && budgetRow.budget_row_id != undefined) {
        budgetAmount.value += budgetRow.budget_amount
        
        budgetRows.value = budgetRows.value.filter(br => br.budget_row_id != budgetRow.budget_row_id)
        
        await BudgetRowApis.deleteBudgetRow(budgetRow.budget_row_id) 
      }
    }

    return { 
      budgetRows, budgetAmount,  // Budget table
      isModalVisible, budgetRowToBeUpdated, openUpdateBudgetRowModal, submitUpdateBudgetRowModal,  // Update modal
      addBudgetRow,  // Add budget row
      deleteBudgetRow,  // Delete budget row
    }
  },
})
</script>

<style scoped>

</style>