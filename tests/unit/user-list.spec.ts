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
      FETCH_USERS: mockFetchUsers
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
    wrapper = mount(UserList, {
      global: {
        plugins: [localStore],
        stubs: {
          'user-summary-card': UserSummaryCard
        }
      }
    });
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('dispatches "FETCH_USERS" action when component is mounted', () => {
    expect(actions.FETCH_USERS).toHaveBeenCalled();
  });

  it('renders a UserSummaryCard for each user in state', () => {
    const UserSummaryCards = wrapper.findAllComponents(UserSummaryCard);
    expect(UserSummaryCards.length).toBe(mockUsers.length);
  });

  it('renders UserSummaryCard components for each filtered user', () => {
    const filteredUsers = mockUsers;
    expect(wrapper.findAllComponents(UserSummaryCard)).toHaveLength(
      filteredUsers.length
    );
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

  it('dispatches "FETCH_USERS" action when component is mounted', () => {
    expect(actions.FETCH_USERS).toHaveBeenCalled();
  });

  it('calls "FETCH_USERS" action when scrolled to the bottom of the page', async () => {
    // Mock the scroll event
    const scrollEvent = new Event('scroll');
    Object.defineProperty(window, 'innerHeight', { value: 800 });
    Object.defineProperty(document.documentElement, 'offsetHeight', {
      value: 1000
    });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 200
    });

    // Trigger the scroll event
    window.dispatchEvent(scrollEvent);

    await wrapper.vm.$nextTick();

    expect(actions.FETCH_USERS).toHaveBeenCalled();
  });
});
