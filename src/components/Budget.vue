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
//import { definitions } from '../../types/supabase'

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

    const submitUpdateBudgetRowModal = (budgetRow : BudgetRow) =>  {
      isModalVisible.value = false

      if (budgetRows.value != null && budgetRows.value.length > 0) {
        let originalBudgetRow : BudgetRow = 
          budgetRows.value.filter(br => { return br.id === budgetRow.id })[0]
        
        budgetAmount.value += (originalBudgetRow.budget_amount - budgetRow.budget_amount)
        console.log(typeof(budgetRow.budget_amount))
        originalBudgetRow.name = budgetRow.name
        originalBudgetRow.budget_amount = budgetRow.budget_amount
        originalBudgetRow.spent = budgetRow.spent
      }
    }

    const addBudgetRow = (newBudgetRow : BudgetRow) => {
      if (budgetRows.value != null && budgetRows.value.length > 0) {
        console.log('hi')
        budgetRows.value.push(newBudgetRow)
        openUpdateBudgetRowModal(newBudgetRow)
      }
    }

    const deleteBudgetRow = (budgetRow: BudgetRow) => {
      if (budgetRows.value != null && budgetRows.value.length > 0) {
        budgetAmount.value += budgetRow.budget_amount
        budgetRows.value = budgetRows.value.filter(br => br.id != budgetRow.id)
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