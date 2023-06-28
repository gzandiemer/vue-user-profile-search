import { mount } from "@vue/test-utils";
import UserList from "@/components/UserList.vue";
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

describe('UserList.vue', () => {
  let state: State;
  let actions: any;
  let mutations: any;
  let getters: any;
  let localStore: any;
  let localStoreConfig: MyStoreOptions;
  let wrapper: any;

  const mockFetchUsers = jest.fn();

  const usersData = [{
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'John',
      last: 'Doe'
    },
    location: {
      street: {
        number: 123,
        name: 'Main St'
      },
      city: 'Anytown',
      state: 'AnyState',
      country: 'AnyCountry',
      postcode: '12345',
      coordinates: {
        latitude: '50.0000',
        longitude: '50.0000'
      },
      timezone: {
        offset: '+1:00',
        description: 'AnyTimezone'
      }
    },
    email: 'john.doe@example.com',
    login: {
      uuid: '1a2b3c',
      username: 'johndoe',
      password: 'password',
      salt: 'salt',
      md5: 'md5',
      sha1: 'sha1',
      sha256: 'sha256'
    },
    phone: '123-456-7890',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/1.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/1.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
    },
    dob: {
      date: '1970-01-01T00:00:00Z',
      age: 50
    },
    registered: {
      date: '2022-01-01T00:00:00Z',
      age: 1
    },
    cell: '123-456-7890',
    id: {
      name: 'idname',
      value: 'idvalue'
    },
      nat: 'US'
    }, {
      gender: 'female',
      name: {
        title: 'Ms',
        first: 'Jane',
        last: 'Doe'
      },
      location: {
        street: {
          number: 100,
          name: 'Anystreet'
        },
        city: 'Anytown',
        state: 'AnyState',
        country: 'AnyCountry',
        postcode: '12345',
        coordinates: {
          latitude: '50.0000',
          longitude: '50.0000'
        },
        timezone: {
          offset: '+1:00',
          description: 'AnyTimezone'
        }
      },
      email: 'john.doe@example.com',
      login: {
        uuid: '9z8y7w',
        username: 'johndoe',
        password: 'password',
        salt: 'salt',
        md5: 'md5',
        sha1: 'sha1',
        sha256: 'sha256'
      },
      phone: '123-456-7890',
      picture: {
        large: 'https://randomuser.me/api/portraits/men/1.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/1.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
      },
      dob: {
        date: '1970-01-01T00:00:00Z',
        age: 50
      },
      registered: {
        date: '2022-01-01T00:00:00Z',
        age: 1
      },
      cell: '123-456-7890',
      id: {
        name: 'idname',
        value: 'idvalue'
      },
        nat: 'US'
      }];

      
      beforeEach(() => {
        state = {
          users: usersData,  // predefined usersData
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
          getUser: jest.fn(),
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
        wrapper = mount(UserList, { global: { plugins: [localStore] } });
      });
    
      it('should render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot();
      });
    
      it('dispatches "fetchUsers" on component mount', () => {
        expect(mockFetchUsers).toHaveBeenCalled();
      });
    
      it('renders a UserCard for each user in state', () => {
        const userCards = wrapper.findAllComponents(UserCard);
        expect(userCards.length).toBe(localStore.state.users.length);
      });
    
      it('emits "user-selected" when a UserCard emits "user-selected"', async () => {
        await wrapper.vm.$nextTick();
        const userCards = wrapper.findAllComponents(UserCard);
        if(userCards.length > 0) {
          const selectedUser = localStore.state.users[0];
          await userCards[0].vm.$emit('user-selected', selectedUser);
          expect(wrapper.emitted('user-selected')).toBeTruthy();
          expect(wrapper.emitted('user-selected')?.[0]).toEqual([selectedUser]);
        } else {
          throw new Error('No UserCard components found');
        }
      });
    });