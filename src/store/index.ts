import { createStore } from 'vuex';
import { User } from '../types';

interface State {
  users: User[];
}

export default createStore({
  state: {
    users: []
  } as State,
  mutations: {
    setUsers(state: State, users: User[]) {
      state.users = users;
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await fetch(`https://randomuser.me/api/?results=25`);
      const data = await response.json();
      commit('setUsers', data.results);
    }
  },
  getters: {
    getUser: (state: State) => (id: string) => {
      return state.users.find((user) => user.login.uuid === id);
    }
  }
});

