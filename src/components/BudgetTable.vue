<template>
  <div id="budgetRows">
    <ul>
      <li v-for="budgetRow in budgetRows" :key="budgetRow.id">
        <div id="name" style="font-weight:bold;">{{ budgetRow.name }}</div> 
        <div id="budgetAmount">{{ budgetRow.budgetAmount }}</div> 
        <div id="spent">{{ budgetRow.spent }}</div>
        <div class="update-row-button">
          <button type="button" @click="toggleForm(budgetRow)">Update</button>
        </div>
        <br>
        <hr>
      </li>
    </ul>
  </div>
  <ChangePopUp :budgetRow="budgetRowToBeUpdated"
              v-if="showPopup"
              @updateBudgetRow="onUpdateBudgetRow"/>
</template>

<script lang="ts">
import BudgetRow from '@/types/BudgetRow'
import { defineComponent, PropType, ref } from 'vue'
import ChangePopUp from './ChangePopUp.vue'

export default defineComponent({
  components: { ChangePopUp },
  props: {
    budgetRows: {
      required: true,
      type: Array as PropType<BudgetRow[]>
    }
  },
  setup(props) {
    let budgetRowToBeUpdated = ref<BudgetRow>(props.budgetRows[0])
    let showPopup = ref<boolean>(false)
    
    const toggleForm = (budgetRow: BudgetRow) => {
      budgetRowToBeUpdated.value = budgetRow
      showPopup.value = true
    }
    
    // const onUpdateBudgetRow = computed((budgetRow: BudgetRow) => {
    //   console.log(budgetRow.name)
    //   return budgetRow
    // })

    const onUpdateBudgetRow = (budgetRow: BudgetRow) => {
      console.log(budgetRow.name)
      //var budgetRow = props.budgetRows.filter(br => { return br.id === budgetRow.id })
    }

    return { budgetRowToBeUpdated, showPopup, toggleForm, onUpdateBudgetRow }
  },
})
</script>

<style scoped>
  #budgetRows {
    width: 400px;
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