<template>
  <div id="budgetRows">
    <ul>
      <li v-for="budgetRow in budgetRows" :key="budgetRow.id">
        <div id="name" style="font-weight:bold;" @click="updateName(budgetRow)">{{ budgetRow.name }}</div> 
        <div id="budgetAmount">{{ budgetRow.budgetAmount }}</div> 
        <div id="spent">{{ budgetRow.spent }}</div>
        <br>
        <hr>
      </li>
    </ul>
  </div>
  <ChangePopUp :displayValue="displayValue" ref="changePopUp"/>
</template>

<script lang="ts">
import BudgetRow from '@/types/BudgetRow'
import { defineComponent, PropType, ref } from 'vue'
import ChangePopUp from './ChangePopUp.vue'

export default defineComponent({
  components: { ChangePopUp },
  setup() {
    var displayValue = ref<String>("none")

    // TODO: Does not reopen
    const updateName = (budgetRow: BudgetRow) => {
      console.log('hi')
      budgetRow.name = 'hiii'
      displayValue.value = "block"
    }

    return { displayValue, updateName }
  },
  props: {
    budgetRows: {
      required: true,
      type: Array as PropType<BudgetRow[]>
    }
  }
})
</script>

<style scoped>
  #budgetRows {
    width: 300px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li div {
    float: left;
    width: 100px;
  }
</style>