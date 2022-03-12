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
import BudgetRow from '../types/BudgetRow'
import BudgetTable from './BudgetTable.vue'
import UpdateCategoryModal from './UpdateCategoryModal.vue'
import BudgetAmount from './BudgetAmount.vue'

export default defineComponent({
  components: { BudgetTable, UpdateCategoryModal, BudgetAmount },
  setup() {
    const budgetRows = ref<BudgetRow[]>([
      { id: 1, name: 'Rent', budgetAmount: 1000, spent: 800 },
      { id: 2, name: 'Groceries', budgetAmount: 100, spent: 25 },
      { id: 3, name: 'Gas', budgetAmount: 50, spent: 0 }
    ])
    const budgetAmount = ref<number>(2000)
    let isModalVisible = ref<boolean>(false)
    let budgetRowToBeUpdated = ref<BudgetRow>(budgetRows.value[0])

    const openUpdateBudgetRowModal = (budgetRow : BudgetRow) => {
      budgetRowToBeUpdated.value = budgetRow
      isModalVisible.value = true
    }

    const submitUpdateBudgetRowModal = (budgetRow : BudgetRow) =>  {
      isModalVisible.value = false

      let originalBudgetRow : BudgetRow = 
        budgetRows.value.filter(br => { return br.id === budgetRow.id })[0]
      
      budgetAmount.value += (originalBudgetRow.budgetAmount - budgetRow.budgetAmount)
      console.log(typeof(budgetRow.budgetAmount))
      originalBudgetRow.name = budgetRow.name
      originalBudgetRow.budgetAmount = budgetRow.budgetAmount
      originalBudgetRow.spent = budgetRow.spent
    }

    const addBudgetRow = (newBudgetRow : BudgetRow) => {
      budgetRows.value.push(newBudgetRow)
      console.log(typeof(newBudgetRow.budgetAmount))
      openUpdateBudgetRowModal(newBudgetRow)
    }

    const deleteBudgetRow = (budgetRow: BudgetRow) => {
      budgetAmount.value += budgetRow.budgetAmount
      budgetRows.value = budgetRows.value.filter(br => br.id != budgetRow.id)
    }

    return { 
      budgetRows, budgetAmount,  // Budget table
      isModalVisible, budgetRowToBeUpdated, openUpdateBudgetRowModal, submitUpdateBudgetRowModal,  // Update modal
      addBudgetRow,  // Add budget row
      deleteBudgetRow  // Delete budget row
    }
  },
})
</script>

<style scoped>

</style>