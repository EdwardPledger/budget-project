<template>
  <div class="app">
    <BudgetTable @openUpdateBudgetRowModal="openUpdateBudgetRowModal" />
    <UpdateCategoryModal v-if="isModalVisible" @closeUpdateBudgetRowModal="closeUpdateBudgetRowModal" :budgetRow="budgetRowToBeUpdated" /> 
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
      isModalVisible.value = true
      budgetRowToBeUpdated.value = budgetRow
    }
    const closeUpdateBudgetRowModal = () =>  {
      console.log('hi')
      isModalVisible.value = false
    }

    return { 
      budgetRows,  // Budget table
      isModalVisible, budgetRowToBeUpdated, openUpdateBudgetRowModal, closeUpdateBudgetRowModal  // Update modal
    }
  }
})

</script>

<style>
</style>
