<template>
  <div class="todo-list">
    <TodoItem
      v-for="todoItem in orderedTodoList"
      :key="todoItem.id"
      :title="todoItem.title"
      :is-done="todoItem.done"
      @click-done="updateDoneStatus($event, todoItem.id)"
      @remove="removeItem(todoItem.id)"
    />
  </div>
</template>

<script>
import axios from "axios";
import TodoItem from './TodoItem'
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  computed: {
    ...mapGetters(['orderedTodoList'])
  },
  methods: {
    ...mapMutations(['updateTodoItemDone', 'removeItemFromList']),
    async updateDoneStatus(isDone, itemId) {
      await axios.patch(`http://localhost:3000/todos/${itemId}`, {
        done: isDone
      }).catch (error => {
        console.error(error);
      }).finally(() => {
        this.updateTodoItemDone({ itemId, isDone });
      });
    },
    async removeItem(itemId) {
      await axios.delete(`http://localhost:3000/todos/${itemId}`).catch(error => {
        console.error(error);
      }).finally(() => {
        this.removeItemFromList({ itemId });
      });
    }
  }
}
</script>

<style lang="scss">
.todo-list {
  margin-top: $space-lg;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 500px;
}
</style>
