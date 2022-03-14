<template>
  <div id="form-popup">
    <form id="form-change-value">
      <h1>Change Value</h1>
      
      <label for="name"><b>Name</b></label>
      <input type="text" name="name" required
            :placeholder="mutableBudgetRow.name" 
            v-model="mutableBudgetRow.name">
      <br>
      <label for="budgetAmount"><b>Budget Amount</b></label>
      <input type="text" name="budgetAmount" required
            :placeholder="mutableBudgetRow.budgetAmount" 
            v-model="mutableBudgetRow.budgetAmount">
      <label for="amountSpent"><b>Spent</b></label>
      <input type="text" name="amountSpent" required
            :placeholder="mutableBudgetRow.spent" 
            v-model="mutableBudgetRow.spent">
      <br>
      <br>
      <button type="button" @click="updateBudgetRow">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import BudgetRow from '@/types/BudgetRow'

export default defineComponent({
  props: {
    budgetRow: {
      required: true,
      type: Object as PropType<BudgetRow>
    }
  },
  emits: ['updateBudgetRow'],
  setup(props, context) {
    const mutableBudgetRow = ref<BudgetRow>({
        id: props.budgetRow.id,
        name: props.budgetRow.name,
        budgetAmount: props.budgetRow.budgetAmount,
        spent: props.budgetRow.spent
      })

    const updateBudgetRow = () => {
      context.emit('updateBudgetRow', mutableBudgetRow.value)
    }

    return { mutableBudgetRow, updateBudgetRow }
  }
})
</script>

<style scoped>
  #form-popup {
    width: 350px;
    height: 250px;
    position: absolute;
    top: 25%;
    left: 25%;
    border: 3px solid #f1f1f1;
  }
  #form-change-value {
    max-width: 300px;
    padding: 10px;
    background-color: white;
  }
</style>