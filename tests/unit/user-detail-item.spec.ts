jest.mock('@fortawesome/vue-fontawesome');

import { mount } from '@vue/test-utils';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import UserDetailItem from '@/components/UserDetailItem.vue';

describe('UserDetailItem.vue', () => {
  it('displays icon and details correctly', () => {
    const icon: IconProp[] = [['fas', 'user']];
    const details: string[] = ['Detail 1', 'Detail 2'];
    const size = 'lg';
    const color = '#f18a19';

    const wrapper = mount(UserDetailItem, {
      props: {
        icon,
        details,
        size,
        color
      },
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon
        }
      }
    });

    // Check for the icon and its properties
    const iconWrapper = wrapper.findComponent({ name: 'font-awesome-icon' });
    expect(iconWrapper.exists()).toBe(true);
    expect(iconWrapper.props('icon')).toEqual(icon);
    expect(iconWrapper.props('size')).toBe(size);

    // Check for details
    const detailsElements = wrapper.findAll('.user-detail-info p');
    expect(detailsElements.length).toBe(details.length);
    detailsElements.forEach((detailElement, index) => {
      expect(detailElement.text()).toBe(details[index]);
    });
  });
});
