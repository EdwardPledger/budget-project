<template>
  <div id="backdrop">
    <div id="modal">
        <h2>Create Budget Balance</h2>
        <it-input labelTop="Amount" type="number-input" v-model="amount" />
        <it-button id="submit-button" type="success" round @click="submitCreateBudgetBalance">Submit</it-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['submitCreateBudgetBalance'],
  setup(props, context) {
    const amount = ref<number>(0)
    
    const submitCreateBudgetBalance = () => {
      context.emit('submitCreateBudgetBalance', amount.value)
    }

    return { amount, submitCreateBudgetBalance }
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