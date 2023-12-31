<template>
  <div class="search-bar">
    <div class="search-bar__input-container">
      <div class="search-icon">
        <font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
      </div>
      <input
        class="search-bar__input"
        v-model="search"
        type="text"
        placeholder="Search by name..."
        @input="updateSearch"
      />
    </div>
    <div class="search-bar__select" @click="open = !open">
      <div class="selected-option">
        {{ selectedOptionText }}
        <span class="arrow-down" v-show="!open">&#9662;</span>
        <span class="arrow-up" v-show="open">&#9652;</span>
      </div>
      <div class="options" v-show="open">
        <div
          class="option"
          v-for="option in options"
          :key="option.value"
          @click.stop="selectOption(option.value)"
        >
          {{ option.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  emits: ['update-search', 'update-gender'],
  setup(_, { emit }) {
    const store = useStore();
    const open = ref<boolean>(false);
    const options = ref<Array<{ text: string; value: string }>>([
      { text: 'All', value: '' },
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ]);

    const search = computed({
      get: () => store.state.searchQuery,
      set: (value) => {
        store.commit('setSearchQuery', value);
        emit('update-search', value);
      }
    });

    const gender = computed({
      get: () => store.state.gender,
      set: (value) => {
        store.commit('setGender', value);
        emit('update-gender', value);
      }
    });

    const updateSearch = () => {
      emit('update-search', search.value);
    };

    const updateGender = () => {
      emit('update-gender', gender.value);
    };

    // Handle option selection in the dropdown
    const selectOption = (value: string) => {
      store.commit('setGender', value);
      emit('update-gender', value);
      open.value = false;
    };

    const selectedOptionText = computed(() => {
      const option = options.value.find((opt) => opt.value === gender.value);
      return option ? option.text : '';
    });

    // Handle click outside dropdown to close it
    const closeDropdown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-bar__select')) {
        open.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener('click', closeDropdown);
    });

    onUnmounted(() => {
      window.removeEventListener('click', closeDropdown);
    });

    return {
      search,
      gender,
      open,
      options,
      selectOption,
      selectedOptionText,
      updateSearch,
      updateGender,
      closeDropdown
    };
  },
  data() {
    return {
      isSmallScreen: window.innerWidth <= 600
    };
  }
});
</script>

<style scoped>
.search-bar__input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 60%;
  height: 50px;
  box-sizing: border-box;
  margin-top: 8%;
  margin-left: 5%;
}
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.search-icon {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.4rem;
  color: var(--primary-color);
  pointer-events: none;
}
.search-bar__input {
  width: 100%;
  padding: 1.1rem;
  border: none;
  border-radius: 50px;
  box-shadow: var(--shadow-light);
  padding-left: 4rem;
  background-size: 3rem;
}
.search-bar__select {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8%;
  margin-right: 8%;
  width: 25%;
  height: 50px;
  box-sizing: border-box;
  border: none;
  border-radius: 50px;
  box-shadow: var(--shadow-light);
  background-color: #fff;
  color: var(--secondary-color);
  font-size: 1rem;
  transition: 0.3s;
  cursor: pointer;
}
.selected-option {
  text-align: center;
  padding-right: 1.5rem; /* space for the arrow */
  position: relative;
}

.arrow-down,
.arrow-up {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}
.options {
  position: absolute;
  width: 12%;
  background-color: #f8f9fa;
  box-shadow: var(--shadow-light);
  border-radius: 5px;
  z-index: 10;
  border: 1px solid #ced4da;
}
.option {
  text-align: center;
  cursor: pointer;
  padding: 0.8rem var(--padding-md);
  font-size: 1rem;
  color: var(--secondary-color);
  background-color: #fff;
}
.option:hover {
  background-color: var(--highlight-color);
}
.search-bar__select:focus {
  outline: none;
  box-shadow: var(--shadow-dark);
}
.search-bar__select:hover {
  box-shadow: var(--shadow-dark);
}
.search-bar__select:active {
  box-shadow: var(--shadow-dark);
}

@media screen and (max-width: 600px) {
  .search-bar__input-container {
    margin: var(--margin-md) auto;
    width: 100%;
    font-size: 1rem;
  }
  .search-bar {
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .search-bar__input {
    margin: 0 auto;
    width: 90%;
    padding-left: 5rem;
  }
  .search-icon {
    font-size: 1rem;
    left: 11%;
  }
  .search-bar__select {
    width: 50%;
    margin: var(--margin-sm) auto;
    justify-content: center;
  }
  .options {
    width: 50%;
  }
}
</style>
