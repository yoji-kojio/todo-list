<template>
  <div class="todo-create-form">
    <div v-if="inCreateMode" class="todo-create-form__input-container">
      <input
        v-model="todoText"
        type="text"
        placeholder="ENTER to save or ESC to cancel"
        class="todo-create-form__input"
        @keyup.enter="createTodoItem"
      />

      <button class="todo-create-form__input-mobile-send" @click="createTodoItem">
        <font-awesome-icon icon="arrow-circle-right" size="lg" />
      </button>
    </div>
    <div
      v-else
      v-tooltip="'Click or press N'"
      class="todo-create-form__edit-mode-button"
      @click="toggleCreateMode"
    >
      <font-awesome-icon icon="plus" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'TodoCreateForm',
  data() {
    return {
      inCreateMode: false,
      todoText: '',
    };
  },
  created() {
    document.addEventListener('keyup', this.handleShortcuts);
  },
  methods: {
    ...mapMutations(['insertTodoItem']),
    async createTodoItem() {
      if (!this.todoText) return;

      await axios.post('http://localhost:3000/todos', {
        title: this.todoText,
        done: false,
      }).then(response => {
        this.insertTodoItem(response.data);
      }).catch(error => {
        console.error(error);
      }).finally(() => {
        this.todoText = '';
        this.inCreateMode = false;
      });
    },
    toggleCreateMode() {
      this.inCreateMode = !this.inCreateMode;
      this.todoText = '';
    },
    handleShortcuts(pressedKey) {
      if (pressedKey.code === 'KeyN' && !this.inCreateMode) this.toggleCreateMode();
      if (pressedKey.code === 'Escape' && this.inCreateMode) this.toggleCreateMode();
    }
  }
}
</script>

<style lang="scss">
.todo-create-form {
  background-color: $light-blue;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 100%;
  max-width: 500px;
}

.todo-create-form__input-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 50px;

  @media (min-width: $screen-xs) {
    grid-template-columns: 1fr;
  }
}

.todo-create-form__input-mobile-send {
  border: none;
  border-radius: 10px;
  background-color: $light-blue;
  color: $dark-blue;

  @media (min-width: $screen-xs) {
    display: none;
  }
}

.todo-create-form__input {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: none;
  padding: $space-md;
}

.todo-create-form__edit-mode-button {
  cursor: pointer;
  padding: $space-md;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
