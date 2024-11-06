<template>
  <v-container>
    <v-card class="mx-auto" width="400">
      <template v-slot:title>
        <TopBar @authorized="load" />
      </template>
      <template v-slot:text>
        <v-divider />
        <h2>Todos to do</h2>
        <v-list>
          <todo-item v-for="t in todosToDo" :key="t.id" :todo="t" @update="load" />
          <v-list-item v-if="!todosToDo?.length" title="You don't have any todos to do" />
        </v-list>
        <v-divider v-show="showDivider" />
        <div v-show="todosDone?.length > 0">
          <h2>Completed todos</h2>
          <v-list>
            <todo-item v-for="t in todosDone" :key="t.id" :todo="t" @update="load" />
          </v-list>
        </div>
      </template>
      <template v-slot:actions>
        <new-todo-dialog @added="load" />
      </template>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import TopBar from './components/TopBar.vue';
import { computed, ref } from "vue";
import TodoItem from "@/components/TodoItem.vue";
import { authorizationStatus, getTodos } from "@/services/todoService";
import NewTodoDialog from "@/components/NewTodoDialog.vue";

const todos = ref<Array<TodoItem>>()
const todosToDo = computed(() => {
  return todos.value?.filter(t => !t.done)
})

const todosDone = computed(() => {
  return todos.value?.filter(t => t.done)
})

const showDivider = computed(() => todosDone.value?.length > 0)

const load = () => {
  getTodos().then(d => {
    console.log(d)
    todos.value = d
  })
}

if (authorizationStatus.loggedIn) {
  load()
}

</script>
<style>
h2 {
  margin-top: .5em;
}
</style>
