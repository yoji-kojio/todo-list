import { shallowMount } from '@vue/test-utils'
import TodoCreateForm from '@/components/Todo/TodoCreateForm.vue'
import store from '@/store'
import axios from 'axios'

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve(mockTodoList[0])),
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

describe('TodoCreateForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoCreateForm, {
      global: {
        plugins: [store],
        stubs: ['FontAwesomeIcon'],
        directives: {
          tooltip: jest.fn(),
        }
      }
    });

    store.commit('setTodoList', mockTodoList);
  });

  it('renders icon button', () => {
    expect(wrapper.find('[data-testid="icon-button"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="input-container"]').exists()).toBe(false);
  });

  describe('when user clicks on create button', () => {
    beforeEach(() => {
      wrapper.find('[data-testid="icon-button"]').trigger('click');
    });

    it('sets component on create mode', () => {
      expect(wrapper.vm.inCreateMode).toBe(true);
    });

    it('displays input container section', () => {
      expect(wrapper.find('[data-testid="input-container" ]').exists()).toBe(true);
    });

    describe('and click to create todo item', () => {
      beforeEach(() => {
        const input = wrapper.find('[data-testid="todo-text-input"]');

        input.setValue('meu novo todo');
        input.trigger('keyup.enter');
      });

      it('calls axios post for create', () => {
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/todos', {
          title: 'meu novo todo',
          done: false
        });
      });

      it('creates a new todo item', () => {
        expect(store.state.todoList.length).toEqual(4);
      });
    });
  });
})
