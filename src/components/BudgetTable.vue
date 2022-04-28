<template>
  <div>
    <div id="add-row-button">
      <it-button type="success" round @click="addRow">
        Add Row
      </it-button>
    </div>
    <div id="budget">
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
            <div id="budget-amount">{{ budgetRow.budget_amount }}</div> 
            <div id="spent">{{ budgetRow.spent }}</div>
            <div class="update-row-button">
              <it-button type="primary" round @click="openUpdateBudgetRowModal(budgetRow)">
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
    </div>
  </div>
  <div id="add-row-button">
  </div>       
</template>

<script lang="ts">
import BudgetRow from '../interfaces/BudgetRow'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  components: {  },
  props: {
    budgetRows: {
      required: true,
      type: Object as PropType<BudgetRow[]>
    }
  },
  emits: ['openUpdateBudgetRowModal', 'addBudgetRow', 'deleteBudgetRow'],
  setup(props, context) {
    // Update budget row feature
    let budgetRowToBeUpdated = ref<BudgetRow>(props.budgetRows[0])
    const openUpdateBudgetRowModal = (budgetRow: BudgetRow) => context.emit('openUpdateBudgetRowModal', budgetRow)

    // Add budget row
    // TODO: Figure out a better way to create id's
    const addRow = () => {
      const newBudgetRow : BudgetRow = {
        id: props.budgetRows.length + 1,
        name: 'Category',
        budget_amount: 0,
        spent: 0
      }
      context.emit('addBudgetRow', newBudgetRow)
    }

    // Delete budget row
    const deleteRow = (budgetRow: BudgetRow) => context.emit('deleteBudgetRow', budgetRow)

    return { 
      budgetRowToBeUpdated,  // Variables
      openUpdateBudgetRowModal, addRow, deleteRow,  // Functions
    }
  },
})
</script>

<style scoped>
  #add-row-button {
    padding-bottom: 25px;
  }
  
  #budget {
    width: 100%;
    height: 300px;
  }

  #headers {
    width: 1000px;
    font-weight: bold;
  }
  #name-header {
    float: left;
    width: 265px;
  }
  #budget-amount-header {
    float: left;
    width: 200px;
  }
  #spent-header {
    float: left;
    width: 150px;
  }

  #budgetRows {
    width: 1000px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li div {
    float: left;
    width: 150px;
  }
  #name {
    width: 300px;
  }
  #budget-amount {
    width: 175px;
  }
</style>