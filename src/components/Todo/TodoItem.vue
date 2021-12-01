<template>
  <div tabindex="0" data-testid="todo-item" class="todo-item" :class="{ 'todo-item--disabled': taskIsDone }">
    <div data-testid="todo-title" class="todo-item__title">
      {{ title }}
    </div>

    <div v-if="taskIsDone" v-tooltip="'Remove'" data-testid="action-button" @click="emitRemoveItem">
      <font-awesome-icon icon="trash" data-testid="todo-icon" class="todo-item__remove-button" />
    </div>
    <div v-else v-tooltip="'Mark as done'" data-testid="action-button" @click="updateDoneStatus">
      <font-awesome-icon icon="check-circle" data-testid="todo-icon" class="todo-item__done-button" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  data() {
    return {
      taskIsDone: false,
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    isDone: {
      type: Boolean,
      default: false,
    }
  },
  mounted() {
    this.taskIsDone = this.isDone;
  },
  methods: {
    updateDoneStatus() {
      this.taskIsDone = true;
      this.$emit('done');
    },
    emitRemoveItem() {
      this.$emit('remove');
    },
  },
}
</script>

<style lang="scss">
.todo-item {
  border-radius: 10px;
  padding: $space-md $space-md;
  background-color: $light-blue;
  display: flex;
  justify-content: space-between;
  margin-bottom: $space-sm;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.todo-item--disabled {
  opacity: 0.4;
  cursor: default;

  .todo-item__title {
    text-decoration: line-through;
  }
}

.todo-item__title {
  color: $dark-liver;
  text-align: left;
}

.todo-item__done-button {
  cursor: pointer;
  font-size: rem(20);
  color: $dark-liver;

  &:hover {
    color: $dark-blue;
  }
}

.todo-item__remove-button {
  cursor: pointer;
  font-size: rem(20);
  color: $dark-liver;

  &:hover {
    color: $red-crayola;
  }
}

</style>
