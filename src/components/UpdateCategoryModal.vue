<template>
  <div id="backdrop">
    <div id="modal">
        <h2>Update Category</h2>
        <it-input labelTop="Category Name" type="text" v-model="mutableBudgetRow.name" />
        <it-number-input class="number-input" style="width: 200px;" labelTop="Budget Amount" hide-controls="true" v-model="mutableBudgetRow.budgetAmount" />
        <it-number-input class="number-input" style="width: 200px;" labelTop="Spent" hide-controls="true" v-model="mutableBudgetRow.spent" />
        <it-button id="submit-button" type="success" round @click="submitUpdateBudgetRowModal">Submit</it-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import BudgetRow from '../interfaces/BudgetRow'

export default defineComponent({
  props: {
    budgetRow: {
      required: true,
      type: Object as PropType<BudgetRow>
    }
  },
  emits: ['submitUpdateBudgetRowModal'],
  setup(props, context) {
    const mutableBudgetRow = ref<BudgetRow>({
        id: props.budgetRow.id,
        name: props.budgetRow.name,
        budgetAmount: props.budgetRow.budgetAmount,
        spent: props.budgetRow.spent
      })

    const submitUpdateBudgetRowModal = () => context.emit('submitUpdateBudgetRowModal', mutableBudgetRow.value)

    return { submitUpdateBudgetRowModal, mutableBudgetRow }
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