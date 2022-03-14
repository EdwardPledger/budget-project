<template>
  <div id="total-amount">
    <div id="total-amount-label">Total Budget Left</div>
    <div id="total-amount-value">${{ budgetAmount }}</div>
    <it-divider />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    budgetAmount: {
      required: true,
      type: Number
    }
  },
  setup() {
    
  },
})
</script>

<style scoped>
  #total-amount {
    width: 30%;
    font-weight: bold;
    padding-bottom: 25px;
  }
  #total-amount-value {
    text-align: right;
    float: right;
    width: 50%;
    color: green;
  }
  #total-amount-label {
    float: left;
    width: 50%;
  }
</style>