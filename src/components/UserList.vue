<template>
  <div>
    <user-card
      v-for="user in filteredUsers"
      :key="user.login.uuid"
      :user="user"
      @user-selected="$emit('userSelected', $event)"
    />
    <button @click="fetchUsers">
      More results...
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted} from 'vue';
import { useStore } from 'vuex';
import UserCard from '../components/UserCard.vue';
import { User } from '../types';

export default defineComponent({
  name: 'UserList',
  components: { UserCard },
  setup(_, { emit }) {
    const store = useStore();

    const fetchUsers = async () => {
      await store.dispatch('fetchUsers');
    };

    const users = computed(() => store.state.users as User[]);

    const filteredUsers = computed(() => {
      const searchQuery = store.state.searchQuery.toLowerCase();
      const genderFilter = store.state.gender;
      return users.value.filter((user: User) => {
        const nameMatch = `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(searchQuery);
        const genderMatch = genderFilter === '' || user.gender === genderFilter;
        return nameMatch && genderMatch;
      });
    });

    const onScroll = () => {
      const bottomOfWindow = Math.max(window.pageYOffset,
      document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;

      if(bottomOfWindow) {
        fetchUsers();
      }
    }
    onMounted(() => {
      // Add scroll event listener on component mount
      window.addEventListener('scroll', onScroll);
      // Fetch initial users on component mount
      fetchUsers();
    });

    onUnmounted(() => {
      // Remove scroll event listener before component unmount
      window.removeEventListener('scroll', onScroll);
    });

    const userSelected = (user: User) => {
        emit('user-selected', user);
    };

    return { fetchUsers, users, filteredUsers, userSelected };
  }
});
</script>

<style scoped>
 button {
    display: block;
    width: 90%;
    padding: 1rem;
    margin: 2rem auto;
    color: #fff;
    background-color: #F18A19; /* Adjust color to match your theme */
    border: none;
    border-radius: 50px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #D16A00; /* Slightly darker shade for hover effect */
  }

  /* Adjust button size for small screens */
  @media screen and (max-width: 600px) {
    button {
      padding: 0.8rem;
      font-size: 1rem;
    }
  }

</style>
