import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    todoList: [],
  },
  getters: {
    orderedTodoList(state) {
      return state.todoList.sort((a,b) => (a.done > b.done) ? 1 : ((b.done > a.done) ? -1 : 0))
    },
    completedTodoList(state) {
      return state.todoList.filter(item => item.done === true);
    }
  },
  mutations: {
    setTodoList(state, list) {
      state.todoList = list;
    },
    insertTodoItem(state, item) {
      state.todoList = [...state.todoList, item];
    },
    updateTodoItemDone(state, { itemId, isDone }) {
      const index = state.todoList.findIndex(item => item.id === itemId);
      state.todoList[index].done = isDone;
    },
    removeItemFromList(state, { itemId }) {
      state.todoList = state.todoList.filter(item => item.id !== itemId);
    }
  },
  actions: {
    async fetchTodoList({ commit }) {
      await axios.get(`http://localhost:3000/todos`).then(response => {
        commit('setTodoList', response.data);
      }).catch(error => {
        console.error(error);
      });
    }
  },
})
