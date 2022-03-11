<template>
  <div class="app">
    <BudgetTable @openUpdateBudgetRowModal="openUpdateBudgetRowModal" :budgetRows="budgetRows" />
    <UpdateCategoryModal v-if="isModalVisible" @submitUpdateBudgetRowModal="submitUpdateBudgetRowModal" :budgetRow="budgetRowToBeUpdated" /> 
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BudgetRow from './types/BudgetRow'
import BudgetTable from './components/BudgetTable.vue'
import UpdateCategoryModal from './components/UpdateCategoryModal.vue'

export default defineComponent({
  name: 'App',
  components: { BudgetTable, UpdateCategoryModal },
  setup() {
    const budgetRows = ref<BudgetRow[]>([
      { id: 1, name: 'Rent', budgetAmount: 1000, spent: 800 },
      { id: 2, name: 'Groceries', budgetAmount: 100, spent: 25 },
      { id: 3, name: 'Gas', budgetAmount: 50, spent: 0 }
    ])


    let isModalVisible = ref<boolean>(false)
    let budgetRowToBeUpdated = ref<BudgetRow>(budgetRows.value[0])

    const openUpdateBudgetRowModal = (budgetRow : BudgetRow) => {
      budgetRowToBeUpdated.value = budgetRow
      isModalVisible.value = true
    }
    const submitUpdateBudgetRowModal = (budgetRow : BudgetRow) =>  {
      isModalVisible.value = false
      let budgetRow2 : BudgetRow = 
        budgetRows.value.filter(br => { return br.id === budgetRow.id })[0]
        budgetRow2.name = budgetRow.name
      budgetRow2.budgetAmount = budgetRow.budgetAmount
      budgetRow2.spent = budgetRow.spent
    }

    return { 
      budgetRows,  // Budget table
      isModalVisible, budgetRowToBeUpdated, openUpdateBudgetRowModal, submitUpdateBudgetRowModal  // Update modal
    }
  }
})

</script>

<style>
</style>
