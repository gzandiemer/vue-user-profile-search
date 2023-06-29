import { mount } from "@vue/test-utils";
import UserCard from "@/components/UserCard.vue";
import { createStore } from "vuex";
import { cloneDeep } from 'lodash';
import { State } from "@/store";

interface MyStoreOptions {
  state: State;
  actions: any;
  mutations: any;
  getters: any;
}

describe('UserCard.vue', () => {
  let state: State;
  let actions: any;
  let mutations: any;
  let getters: any;
  let localStore: any;
  let localStoreConfig: MyStoreOptions;
  let wrapper: any;

  const mockUser = {
    name: {
      first: 'Test',
      last: 'User'
    },
    email: 'test.user@example.com',
    picture: {
      thumbnail: 'https://via.placeholder.com/150'
    }
  };

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
    wrapper = mount(UserCard, { 
      props: { user: mockUser },
      global: { plugins: [localStore] } 
    });
  });

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('displays the user name and email', () => {
    const userInfo = wrapper.find('.user-info');
    expect(userInfo.text()).toContain('Test User');
    expect(userInfo.text()).toContain('test.user@example.com');
  });

  it('emits "user-selected" event when user card is clicked', async () => {
    await wrapper.find('.user-card').trigger('click');
    expect(wrapper.emitted('user-selected')).toBeTruthy();
    expect(wrapper.emitted('user-selected')?.[0]).toEqual([mockUser]);
  });
});
