import { Store, createStore } from 'vuex';
import { State } from '@/store';
import createPersistedState from 'vuex-persistedstate';
import { User } from '@/types';
import { mockUsers } from '#/mocks';

declare const global: any;

describe('Vuex Store', () => {
  let store: Store<State>;

  beforeEach(() => {
    store = createStore({
      plugins: [createPersistedState({
        paths: ['users', 'selectedUser', 'filter', 'page', 'gender']
      })],
      state: {
        users: [],
        selectedUser: null,
        searchQuery: '',
        filter: '',
        page: 1,
        gender: ''
      } as State,
      mutations: {
        setUsers(state: State, users: User[]) {
          state.users = users;
        },
        setSelectedUser(state: State, user: User) {
          state.selectedUser = user;
        },
        clearSelectedUser(state: State) {
          state.selectedUser = null;
        },
        setSearchQuery(state: State, query: string) {
          state.searchQuery = query;
        },
        setFilter(state: State, filter: string) {
          state.filter = filter;
        },
        setGender(state: State, gender: string) {
          state.gender = gender;
        },
        incrementPage(state: State){
          state.page +=1;
          localStorage.setItem('page', JSON.stringify(state.page));
        }
      },
      actions: {
          async fetchUsers({ commit, state }) {
            const response = await fetch(`https://randomuser.me/api/?inc=gender,name,location,email,login,phone,picture&page=${state.page}&results=25`);
            const data = await response.json();
            commit('setUsers', [...state.users, ...data.results]);
            commit('incrementPage');
          }
      },
      getters: {
        getUser: (state: State) => (id: string) => {
          return state.users.find((user: User) => user.login.uuid === id);
        }
      }
    });
  });


  const mockUser: User = mockUsers[0];
   


  test('setUsers mutation should set users state', () => {
    const users: User[] = [mockUser];
    store.commit('setUsers', users);
    expect(store.state.users).toEqual(users);
  });

  test('setSelectedUser mutation should set selectedUser state', () => {
    store.commit('setSelectedUser', mockUser);
    expect(store.state.selectedUser).toEqual(mockUser);
  });

  // Add similar tests for other mutations

  //Testing actions usually involves mocking dependencies like APIs and are more complex.
  test('fetchUsers action should fetch users', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: [mockUser, mockUser] }),
      })
    );

    await store.dispatch('fetchUsers');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(store.state.users.length).toBeGreaterThan(0);
  });

  //Testing getters
  test('getUser getter should return user with given id', () => {
    const users: User[] = [mockUser];
    store.commit('setUsers', users);
    const id = mockUser.login.uuid;
    const user = store.getters.getUser(id);
    expect(user).toEqual(mockUser);
  });
});
