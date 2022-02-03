<template>
  <div class="app">
    {{ budgetRows }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BudgetRow from './types/BudgetRow'

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const budgetRows = ref<BudgetRow[]>([
      { name: 'Rent', budgetAmount: 1000, spent: 800 },
      { name: 'Groceries', budgetAmount: 100, spent: 25 },
      { name: 'Gas', budgetAmount: 50, spent: 0 }
    ])

    return { budgetRows }
  },
  methods: {
  }
})

</script>

<style>
</style>
