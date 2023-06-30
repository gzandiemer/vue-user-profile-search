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
import { defineComponent, ref, computed } from 'vue';
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

    const selectOption = (value: string) => {
      const optionText = options.value.find(
        (option) => option.value === value
      )?.text;
      console.log(`Option ${value} selected. Option text: ${optionText}`);
      store.commit('setGender', value);
      emit('update-gender', value);
      open.value = false;
    };

    const selectedOptionText = computed(() => {
      const option = options.value.find((opt) => opt.value === gender.value);
      return option ? option.text : '';
    });

    return {
      search,
      gender,
      open,
      options,
      selectOption,
      selectedOptionText,
      updateSearch,
      updateGender
    };
  },
  data() {
    return {
      isSmallScreen: window.innerWidth <= 600 // You can adjust the value as needed
    };
  },
  computed: {
    maleOptionText() {
      return this.isSmallScreen ? 'M' : 'Male';
    },
    femaleOptionText() {
      return this.isSmallScreen ? 'F' : 'Female';
    }
  },
  created() {
    window.addEventListener('resize', this.updateScreenWidth);
  },
  unmounted() {
    window.removeEventListener('resize', this.updateScreenWidth);
  },
  methods: {
    updateScreenWidth() {
      this.isSmallScreen = window.innerWidth <= 600;
    }
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
  color: #f18a19;
  pointer-events: none;
}

.search-bar__input {
  width: 100%;
  padding: 1.1rem;
  border: none;
  border-radius: 50px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  color: #000;
  font-size: 16px;
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  z-index: 10;
  border: 1px solid #ced4da;
}

.option {
  text-align: center;
  cursor: pointer;
  padding: 12px 16px;
  font-size: 16px;
  color: #212529;
  background-color: #fff;
}

.option:hover {
  background-color: #f0f0f0;
}

.search-bar__select:focus {
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.search-bar__select:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.search-bar__select:active {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

@media screen and (max-width: 600px) {
  .search-bar__input-container {
    margin: 1rem auto;
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
    padding-left: 4rem;
    margin: 0 auto;
    width: 90%;
  }

  .search-icon {
    font-size: 1rem;
    left: 11%;
  }

  .search-bar__select {
    width: 50%;
    margin: 0.5rem auto;
    justify-content: center;
  }
  .options {
    width: 50%;
  }
}
</style>
