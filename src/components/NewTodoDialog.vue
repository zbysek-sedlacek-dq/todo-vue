<template>
  <v-btn
    color="primary"
    text="Add"
    :disabled="!authorizationStatus.loggedIn.value"
    @click="loginDialog = true; title = ''"
  ></v-btn>
  <v-dialog
    v-model="loginDialog"
    title="Login"
    width="30%"
  >
    <v-card title="Add new todo">
      <template v-slot:text>
        <v-text-field v-model="title" label="title" />
      </template>
      <template v-slot:actions>
        <v-btn @click="addMethod()" color="primary" :disabled="title.length == 0">add</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authorizationStatus, createTodo } from '@/services/todoService'

const loginDialog = ref(false)
const title = ref("")
const emit = defineEmits("added")
const addMethod = () => {
  createTodo(title.value).then(() => {
      emit('added', title.value)
      loginDialog.value = false
    }
  )
}
</script>
