import { mount } from "@vue/test-utils";

import { cloneDeep } from 'lodash';
import { createStore } from "vuex";

import { State } from "@/store";
import { mockUsers } from '#/mocks';

import UserSummaryCard from "@/components/UserSummaryCard.vue";

interface MyStoreOptions {
  state: State;
  actions: any;
  mutations: any;
  getters: any;
}

describe('UserSummaryCard.vue', () => {
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
      setSelectedUser: jest.fn()
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
    wrapper = mount(UserSummaryCard, { 
      props: { user: mockUsers[0] },
      global: { plugins: [localStore] } 
    });
  });

  // it('should render correctly', () => {
  //   const user = mockUsers[0]; // Get the first user from mockUsers
  //   expect(wrapper.html()).toMatchSnapshot({
  //     user: {
  //       name: {
  //         first: user.name.first,
  //         last: user.name.last,
  //       },
  //       email: user.email,
  //       picture: {
  //         thumbnail: user.picture.thumbnail,
  //       },
  //     },
  //   });
  // });
  
  it('displays the user name and email', () => {
    const userInfo = wrapper.find('.user-info');
    expect(userInfo.text()).toContain(mockUsers[0].name.first);
    expect(userInfo.text()).toContain(mockUsers[0].name.last);
    expect(userInfo.text()).toContain(mockUsers[0].email);
  }); //PASSES

  it('emits "user-selected" event when user card is clicked', async () => {
    await wrapper.find('.user-card').trigger('click');
    expect(wrapper.emitted('user-selected')).toBeTruthy();
    expect(wrapper.emitted('user-selected')?.[0]).toEqual([mockUsers[0]]);
  }); //PASSES
});

