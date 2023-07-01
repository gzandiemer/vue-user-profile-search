// test specific libraries
import { mount } from '@vue/test-utils';
// other libraries
import { createStore } from 'vuex';
import { cloneDeep } from 'lodash';
// own modules
import { State } from '@/store';
import { mockUsers } from '#/--mocks--/mock-users';
// other components
import SearchBar from '@/components/SearchBar.vue';
import UserDetailModal from '@/components/UserDetailModal.vue';
import UserList from '@/components/UserList.vue';
// the tested component
import HomeView from '@/views/HomeView.vue';

interface MyStoreOptions {
  state: State;
  actions: any;
  mutations: any;
  getters: any;
}

describe('HomeView.vue', () => {
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
      getUser: jest.fn()
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
    wrapper = mount(HomeView, {
      global: {
        plugins: [localStore],
        stubs: {
          'search-bar': SearchBar,
          'user-list': UserList,
          'user-detail-modal': UserDetailModal,
          'font-awesome-icon': true
        }
      }
    });
  });

  it('renders SearchBar and UserList components', () => {
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true);
    expect(wrapper.findComponent(UserList).exists()).toBe(true);
  }); 

  it('does not render UserDetailModal when no selectedUser', () => {
    expect(wrapper.findComponent(UserDetailModal).exists()).toBe(false);
  }); 

  it('renders UserDetailModal when there is a selectedUser', async () => {
    localStore.state.selectedUser = mockUsers[0];
    await wrapper.vm.$nextTick(); // Wait for re-render
    expect(wrapper.findComponent(UserDetailModal).exists()).toBe(true);
  }); 

  it('computes selectedUser, search, and gender from store', () => {
    expect(wrapper.vm.selectedUser).toBe(localStore.state.selectedUser);
    expect(wrapper.vm.searchQuery).toBe(localStore.state.searchQuery);
    expect(wrapper.vm.gender).toBe(localStore.state.gender);
  }); 

  it('rerenders UserDetailModal when selectedUser changes', async () => {
    localStore.state.selectedUser = mockUsers[0];
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(UserDetailModal).exists()).toBe(true);
  }); 

});
