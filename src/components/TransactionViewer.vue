<template>
  <div class="transactionTable">
    <div class="header">Recent Transactions</div>
    <div class="transactionHeader">
      <div class="nameHeader">Name</div>
      <div class="amountHeader">Amount</div>
    </div>
    <it-divider />
    <div class="transactionRows">
      <ul>
          <li v-for="transaction in transactions" :key="transaction.transaction_id">
            <div class="name">{{ transaction.name }}</div>
            <div class="amount">{{ transaction.amount }}</div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import Transaction from '../interfaces/Transaction'

export default defineComponent({
  props: {
    transactions : {
      required: true,
      type: Object as PropType<Transaction[]>
    }
  },
  setup(props) {
    console.log(props.transactions)
    return {  }
  }
})
</script>

<style scoped>
  .transactionTable {
    width: 100%;
  }
  .header {
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;
  }

  .transactionHeader {
    width: 400px;
    font-weight: bold;
  }
  .nameHeader {
    float: left;
    width: 175px;
  }
  .amountHeader{
    float: left;
    width: 200px;
  }

  .transactionRows {
    width: 400px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  li div {
    float: left;
    width: 200px;
  }
  .name {
    width: 200px ;
  }
  .amount {
    width: 200px;
  }
</style>