import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { User } from '@/types';

export interface State {
  users: User[];
  selectedUser: User | null;
  searchQuery: string;
  filter: string;
  page: number;
  gender: string;
}

export default createStore({
  plugins: [createPersistedState({
    paths: ['users', 'selectedUser', 'filter', 'page', 'gender', 'searchQuery']
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
    }
  },
  actions: {
    async FETCH_USERS({ commit, state }) {
      try {
        const response = await fetch(`https://randomuser.me/api/?inc=gender,name,location,email,login,phone,picture&page=${state.page}&results=25`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        commit('setUsers', [...state.users, ...data.results]);
        commit('incrementPage');
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  },
  
  getters: {
    getUser: (state: State) => (id: string) => {
      return state.users.find((user) => user.login.uuid === id);
    },
    filteredUsers: (state: State) => {
      const searchQuery = state.searchQuery.toLowerCase();
      const genderFilter = state.gender;
      return state.users.filter((user: User) => {
        const nameMatch = `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(searchQuery);
        const genderMatch = genderFilter === "" || user.gender === genderFilter;
        return nameMatch && genderMatch;
      });
    }
  }
});

