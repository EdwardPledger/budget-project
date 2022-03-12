<template>
  <div class="app">
    <Budget />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Budget from './components/Budget.vue'

export default defineComponent({
  name: 'App',
  components: { Budget },
  setup() { }
})

</script>

<style>
</style>
