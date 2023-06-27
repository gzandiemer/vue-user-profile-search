import { createStore } from 'vuex';
import { User } from '../types';

interface State {
  users: User[];
  page: number;
}

export default createStore({
  state: {
    users: [],
    page: 1,
  } as State,
  mutations: {
    setUsers(state: State, users: User[]) {
      state.users = state.users.concat(users);
    },
    incrementPage(state: State){
      state.page ++;
    }
  },
  actions: {
    async fetchUsers({ commit, state }) {
      const response = await fetch(`https://randomuser.me/api/?results=25&page=${state.page}`);
      const data = await response.json();
      commit('setUsers', data.results);
      commit('incrementPage');
    }
  },
  getters: {
    getUser: (state: State) => (id: string) => {
      return state.users.find((user) => user.login.uuid === id);
    }
  }
});

