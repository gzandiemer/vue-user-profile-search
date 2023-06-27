<template>
  <div>
    <search-bar
      @update-search="updateSearch"
      @update-gender="updateGender"
    />
    <user-list
      :search="search"
      :gender="gender"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import SearchBar from '@/components/SearchBar.vue';
import UserList from '@/components/UserList.vue';

export default defineComponent({
  name: 'UserListView',
  components: {
    SearchBar,
    UserList
  },
  setup() {
    const store = useStore();

    onMounted(async () => {
      store.dispatch('fetchUsers');
    });

    const search = ref('');
    const gender = ref('');

    const updateSearch = (value: string) => {
      search.value = value;
    };

    const updateGender = (value: string) => {
      gender.value = value;
    };

    return {
      search,
      gender,
      updateSearch,
      updateGender
    };
  }
});
</script>

<style scoped></style>
