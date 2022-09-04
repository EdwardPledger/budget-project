<template>
  <div class="header">Transactions</div>
  <div class="transaction">
    <it-button-group>
    <it-button @click="createExpense">-</it-button>
    <it-button @click="createPayment">+</it-button>
  </it-button-group>
  <div class="expense" v-if="isExpense">
    <div class="dropdown">
      <it-select
        v-model="category"
        :options="categoryOptions"
        placeholder="Select Category"
      />
    </div>
    <div class="expenseAmount">
        <it-number-input  class="number-input" style="width: 200px; color: white;" hide-controls="true" v-model="expenseAmount" />
    </div>
    <div class="submitExpense">
      <it-button id="submit-button" type="success" round @click="submitExpense">Submit</it-button>
    </div>
  </div>
  <div class="payment" v-if="isPayment">
    <div class="paymentAmount">
        <it-number-input class="number-input" style="width: 200px; color: white;" hide-controls="true" v-model="paymentAmount" />
    </div>
    <div class="submitPayment">
      <it-button id="submit-button" type="success" round @click="submitPayment">Submit</it-button>
    </div>
  </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, PropType } from 'vue'
import BudgetRow from '../interfaces/BudgetRow'

export default defineComponent({
  props: {
    budgetRows: {
      required: true,
      type: Object as PropType<BudgetRow[]>
    }
  },
  emits: ['submitUpdateBudgetRowModal', 'submitUpdateBudgetBalance'],
  setup(props, context) {
    const category = ref<string>()
    const categoryOptions = ref<string[]>(props.budgetRows.map(br => br.name))
    const isExpense = ref<boolean>(false)
    const expenseAmount = ref<number>()
    const paymentAmount = ref<number>()
    const isPayment = ref<boolean>(false)

    const createExpense = () => {
      if (isExpense.value == true) isExpense.value = false
      else {
        isExpense.value = true
        isPayment.value = false
      }
    }

    const createPayment = () => {
      if (isPayment.value == true) isPayment.value = false
      else {
        isPayment.value = true
        isExpense.value = false
      }
    }

    const submitExpense = () => {
      const selectedBudgetRow : BudgetRow = props.budgetRows.filter(br => br.name == category.value)[0]

      if (expenseAmount.value != null) {
        selectedBudgetRow.spent += expenseAmount.value
      }
      
      context.emit('submitUpdateBudgetRowModal', selectedBudgetRow)
    }

    const submitPayment = () => {
      context.emit('submitUpdateBudgetBalance', paymentAmount.value)
    }

    
    return { category, categoryOptions, isExpense, createExpense, expenseAmount, submitExpense, isPayment, createPayment, paymentAmount, submitPayment }
  }
})
</script>

<style scoped>
.header {
  font-style: bold;
}
.dropdown {
  float: left;
}
.expenseAmount {
  float: left;
}
.submitExpense {
  float: left;
}
</style>