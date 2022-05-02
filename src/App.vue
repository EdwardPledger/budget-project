<template>
  <div class="app">
    <Suspense>
      <router-view />
      <template #fallback>
        <h2>Loading...</h2>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//import Budget from './components/Budget.vue'

export default defineComponent({
  name: 'App',
  components: {  },
  setup() { }
})
</script>

<style>
.app {
  background-color: #1c1429;
  color: #dedcd9;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
