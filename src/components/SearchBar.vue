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
import { defineComponent, ref } from 'vue';
export default defineComponent({
  emits: ['update-search', 'update-gender'],
  setup(_, { emit }) {
    // Use Vue 3's Composition API ref to create reactive variables
    const search = ref('');
    const gender = ref('');

    const updateSearch = () => {
      // Emit updated search value
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
