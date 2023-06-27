import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { User } from '../types';

interface State {
  users: User[];
  selectedUser: User | null;
  searchQuery: string;
  filter: string;
  page: number;
}

export default createStore({
  plugins: [createPersistedState()],
  state: {
    users: [],
    selectedUser: null,
    searchQuery: '',
    filter: '',
    page: 1,
  } as State,
  mutations: {
    setUsers(state: State, users: User[]) {
      state.users = users;
    },
    setSelectedUser(state: State, user: User) {
      state.selectedUser = user;
    },
    setSearchQuery(state: State, query: string) {
      state.searchQuery = query;
    },
    setFilter(state: State, filter: string) {
      state.filter = filter;
    },
    incrementPage(state: State){
      state.page +=1;
      localStorage.setItem('page', JSON.stringify(state.page));
    }
  },
  actions: {
      async fetchUsers({ commit, state }) {
        const response = await fetch(`https://randomuser.me/api/?page=${state.page}&results=25`);
        const data = await response.json();
        commit('setUsers', [...state.users, ...data.results]);
        commit('incrementPage');
      }
  },
  getters: {
    getUser: (state: State) => (id: string) => {
      return state.users.find((user) => user.login.uuid === id);
    }
  }
});

