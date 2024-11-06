<template>
  <v-list-item class="px-0">
    <template v-slot:title>
      <span :class="{done:todo.done}">{{ todo.title }}</span>
    </template>
    <template v-slot:subtitle>
      {{ formatDateTime(todo.createdAt) }}
    </template>
    <template v-slot:prepend>
      <v-checkbox-btn v-model="todo.done" @change="toggleMethod" />
    </template>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="deleteMethod">
              <v-icon icon="mdi-trash-can" />
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">

import { deleteTodo, TodoItem, toggleTodo } from "@/services/todoService";
import { formatDateTime } from "@/services/utils";

const props = defineProps<{ todo: TodoItem }>()
const emits = defineEmits("update")
const deleteMethod = () => {
  deleteTodo(props.todo.id).then(() => {
    emits("update");
  })
}
const toggleMethod = () => {
  toggleTodo(props.todo.id).then(() => {
    emits("update");
  })
}

const toggle = () => {
  console.log(props.todo.completed)
}
</script>
<style scoped>
span.done {
  text-decoration: line-through;
}
</style>

