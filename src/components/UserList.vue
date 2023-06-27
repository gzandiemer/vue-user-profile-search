<template>
  <div>
    <user-card
      v-for="user in filteredUsers"
      :key="user.login.uuid"
      :user="user"
    />
    <button @click="fetchUsers">
      More results...
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import UserCard from '../components/UserCard.vue';
import { User } from '../types';

export default defineComponent({
  name: 'UserList',
  components: { UserCard },
  props: {
    search: String,
    gender: String
  },
  setup(props) {
    const store = useStore();

    const fetchUsers = async () => {
      await store.dispatch('fetchUsers');
    };

    const users = computed(() => store.state.users as User[]);

    const filteredUsers = computed(() => {
      return users.value.filter((user: User) => {
        const searchString = props.search ? props.search.toLowerCase() : '';
        const nameMatch = `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(searchString);
        const genderMatch = props.gender === '' || user.gender === props.gender;
        return nameMatch && genderMatch;
      });
    });

    return { fetchUsers, users, filteredUsers };
  },
  async mounted() {
    // Add scroll event listener on component mount
    window.addEventListener('scroll', this.fetchUsers);
    // Fetch initial users on component mount
    await this.fetchUsers();
  },
  beforeUnmount() {
    // Remove scroll event listener before component unmount
    window.removeEventListener('scroll', this.fetchUsers);
    //},
    // methods: {
    //   async fetchUsers() {
    //     // Fetch users from API and store them in 'users' data property
    //     const response = await fetch(
    //       'https://randomuser.me/api/?results=25&page=${this.page}'
    //     );
    //     const data = await response.json();
    //     this.users = [...this.users, ...data.results];
    //     // This method is called when component is mounted, when "More results..." button is clicked
    //     //and when user scrolls to the bottom
    //   },
    //   loadMore() {
    //     // Check if user has scrolled to the bottom of the page
    //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //       // Load more users
    //       this.page += 1;
    //       this.fetchUsers();
    //     }
    //   }
  }
});
</script>

<style scoped></style>
