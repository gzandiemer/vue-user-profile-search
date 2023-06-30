// Test-specific libraries
import { mount } from '@vue/test-utils';

// Other libraries
import { createStore } from 'vuex';
import { cloneDeep } from 'lodash';

// Your own modules
import { State } from '@/store';
import { mockUsers } from '#/mocks';

// Components and views, alphabetical order
import SearchBar from '@/components/SearchBar.vue';
import UserDetailModal from '@/components/UserDetailModal.vue';
import UserList from '@/components/UserList.vue';

// Component being tested last
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
      fetchUsers: mockFetchUsers,
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
  }); //PASSES

  it('does not render UserDetailModal when no selectedUser', () => {
    expect(wrapper.findComponent(UserDetailModal).exists()).toBe(false);
  }); //PASSES

  it('renders UserDetailModal when there is a selectedUser', async () => {
    localStore.state.selectedUser = mockUsers[0];
    await wrapper.vm.$nextTick(); // Wait for re-render
    expect(wrapper.findComponent(UserDetailModal).exists()).toBe(true);
  }); //PASSES

  it('computes selectedUser, search, and gender from store', () => {
    expect(wrapper.vm.selectedUser).toBe(localStore.state.selectedUser);
    expect(wrapper.vm.searchQuery).toBe(localStore.state.searchQuery);
    expect(wrapper.vm.gender).toBe(localStore.state.gender);
  }); // PASSES

  it('rerenders UserDetailModal when selectedUser changes', async () => {
    localStore.state.selectedUser = mockUsers[0];
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(UserDetailModal).exists()).toBe(true);
  }); //PASSES

  // it('dispatches the correct actions with correct parameters', async () => {
  //   jest.spyOn(localStore, 'dispatch');

  //   const selectedUser = mockUsers[0];
  //   await wrapper.findComponent(SearchBar).vm.$emit('update-search', 'test');
  //   await wrapper.findComponent(SearchBar).vm.$emit('update-gender', 'male');
  //   await wrapper.findComponent(UserList).vm.$emit('user-selected', selectedUser);

  //   await wrapper.vm.$nextTick();

  //   // Emit the close event on the wrapper
  //   await wrapper.vm.$emit('close');

  //   await wrapper.vm.$nextTick();

  //   expect(actions.setSearchQuery).toHaveBeenCalledWith('test');
  //   expect(actions.setGender).toHaveBeenCalledWith('male');
  //   expect(actions.setSelectedUser).toHaveBeenCalledWith(selectedUser);
  //   expect(actions.clearSelectedUser).toHaveBeenCalled();
  // });

  // it('commits the correct mutations with correct parameters', async () => {
  //   const selectedUser = mockUsers[0];
  //   await wrapper.findComponent(SearchBar).vm.$emit('update-search', 'test');
  //   await wrapper.findComponent(SearchBar).vm.$emit('update-gender', 'male');
  //   await wrapper.findComponent(UserList).vm.$emit('user-selected', selectedUser);
  
  //   await wrapper.vm.$nextTick(); // update after user-selected
  
  //   console.log(localStore.state); // Print current state of the store
  
  //   console.log(wrapper.html()); // Print current state of the component
  
  //   // Emit the close event on the UserDetailModal component
  //   await wrapper.findComponent({ name: 'UserDetailModal' }).vm.$emit('close');
  
  //   await wrapper.vm.$nextTick(); // update after close
  
  //   expect(mutations.setSearchQuery).toHaveBeenCalledWith(expect.anything(), 'test');
  //   expect(mutations.setGender).toHaveBeenCalledWith(expect.anything(), 'male');
  //   expect(mutations.setSelectedUser).toHaveBeenCalledWith(expect.anything(), selectedUser);
  //   expect(mutations.clearSelectedUser).toHaveBeenCalled();
  // });
  
  
  
  
  
});
