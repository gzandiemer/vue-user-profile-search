import { mount } from '@vue/test-utils';

import { mockUsers } from '#/--mocks--/mock-users';

import UserDetailModal from '@/components/UserDetailModal.vue';

describe('UserDetailModal.vue', () => {
  it('displays user details correctly', () => {
    const user = mockUsers[0];
    const wrapper = mount(UserDetailModal, {
      props: {
        user
      },
      global: {
        stubs: {
          'font-awesome-icon': true
        }
      }
    });

    expect(wrapper.find('img').attributes('src')).toBe(user.picture.large);
    expect(wrapper.text()).toContain(user.name.first);
    expect(wrapper.text()).toContain(user.name.last);
    expect(wrapper.text()).toContain(user.login.uuid);
    expect(wrapper.text()).toContain(user.location.street.name);
    expect(wrapper.text()).toContain(user.location.street.number.toString());
    expect(wrapper.text()).toContain(user.location.postcode);
    expect(wrapper.text()).toContain(user.location.city);
    expect(wrapper.text()).toContain(user.location.state);
    expect(wrapper.text()).toContain(user.location.country);
    expect(wrapper.text()).toContain(user.email);
    expect(wrapper.text()).toContain(user.phone);
  });

  it('emits close event when closeModal method is called', async () => {
    const user = mockUsers[0];
    const wrapper = mount(UserDetailModal, {
      props: {
        user
      }
    });

    // Call closeModal
    await wrapper.vm.closeModal();

    // Check if 'close' event was emitted
    expect(wrapper.emitted()).toHaveProperty('close');
  });
});
