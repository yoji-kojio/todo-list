<template>
  <div tabindex="0" class="todo-item" :class="{ 'todo-item--disabled': taskIsDone }">
    <div class="todo-item__title" :class="{ 'todo-item__title--disabled': taskIsDone }">
      {{ title }}
    </div>

    <div v-if="taskIsDone" v-tooltip="'Remove'" @click="emitRemoveItem">
      <font-awesome-icon icon="trash" class="todo-item__remove-button" />
    </div>
    <div v-else v-tooltip="'Mark as done'" @click="updateDoneStatus">
      <font-awesome-icon icon="check-circle" class="todo-item__done-button" />
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
      this.taskIsDone = !this.taskIsDone;
    },
    emitRemoveItem() {
      this.$emit('remove');
    },
  },
  watch: {
    taskIsDone(isDone) {
      this.$emit('click-done', isDone);
    }
  }
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
}

.todo-item__title {
  color: $dark-liver;
  text-align: left;
}

.todo-item__title--disabled {
  text-decoration: line-through;
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
