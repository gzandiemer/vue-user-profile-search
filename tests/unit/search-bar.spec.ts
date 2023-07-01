import { mount } from '@vue/test-utils';

import { cloneDeep } from 'lodash';
import { createStore } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { State } from '@/store';

import SearchBar from '@/components/SearchBar.vue';

library.add(faSearch);

interface MyStoreOptions {
  state: State;
  actions: any;
  mutations: any;
  getters: any;
}

describe('SearchBar.vue', () => {
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
      users: [],
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
    wrapper = mount(SearchBar, {
      global: { plugins: [localStore, FontAwesomeIcon] }
    });
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('emits "update-search" event and updates store on input', async () => {
    const input = wrapper.find('.search-bar__input');
    input.element.value = 'test search';
    await input.trigger('input');

    expect(mutations.setSearchQuery).toHaveBeenCalled();
    expect(wrapper.emitted('update-search')).toBeTruthy();
    expect(wrapper.emitted('update-search')?.[0]).toEqual(['test search']);
  }); 

  it('emits "update-gender" event and updates store on select', async () => {
    const dropdown = wrapper.find('.search-bar__select');
    // Open the dropdown
    await dropdown.trigger('click');
    // Wait for the dropdown to open
    await wrapper.vm.$nextTick(); 

    const option = wrapper
      .findAll('.option')
      .filter((w: { text: () => string }) => w.text() === 'Male')[0];
    await option.trigger('click'); // selects the "Male" option

    // Check the mutation
    expect(mutations.setGender).toHaveBeenCalled();
  });
});
