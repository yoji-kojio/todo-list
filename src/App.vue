<template>
  <h1>to-do list</h1>
  <ProgressBar />
  <TodoList />
  <TodoCreateForm />
</template>

<script>
import { mapActions } from 'vuex'
import TodoList from './components/Todo/TodoList'
import TodoCreateForm from './components/Todo/TodoCreateForm'
import ProgressBar from './components/ProgressBar';

export default {
  name: 'App',
  components: {
    TodoList,
    TodoCreateForm,
    ProgressBar
  },
  created() {
    this.fetchTodoList();
  },
  methods: {
    ...mapActions(['fetchTodoList'])
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
