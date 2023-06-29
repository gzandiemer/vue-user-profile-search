import { mount } from "@vue/test-utils";
import SearchBar from "@/components/SearchBar.vue";
import { createStore } from "vuex";
import { cloneDeep } from 'lodash';
import { State } from "@/store";

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

  beforeEach(() => {
    state = {
      users: [],
      selectedUser: null,
      searchQuery: '',
      filter: '',
      page: 1,
      gender: ''
    };

    actions = {};

    mutations = {
      setSearchQuery: jest.fn(),
      setGender: jest.fn()
    };

    getters = {};

    localStoreConfig = {
      state,
      actions,
      mutations,
      getters
    };

    localStore = createStore(cloneDeep(localStoreConfig));
  });

  beforeEach(() => {
    wrapper = mount(SearchBar, { global: { plugins: [localStore] } });
  });

  // it('should render correctly', () => {
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  it('emits "update-search" event and updates store on input', async () => {
    const input = wrapper.find('.search-bar__input');
    input.element.value = 'test search';
    await input.trigger('input');

    expect(mutations.setSearchQuery).toHaveBeenCalled();
    expect(wrapper.emitted('update-search')).toBeTruthy();
    expect(wrapper.emitted('update-search')?.[0]).toEqual(['test search']);
  }); //PASSES

  // it('emits "update-gender" event and updates store on select', async () => {
  //   const select = wrapper.find('.search-bar__select');
  //   await select.setValue('male');

  //   expect(mutations.setGender).toHaveBeenCalled();
  //   expect(wrapper.emitted('update-gender')).toBeTruthy();
  //   expect(wrapper.emitted('update-gender')?.[0]).toEqual(['male']);
  // });

});
