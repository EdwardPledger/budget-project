<template>
  <div class="app">
    <BudgetTable :budgetRows="budgetRows" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BudgetRow from './types/BudgetRow'
import BudgetTable from './components/BudgetTable.vue'

export default defineComponent({
  name: 'App',
  components: { BudgetTable },
  setup() {
    const budgetRows = ref<BudgetRow[]>([
      { id: 1, name: 'Rent', budgetAmount: 1000, spent: 800 },
      { id: 2, name: 'Groceries', budgetAmount: 100, spent: 25 },
      { id: 3, name: 'Gas', budgetAmount: 50, spent: 0 }
    ])

    return { budgetRows }
  },
  methods: {
  }
})

</script>

<style>
</style>
