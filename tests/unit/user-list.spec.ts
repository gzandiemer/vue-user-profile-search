import { mount } from '@vue/test-utils';

import { cloneDeep } from 'lodash';
import { createStore } from 'vuex';

import { State } from '@/store';
import { mockUsers } from '#/--mocks--/mock-users';

import UserSummaryCard from '@/components/UserSummaryCard.vue';

import UserList from '@/components/UserList.vue';

interface MyStoreOptions {
  state: State;
  actions: any;
  mutations: any;
  getters: any;
}

describe('UserList.vue', () => {
  let state: State;
  let actions: any;
  let mutations: any;
  let getters: any;
  let localStore: any;
  let localStoreConfig: MyStoreOptions;
  let wrapper: any;

  const mockFetchUsers = jest.fn();

  beforeEach(() => {
    state = {
      users: mockUsers,
      selectedUser: null,
      searchQuery: '',
      filter: '',
      page: 1,
      gender: ''
    };

    actions = {
      fetchUsers: mockFetchUsers
    };

    mutations = {
      setUsers: jest.fn(),
      setSelectedUser: jest.fn(),
      clearSelectedUser: jest.fn(),
      setSearchQuery: jest.fn(),
      setFilter: jest.fn(),
      setGender: jest.fn(),
      incrementPage: jest.fn()
    };

    getters = {
      getUser: jest.fn(),
      filteredUsers: jest.fn().mockReturnValue(mockUsers)
    };

    localStoreConfig = {
      state,
      actions,
      mutations,
      getters
    };

    localStore = createStore(cloneDeep(localStoreConfig));
  });

  beforeEach(() => {
    wrapper = mount(UserList, { global: { plugins: [localStore] } });
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('dispatches "fetchUsers" on component mount', () => {
    expect(mockFetchUsers).toHaveBeenCalled();
  });

  it('renders a UserSummaryCard for each user in state', () => {
    const UserSummaryCards = wrapper.findAllComponents(UserSummaryCard);
    expect(UserSummaryCards.length).toBe(mockUsers.length);
  });

  it('emits "user-selected" when a UserSummaryCard emits "user-selected"', async () => {
    await wrapper.vm.$nextTick();
    const UserSummaryCards = wrapper.findAllComponents(UserSummaryCard);
    if (UserSummaryCards.length > 0) {
      const selectedUser = mockUsers[0];
      await UserSummaryCards[0].vm.$emit('user-selected', selectedUser);
      expect(wrapper.emitted('user-selected')).toBeTruthy();
      expect(wrapper.emitted('user-selected')?.[0]).toEqual([selectedUser]);
    } else {
      throw new Error('No UserSummaryCard components found');
    }
  });

  it('calls "fetchUsers" when "More results..." button is clicked', async () => {
    const moreButton = wrapper.find('button');
    await moreButton.trigger('click');
    expect(actions.fetchUsers).toHaveBeenCalled();
  });

  it('calls "fetchUsers" when component is mounted', () => {
    expect(actions.fetchUsers).toHaveBeenCalled();
  });

  it('calls "fetchUsers" when window is scrolled to bottom', async () => {
    // Simulate window.pageYOffset
    Object.defineProperty(window, 'pageYOffset', { value: 1000 });
    // Simulate document.documentElement.scrollTop
    document.documentElement.scrollTop = 1000;
    // Simulate document.body.scrollTop
    document.body.scrollTop = 1000;
    // Simulate document.documentElement.offsetHeight
    Object.defineProperty(document.documentElement, 'offsetHeight', {
      value: 1000
    });
    // Simulate window.innerHeight
    window.innerHeight = 1000;

    window.dispatchEvent(new Event('scroll'));

    await wrapper.vm.$nextTick();
    expect(actions.fetchUsers).toHaveBeenCalled();
  });
});
