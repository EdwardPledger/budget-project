<template>
  <CurrentBalance 
    :currentBalance="currentBalance"  
  />
  <div class="budgetTable">
    <BudgetTable 
      @openUpdateBudgetRowModal="openUpdateBudgetRowModal"
      @addBudgetRow="addBudgetRow"
      @deleteBudgetRow="deleteBudgetRow" 
      :budgetRows="budgetRows" 
    />
  </div>
  <div class="transactionContainer">
    <div class="transaction">
      <CreateTransaction
        :budgetRows="budgetRows"
        @submitUpdateBudgetRowModal="submitUpdateBudgetRowModal"
        @submitUpdateBudgetBalance="submitUpdateBudgetBalance"
      />
    </div>
    <div class="transactionViewer">
      <TransactionViewer
        :transactions="transactions"
      />
    </div>
  </div>
  
  
  <UpdateCategoryModal 
    v-if="isModalVisible" 
    @submitUpdateBudgetRowModal="submitUpdateBudgetRowModal" 
    :budgetRow="budgetRowToBeUpdated" 
  />
  <CreateBudgetBalance
    v-if="isCreateBudgetBalanceModalVisible"
    @submitCreateBudgetBalance="submitCreateBudgetBalance"
  />
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import BudgetRow from '../interfaces/BudgetRow'
import BudgetBalance from '../interfaces/BudgetBalance'
import BudgetTable from './BudgetTable.vue'
import UpdateCategoryModal from './UpdateCategoryModal.vue'
import CurrentBalance from './CurrentBalance.vue'
import BudgetRowApis from '../apis/BudgetRowsApis'
import BudgetBalanceApis from '../apis/BudgetBalanceApis'
import CreateTransaction from './CreateTransaction.vue'
import TransactionViewer from './TransactionViewer.vue'
import TransactionApis from '../apis/TransactionApis'
import Transaction from '../interfaces/Transaction'
import SpentApis from '../apis/SpentApis'
import CreateBudgetBalance from './CreateBudgetBalance.vue'
import SpentLogic from '../logic/SpentLogic'
import BudgetRowLogic from '../logic/BudgetRowLogic'

export default defineComponent({
  components: {  CurrentBalance, BudgetTable, UpdateCategoryModal, CreateTransaction, TransactionViewer, CreateBudgetBalance },
  async setup() {
    /**
     * Get or initialize the budget balance
     */
    let isCreateBudgetBalanceModalVisible = ref<boolean>(false)

    const currentBalance = ref<number>()
    const budgetBalance : BudgetBalance | undefined 
      = await BudgetBalanceApis.getBudgetAmount()

    if (budgetBalance != undefined) {
      currentBalance.value = budgetBalance.current_balance
    }
    else {
      isCreateBudgetBalanceModalVisible.value = true
    }

    const submitCreateBudgetBalance = async (amount : number) => {
      await BudgetBalanceApis.Insert(amount)
      currentBalance.value = amount
      isCreateBudgetBalanceModalVisible.value = false
    }

    /**
     * Get budget rows
     */
    const budgetRows = ref<BudgetRow[] | undefined>()
    budgetRows.value = await BudgetRowApis.getBudgetRows()

    if (budgetRows.value != undefined) {
      for (let i=0; i<budgetRows.value.length; i++) {
        let spentId = budgetRows.value[i].spent_id

        if (spentId != undefined) {
          let spent = await SpentApis.GetSpentById(spentId)
          
          if (spent != undefined) {
            budgetRows.value[i].spent = spent.spent
          }
        }
      }
    }

    /**
     * Get transactions
     */
    const transactions = ref<Transaction[] | undefined>()
    transactions.value = await TransactionApis.getTransactions()
    
    /**
     * Update budget row
     */
    let budgetRowToBeUpdated = ref<BudgetRow>()
    let isModalVisible = ref<boolean>(false)

    const openUpdateBudgetRowModal = (budgetRow : BudgetRow) => {
      budgetRowToBeUpdated.value = budgetRow
      isModalVisible.value = true
    }

    const submitUpdateBudgetRowModal = async (budgetRow : BudgetRow) =>  {
      try {
        isModalVisible.value = false

        console.log('id', budgetRow.budget_row_id)

        // Update budget row
        await BudgetRowLogic.Update(budgetRow)

        if (budgetRows.value != undefined) {
          const index = budgetRows.value.findIndex(br => br.budget_row_id === budgetRow.budget_row_id)
          budgetRows.value[index] = budgetRow
        }
      }
      catch (error) {
        console.log(error)
        alert(error)
      }
    }

    /**
     * Create budget row and corresponding spent record
     */
    const addBudgetRow = async (newBudgetRow : BudgetRow) => {
      try {
        // Insert spent record
        const spentId = await SpentLogic.Insert(newBudgetRow.spent)

        // Insert budget row record
        newBudgetRow.spent_id = spentId
        
        const budgetRowId = await BudgetRowLogic.Insert(newBudgetRow)
        console.log('brId', budgetRowId)
        newBudgetRow.budget_row_id = budgetRowId

        if (budgetRows.value != undefined) {
          budgetRows.value.push(newBudgetRow)

          openUpdateBudgetRowModal(newBudgetRow)
        }
      }
      catch (error) {
        console.log(error)
        alert(error)
      }
    }

    /**
     * Delete budget row
     */
    const deleteBudgetRow = async (budgetRow: BudgetRow) => {
      if (budgetRows.value != null && budgetRows.value.length > 0 && budgetRow.budget_row_id != undefined) {
        if (budgetBalance != null) {
          budgetBalance.current_balance += budgetRow.budget_amount
          currentBalance.value = budgetBalance.current_balance
          await BudgetBalanceApis.updateBudgetAmount(budgetBalance)
        }
        
        budgetRows.value = budgetRows.value.filter(br => br.budget_row_id != budgetRow.budget_row_id)
        
        await BudgetRowApis.deleteBudgetRow(budgetRow.budget_row_id) 
      }
    }

    /**
     * Update budget row balance
     */
    const submitUpdateBudgetBalance = async (paymentAmount : number) => {
      if (budgetBalance?.current_balance != undefined) budgetBalance.current_balance += paymentAmount

      if (budgetBalance != undefined) await BudgetBalanceApis.updateBudgetAmount(budgetBalance)

      currentBalance.value = budgetBalance?.current_balance
    }

    return { 
      budgetRows, currentBalance, transactions, // Budget table
      isModalVisible, budgetRowToBeUpdated, openUpdateBudgetRowModal, submitUpdateBudgetRowModal,  // Update modal
      addBudgetRow,  // Add budget row
      deleteBudgetRow,  // Delete budget row
      submitUpdateBudgetBalance,
      isCreateBudgetBalanceModalVisible,
      submitCreateBudgetBalance
    }
  },
})
</script>

<style scoped>
  .budgetTable {
    float: left;
    width: 1000px;
  }
  .transactionContainer {
    float: left;
    width: 800px;
    padding-left: 200px;
    margin-top: 50px;
  }
  .transaction {
    width: 800px;
    padding-bottom: 300px;
  }
  .transactionViewer {
    width: 300px;
  }
</style>