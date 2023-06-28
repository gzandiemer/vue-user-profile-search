<template>
  <div class="search-bar">
    <div class="search-bar__input-container">
      <input
      class="search-bar__input"
      v-model="search"
      type="text"
      placeholder="Search by name..."
      @input="updateSearch"
      >
      <font-awesome-icon :icon="['fas', 'search']" class="search-icon"></font-awesome-icon>
    </div>
    
    <select
      class="search-bar__select"
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
  },
  data() {
    return {
      isSmallScreen: window.innerWidth <= 600, // You can adjust the value as needed
    };
  },
  computed: {
    maleOptionText() {
      return this.isSmallScreen ? 'M' : 'Male';
    },
    femaleOptionText() {
      return this.isSmallScreen ? 'F' : 'Female';
    },
  },
  created() {
    window.addEventListener('resize', this.updateScreenWidth);
  },
  unmounted() {
    window.removeEventListener('resize', this.updateScreenWidth);
  },
  methods: {
    updateScreenWidth() {
      this.isSmallScreen = window.innerWidth <= 600; // You can adjust the value as needed
    }
  }
});
</script>

<style scoped>
.search-bar__input-container {
  position: relative;
  width: 80%;
  margin-top: 2%;
}
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
}

.search-bar__input {
  width: 70%;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  padding-left: 4rem;
  background-size: 3rem;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 14%;
  transform: translateY(-50%);
  font-size: 1.4rem; 
  color: #F18A19 
}

.search-bar__select {
  margin-top: 2%;
  margin-right: 8%;
  width: 15%;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  text-align: center; 
  text-align-last: center; 
}

@media screen and (max-width: 600px) {

  .search-bar__input-container {
    margin-top: 4%;
}
  .search-bar {
    margin-left: 1%;
    width: 90%;
}
  .search-bar__input {
    padding-left: 3rem;
  }

  .search-icon {
    font-size: 1rem;
    left: 11%;
  }

  .search-bar__select {
    width: 30%;
    padding: 0.5rem;
    margin-left: 3%;
  }
}
</style>

