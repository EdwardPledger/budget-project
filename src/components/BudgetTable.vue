<template>
  <div id="budgetRows">
    <ul>
      <li v-for="budgetRow in budgetRows" :key="budgetRow.id">
        <div id="name" style="font-weight:bold;">{{ budgetRow.name }}</div> 
        <div id="budgetAmount">{{ budgetRow.budgetAmount }}</div> 
        <div id="spent">{{ budgetRow.spent }}</div>
        <div class="update-row-button">
          <button type="button" @click="toggleForm(budgetRow)">Update</button>
        </div>
        <br>
        <hr>
      </li>
    </ul>
  </div>
  <button @click="addRow">Add Row</button>
  <ChangePopUp :budgetRow="budgetRowToBeUpdated"
              v-if="showPopup"
              @updateBudgetRow="onUpdateBudgetRow"/>
</template>

<script lang="ts">
import BudgetRow from '@/types/BudgetRow'
import { defineComponent, ref } from 'vue'
import ChangePopUp from './ChangePopUp.vue'
import budgetDataJson from '../assets/json/BudgetData.json'

export default defineComponent({
  components: { ChangePopUp },
  setup() {
    const budgetRows = ref<BudgetRow[]>(budgetDataJson.data)
    
    let budgetRowToBeUpdated = ref<BudgetRow>(budgetRows.value[0])
    let showPopup = ref<boolean>(false)
    
    const toggleForm = (budgetRow: BudgetRow) => {
      budgetRowToBeUpdated.value = budgetRow
      showPopup.value = true
    }

    const onUpdateBudgetRow = (updatedBudgetRow: BudgetRow) => {
      let budgetRow : BudgetRow = 
        budgetRows.value.filter(br => { return br.id === updatedBudgetRow.id })[0]
      
      budgetRow.name = updatedBudgetRow.name
      budgetRow.budgetAmount = updatedBudgetRow.budgetAmount
      budgetRow.spent = updatedBudgetRow.spent

      showPopup.value = false
    }

    // TODO: Figure out a better way to create id's
    const addRow = () => {
      budgetRows.value.push({
        id: budgetRows.value.length + 1,
        name: 'Category',
        budgetAmount: 0,
        spent: 0
      })
    }

    return { 
      budgetRows, budgetRowToBeUpdated, showPopup, toggleForm, onUpdateBudgetRow, addRow 
      }
  },
})
</script>

<style scoped>
  #budgetRows {
    width: 400px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li div {
    float: left;
    width: 100px;
  }
</style>