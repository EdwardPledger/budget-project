<template>
  <Form>
    <template #header>
      <h2>Sign Up</h2>
    </template>
    <template #main>
      <it-input labelTop="Username" type="text" required v-model="username" />
      <it-input labelTop="Email" type="text" required v-model="email" />
      <it-input labelTop="Password" type="text" required v-model="password" />
    </template>
    <template #footer>
      <it-button id="submit-button" type="success" round @click="submitUser">Submit</it-button>
    </template>
  </Form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Form from './Form.vue'
import User from '../interfaces/User'
import UserApis from '../apis/UserApis'
import router from '../router'

export default defineComponent({
  components: { Form },
  async setup() {
    var username = ref<string>("")
    var email = ref<string>("")
    var password = ref<string>("")

    const submitUser = async () => {
      var user : User = {
          username: username.value,
          email: email.value,
          user_password: password.value
        }

      await UserApis.insertUser(user)

      router.push('/login')
    }
    
    return { username, email, password, submitUser }
  }
})
</script>

<style>
#submit-button {
    margin-top: 10px;
    width: 50%;
    margin-left: 25%; 
  }
</style>