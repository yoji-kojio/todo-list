<template>
  <div class="progress-bar">
    <div class="progress-bar__current-progress" :style="{ width: `${this.currentProgressInPercent}%` }" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProgressBar',
  computed: {
    ...mapGetters(['orderedTodoList', 'completedTodoList']),
    currentProgressInPercent() {
      return (this.completedTodoList.length / this.orderedTodoList.length) * 100;
    }
  }
}
</script>

<style lang="scss">
.progress-bar {
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  border: 1px solid $light-blue;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  height: 15px;
}

.progress-bar__current-progress {
  background-color: $dark-blue;
  height: 100%;
  border-radius: 10px;
}
</style>
