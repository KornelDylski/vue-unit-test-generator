import { shallowMount } from '@vue/test-utils';
import EmptyComponent from '../EmptyComponent.vue';

/**
 * EmptyComponent.vue unit tests
 */
describe('EmptyComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(EmptyComponent);
  });

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
