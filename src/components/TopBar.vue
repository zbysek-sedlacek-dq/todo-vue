<template>
  <v-dialog
    v-model="loginDialog"
    title="Login"
    width="30%"
  >
    <v-card title="Authorize to use app">
      <template v-slot:text>
        <v-text-field v-model="usernameForm" label="Username" />
      </template>
      <template v-slot:actions>
        <v-btn @click="loginMethod" color="primary"
               :disabled="usernameForm.length == 0">login
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
  <span>
  {{ username ? `Hello, ${ username }!` : 'Not logged in' }}
  </span>
  <span class="float-right">
  <v-btn v-if="!username" @click="loginDialog = true" color="primary">Login</v-btn>
  <v-btn v-if="username" @click="logoutMethod" color="primary">Logout</v-btn>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login, authorizationStatus, logout } from '@/services/todoService'

const username = ref("")
const usernameForm = ref("")
const loginDialog = ref(false)
const loginMethod = () => {
  loginDialog.value = false
  login(usernameForm.value).then(e => {
    username.value = e.name
    emit("authorized")
  })
}
const logoutMethod = () => {
  loginDialog.value = true
  logout()
}
const emit = defineEmits("authorized")
if (authorizationStatus.loggedIn.value) {
  username.value = authorizationStatus.username.value
}
</script>
