<template>
  <div id="form-popup" v-bind:style="{ display: displayValue }">
    <form id="form-change-value">
      <h1>Change Value</h1>
      
      <label for="name"><b>Name</b></label>
      <input type="text" placeholder="Name of category" name="name" required>
      <br>
      <br>
      <button type="submit">Submit</button>
      <button type="button" @click="closeForm()">Close</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const closeForm = () => {
      // TODO: Find a cleaner way to do this
      document.getElementById("form-popup")!.style.display = "none";
    }

    return { closeForm }
  },
  props: {
    displayValue: {
      required: true,
      type: String
    }
  }
})
</script>

<style scoped>
  #form-popup {
    width: 300px;
    height: 300px;
    position: absolute;
    top: 25%;
    left: 25%;
    border: 3px solid #f1f1f1;
  }
  #form-change-value {
    max-width: 300px;
    padding: 10px;
    background-color: white;
  }
</style>