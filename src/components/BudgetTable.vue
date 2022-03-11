<template>
  <div id="total-amount">
    <div>Total Budget Left</div>
    <div id="total-amount-value">${{ totalBudgetAmountLeft }}</div>
    <it-divider />
  </div>
  <div id="headers">
    <div id="name-header">Category</div>
    <div id="budget-amount-header">Budget Amount</div>
    <div id="spent-header">Spent</div>
    <it-divider />
  </div>
  <div id="budgetRows">
    <ul>
      <li v-for="budgetRow in budgetRows" :key="budgetRow.id">
        <div id="name" style="font-weight:bold;">{{ budgetRow.name }}</div> 
        <div id="budgetAmount">{{ budgetRow.budgetAmount }}</div> 
        <div id="spent">{{ budgetRow.spent }}</div>
        <div class="update-row-button">
          <it-button type="primary" round @click="toggleForm(budgetRow)">
                    Update
          </it-button>
        </div>
        <div class="delete-row-button">
          <it-button type="danger" round @click="deleteRow(budgetRow)">
            Delete
          </it-button>
        </div>
        <it-divider />
      </li>
    </ul>
  </div>
  <it-button type="success" round @click="addRow">
    Add Row
  </it-button>
  <it-button @click="showModal">Open Modal</it-button>
  <ChangePopUp :budgetRow="budgetRowToBeUpdated"
              v-if="showPopup"
              @updateBudgetRow="onUpdateBudgetRow"/>
  <UpdateCategoryModal v-show="isModalVisible" @close="closeModal"/>        
</template>

<script lang="ts">
import BudgetRow from '@/types/BudgetRow'
import { defineComponent, ref } from 'vue'
import ChangePopUp from './ChangePopUp.vue'
import UpdateCategoryModal from './UpdateCategoryModal.vue'
import budgetDataJson from '../assets/json/BudgetData.json'

export default defineComponent({
  components: { ChangePopUp, UpdateCategoryModal },
  setup() {
    const budgetRows = ref<BudgetRow[]>(budgetDataJson.data)
    const totalBudgetAmountLeft = ref<number>(2000)


    let isModalVisible = ref<boolean>(false)
    const showModal = () => isModalVisible.value = true
    const closeModal = () => isModalVisible.value = false



    // Calculate budget amount left feature
    const calculateInitialBudgetAmountLeft = () => {
      
      budgetRows.value.forEach((br) => {
        totalBudgetAmountLeft.value -= br.budgetAmount
      })
      
      return totalBudgetAmountLeft;
    }

    calculateInitialBudgetAmountLeft()
  

    // Update budget row feature
    let budgetRowToBeUpdated = ref<BudgetRow>(budgetRows.value[0])
    let showPopup = ref<boolean>(false)
    
    const toggleForm = (budgetRow: BudgetRow) => {
      budgetRowToBeUpdated.value = budgetRow
      showPopup.value = true
    }

    const onUpdateBudgetRow = (updatedBudgetRow: any) => {
      let budgetRow : BudgetRow = 
        budgetRows.value.filter(br => { return br.id === updatedBudgetRow.id })[0]
      const budgetAmount = budgetRow.budgetAmount
      const updatedBudgetAmount = updatedBudgetRow.budgetAmount
      
      if (budgetAmount > updatedBudgetAmount) {
        totalBudgetAmountLeft.value += (budgetAmount - updatedBudgetAmount)
      }
      else if (budgetAmount < updatedBudgetAmount) {
        totalBudgetAmountLeft.value -= (updatedBudgetAmount - budgetAmount)
      }

      budgetRow.name = updatedBudgetRow.name
      budgetRow.budgetAmount = updatedBudgetRow.budgetAmount
      budgetRow.spent = updatedBudgetRow.spent

      showPopup.value = false
    }


    // Add budget row feature
    // TODO: Figure out a better way to create id's
    const addRow = () => {
      const newBudgetRow : BudgetRow = {
        id: budgetRows.value.length + 1,
        name: 'Category',
        budgetAmount: 0,
        spent: 0
      }
      budgetRows.value.push(newBudgetRow)

      toggleForm(newBudgetRow)
    }


    // Delete budget row feature
    const deleteRow = (budgetRow: BudgetRow) => {
      totalBudgetAmountLeft.value += budgetRow.budgetAmount
      console.log(typeof(budgetRow.budgetAmount))
      console.log(totalBudgetAmountLeft.value)
      budgetRows.value = 
        budgetRows.value.filter(br => br.id != budgetRow.id)
    }

    return { 
      budgetRows, budgetRowToBeUpdated, showPopup, totalBudgetAmountLeft, isModalVisible, // Variables
      calculateInitialBudgetAmountLeft, toggleForm, onUpdateBudgetRow, addRow, deleteRow, showModal, closeModal  // Functions
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