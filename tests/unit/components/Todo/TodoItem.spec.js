import { shallowMount } from '@vue/test-utils'
import TodoItem from '@/components/Todo/TodoItem.vue'

describe('TodoItem', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoItem, {
      props: {
        title: 'Meu titulo',
        isDone: false
      },
      global: {
        stubs: ['FontAwesomeIcon'],
        directives: {
          tooltip: jest.fn(),
        },
      }
    })
  });

  it('renders title correctly', () => {
    expect(wrapper.find('[data-testid="todo-title"]').text()).toMatch('Meu titulo');
  });

  it('does not apply disabled css class on title', () => {
    expect(wrapper.find('[data-testid="todo-item"]').classes()).not.toContain('todo-item--disabled');
  });

  it('renders check circle icon correctly', () => {
    expect(wrapper.find('[data-testid="todo-icon"]').attributes('icon')).toMatch('check-circle');
  });

  it('emits click-done when action button is clicked', async () => {
    wrapper.find('[data-testid="action-button"]').element.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.taskIsDone).toBe(true);
    expect(wrapper.emitted('click-done')).toBeTruthy();
  });

  describe('when task is done', () => {
    beforeEach(() => {
      wrapper.setData({ taskIsDone: true });
    });

    it('applies disabled css class on title', () => {
      expect(wrapper.find('[data-testid="todo-item"]').classes()).toContain('todo-item--disabled');
    });

    it('renders trash icon correctly', () => {
      expect(wrapper.find('[data-testid="todo-icon"]').attributes('icon')).toMatch('trash');
    });

    it('emits remove when action button is clicked', async () => {
      wrapper.find('[data-testid="action-button"]').element.click();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('remove')).toBeTruthy();
    });
  });
})
