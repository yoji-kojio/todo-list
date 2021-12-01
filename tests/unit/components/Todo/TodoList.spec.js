import { shallowMount, flushPromises } from '@vue/test-utils'
import TodoList from '@/components/Todo/TodoList.vue'
import store from '@/store'
import axios from 'axios'

jest.mock('axios', () => ({
  patch: jest.fn(() => Promise.resolve(mockTodoList[0])),
  delete: jest.fn(() => Promise.resolve(mockTodoList[0])),
}))

const mockTodoList = [
  {
    title: "Meu titulo 1",
    done: false,
    id: 1
  },
  {
    title: "Meu titulo 2",
    done: false,
    id: 2
  },
  {
    title: "Meu titulo 3",
    done: false,
    id: 3
  }
];

describe('TodoList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoList, {
      global: {
        plugins: [store]
      }
    });

    store.commit('setTodoList', mockTodoList);
  });

  it('renders TodoItem components correctly', () => {
    expect(wrapper.findAll('[data-testid="todo-list"]').length).toEqual(3);

    mockTodoList.forEach((item, index) => {
      expect(wrapper.findAll('[data-testid="todo-list"]').at(index).attributes('title')).toMatch(item.title);
    });
  });

  describe('when TodoItem emits remove', () => {
    beforeEach(() => {
      wrapper.find('[data-testid="todo-list"]').trigger('remove');
    });

    it('removes item', async () => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/todos/1');

      await flushPromises();

      expect(wrapper.findAll('[data-testid="todo-list"]').length).toEqual(2);
    })
  });

  describe('when TodoItem emits done', () => {
    beforeEach(() => {
      wrapper.find('[data-testid="todo-list"]').trigger('done');
    });

    it('updates done status', async () => {
      expect(axios.patch).toHaveBeenCalledTimes(1);
      expect(axios.patch).toHaveBeenCalledWith('http://localhost:3000/todos/1', { done: true });

      await flushPromises();

      const updatedItem = store.state.todoList.find(item => item.id === 1);

      expect(updatedItem.done).toBe(true);
    })
  });
})
