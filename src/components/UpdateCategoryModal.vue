<template>
  <div id="backdrop">
    <div id="modal">
        <h2>Update {{ budgetRow.name }}</h2>
        <it-input labelTop="Category Name" type="text" :placeholder="budgetRow.name" />
        <it-input labelTop="Budget Amount" type="number" :placeholder="budgetRow.budgetAmount" />
        <it-input labelTop="Spent" type="number" :placeholder="budgetRow.spent" />
        <it-button id="submit-button" type="success" round @click="closeUpdateBudgetRowModal">Submit</it-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BudgetRow from '@/types/BudgetRow'

export default defineComponent({
  props: {
    budgetRow: {
      required: true,
      type: Object as PropType<BudgetRow>
    }
  },
  emits: ['closeUpdateBudgetRowModal'],
  setup(props, context) {
    // Close modal
    const closeUpdateBudgetRowModal = () => context.emit('closeUpdateBudgetRowModal')

    return { closeUpdateBudgetRowModal }
  }

})
</script>

<style scoped>
  #backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
  }
  #submit-button {
    margin-top: 10px;
    width: 50%;
    margin-left: 25%; 
  }
</style>