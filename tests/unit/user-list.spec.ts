import { mount } from "@vue/test-utils";
import UserList from "@/components/UserList.vue";
import UserCard from "@/components/UserCard.vue";
import { createStore } from "vuex";
import { cloneDeep } from 'lodash';
import { State } from "@/store";
import { mockUsers } from '#/mocks';

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
    
      it('renders a UserCard for each user in state', () => {
        const userCards = wrapper.findAllComponents(UserCard);
        expect(userCards.length).toBe(localStore.state.users.length);
      });
    
      it('emits "user-selected" when a UserCard emits "user-selected"', async () => {
        await wrapper.vm.$nextTick();
        const userCards = wrapper.findAllComponents(UserCard);
        if(userCards.length > 0) {
          const selectedUser = localStore.state.users[0];
          await userCards[0].vm.$emit('user-selected', selectedUser);
          expect(wrapper.emitted('user-selected')).toBeTruthy();
          expect(wrapper.emitted('user-selected')?.[0]).toEqual([selectedUser]);
        } else {
          throw new Error('No UserCard components found');
        }
      });
    });