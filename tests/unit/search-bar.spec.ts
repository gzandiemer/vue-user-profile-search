import { mount } from '@vue/test-utils';

import { cloneDeep } from 'lodash';
import { createStore } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { State } from '@/store';

import SearchBar from '@/components/SearchBar.vue';

library.add(faSearch)

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

  // const mockFontAwesome = {
  //   install(app: any) {
  //     app.component('font-awesome-icon', {
  //       template: '<div class="fa-icon"></div>'
  //     });
  //   },
  // };

  beforeEach(() => {
    wrapper = mount(SearchBar, { global: { plugins: [localStore, FontAwesomeIcon] } });
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
  }); //PASSES

  it('emits "update-gender" event and updates store on select', async () => {
  const dropdown = wrapper.find('.search-bar__select');
  await dropdown.trigger('click'); // opens the dropdown

  await wrapper.vm.$nextTick(); // wait for the dropdown to open

  const option = wrapper.findAll('.option').filter((w: { text: () => string; }) => w.text() === 'Male')[0];
  await option.trigger('click'); // selects the "Male" option

  // Check the mutation
  expect(mutations.setGender).toHaveBeenCalled();
});

  
});
