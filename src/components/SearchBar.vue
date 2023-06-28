<template>
  <div>
    <input
      v-model="search"
      type="text"
      placeholder="Search by name..."
      @input="updateSearch"
    >
    <select
      v-model="gender"
      @change="updateGender"
    >
      <option value="">
        All
      </option>
      <option value="male">
        Male
      </option>
      <option value="female">
        Female
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  emits: ['update-search', 'update-gender'],
  setup(_, { emit }) {
    const store = useStore();
    
    const search = computed({
      get: () => store.state.searchQuery,
      set: (value) => {
        store.commit('setSearchQuery', value);
        emit('update-search', value);
      },
    });

    const gender = computed({
      get: () => store.state.gender,
      set: (value) => {
        store.commit('setGender', value);
        emit('update-gender', value);
      },
    });

    const updateSearch = () => {
      emit('update-search', search.value);
    };

    const updateGender = () => {
      emit('update-gender', gender.value);
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

<style></style>
