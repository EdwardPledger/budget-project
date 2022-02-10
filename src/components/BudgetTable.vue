<template>
  <div id="total-amount">
    <div>Total Budget Left</div>
    <div id="total-amount-value">${{ totalBudgetAmountLeft }}</div>
    <br>
    <hr>
  </div>
  <div id="headers">
    <div id="name-header">Category</div>
    <div id="budget-amount-header">Budget Amount</div>
    <div id="spent-header">Spent</div>
    <br>
    <hr>
  </div>
  <div id="budgetRows">
    <ul>
      <li v-for="budgetRow in budgetRows" :key="budgetRow.id">
        <div id="name" style="font-weight:bold;">{{ budgetRow.name }}</div> 
        <div id="budgetAmount">{{ budgetRow.budgetAmount }}</div> 
        <div id="spent">{{ budgetRow.spent }}</div>
        <div class="update-row-button">
          <button type="button" @click="toggleForm(budgetRow)">Update</button>
        </div>
        <div class="delete-row-button">
          <button @click="deleteRow(budgetRow)">Delete</button>
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
import { defineComponent, ref, onBeforeMount } from 'vue'
import ChangePopUp from './ChangePopUp.vue'
import budgetDataJson from '../assets/json/BudgetData.json'

export default defineComponent({
  components: { ChangePopUp },
  setup() {
    const budgetRows = ref<BudgetRow[]>(budgetDataJson.data)
    const totalBudgetAmountLeft = ref<number>(2000)

    // Calculate budget amount left feature
    const calculateInitialBudgetAmountLeft = () => {
      let totalBudgeted = 0
      
      budgetRows.value.forEach((br) => {
        if (br.budgetAmount >= br.spent) totalBudgeted += br.budgetAmount
        else totalBudgeted += br.spent
      })
      totalBudgetAmountLeft.value -= totalBudgeted

      return totalBudgetAmountLeft;
    }

    onBeforeMount(() => calculateInitialBudgetAmountLeft())

    // TODO: Make this more robust/handle all scenarios
    const calculateBudgetAmountLeft = (budgetAmount: number, spent: number) => {
      if (budgetAmount >= spent) totalBudgetAmountLeft.value -= budgetAmount
      else totalBudgetAmountLeft.value -= spent
    }
    

    // Update budget row feature
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

      calculateBudgetAmountLeft(budgetRow.budgetAmount, budgetRow.spent)

      showPopup.value = false
    }


    // Add budget row feature
    // TODO: Figure out a better way to create id's
    // TODO: Create a pop up form like update
    const addRow = () => {
      budgetRows.value.push({
        id: budgetRows.value.length + 1,
        name: 'Category',
        budgetAmount: 0,
        spent: 0
      })
    }


    // Delete budget row feature
    const deleteRow = (budgetRow: BudgetRow) => {
      budgetRows.value = 
        budgetRows.value.filter(br => br.id != budgetRow.id)
    }

    return { 
      budgetRows, budgetRowToBeUpdated, showPopup, totalBudgetAmountLeft,  // Variables
      calculateInitialBudgetAmountLeft, calculateBudgetAmountLeft, toggleForm, onUpdateBudgetRow, addRow, deleteRow  // Functions
    }
  },
})
</script>

<style scoped>
  #total-amount {
    width: 700px;
    padding-bottom: 50px;
    font-weight: bold;
  }
  #total-amount div {
    float: left;
    width: 350px;
  }
  #total-amount-value {
    text-align: right;
  }

  #headers {
    width: 700px;
    font-weight: bold;
  }
  #name-header {
    float: left;
    width: 200px;
  }
  #budget-amount-header {
    float: left;
    width: 125px;
  }
  #spent-header {
    float: left;
    width: 125px;
  }

  #budgetRows {
    width: 700px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li div {
    float: left;
    width: 125px;
  }
  #name {
    float: left;
    width: 200px;
  }
</style>