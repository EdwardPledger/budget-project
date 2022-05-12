<template>
  <Form>
    <template #header>
      <h2>Login</h2>
    </template>
    <template #main>
      <it-input labelTop="Username" type="text" required v-model="username" />
      <it-input labelTop="Password" type="text" required v-model="password" />
    </template>
    <template #footer>
      <it-button id="submit-button" type="success" round @click="loginUser">Submit</it-button>
    </template>
  </Form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Form from './Form.vue'
import UserApis from '../apis/UserApis'
import router from '../router'

export default defineComponent({
  components: { Form },
  async setup() {
    var username = ref<string>("")
    var password = ref<string>("")

    const loginUser = async () => {
      const fetchedUser = await UserApis.getUser(username.value)

      if (fetchedUser == null || fetchedUser?.username != username.value || fetchedUser?.user_password != password.value) {
        alert('Username and/or password incorrect')
      }
      else {
        router.push('/')
      }
    }

    return { username, password, loginUser }
  }
})
</script>

<style>

</style>