<template>
  <div class="modal" v-if="user">
    <div class="modal-header">
      <h2>User Profile</h2>
      <span class="close-button" @click="closeModal">x</span>
    </div>

    <div class="modal-content">
      <div class="modal-user-info">
        <img
          class="user-picture"
          :src="user?.picture.large"
          alt="User picture"
        />
        <div class="user-name-and-id">
          <p class="user-name">{{ formattedName }}</p>
          <p class="user-id">ID: {{ user?.login.uuid }}</p>
        </div>
      </div>
      <div class="user-details-container">
        <user-detail-item
          v-if="user"
          :icon="['fas', 'location-dot']"
          :details="[
            user.location.street.name +
              ' ' +
              user.location.street.number +
              ' ' +
              user.location.postcode +
              ' ' +
              user.location.city,
            user.location.state + ' ' + user.location.country
          ]"
        />
        <user-detail-item
          v-if="user"
          :icon="['fas', 'envelope']"
          :details="[user.email]"
        />
        <user-detail-item
          v-if="user"
          :icon="['fas', 'phone']"
          :details="[user.phone]"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import { User } from '@/types';

import UserDetailItem from '@/components/UserDetailItem.vue';

export default defineComponent({
  name: 'UserDetailModal',
  components: {
    UserDetailItem
  },
  props: {
    user: {
      type: Object as PropType<User | null>,
      required: false,
      default: null
    }
  },
  setup(props, { emit }) {
    const formattedName = computed(() => {
      if (!props.user) return '';
      const first =
        props.user.name.first.charAt(0).toUpperCase() +
        props.user.name.first.slice(1);
      const last =
        props.user.name.last.charAt(0).toUpperCase() +
        props.user.name.last.slice(1);
      return `${first} ${last}`;
    });

    const closeModal = () => {
      emit('close');
    };

    return { formattedName, closeModal };
  }
});
</script>

<style scoped>
.modal {
  --primary-color: #f18a19;
  --secondary-color: #f0f0f0;
  --modal-padding: 20px;

  position: fixed;
  z-index: 10;
  right: 4px;
  top: 0;
  height: 100vh;
  width: 56%;
  border: 1px solid #d0d0d0; 
  /* border-left: 1px solid var(--secondary-color); */
  margin: auto;
  background: linear-gradient(to right, #f0f0f0, #ffffff);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: transform 0.3s ease-out;
}

.modal-enter-active {
  /* Slide in from the right */
  transform: translateX(100%);
}

.modal-leave-active {
  /* Slide out to the right */
  transform: translateX(-100%);
}

.modal-header {
  position: relative;
  z-index: 16;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fefefe;
  padding: var(--modal-padding);
  /* border-bottom: 1px solid var(--secondary-color); */
  width: 100%;
}

h2 {
  color: #424242;
}

.close-button {
  position: relative;
  right: 8%;
  z-index: 15;
  color: var(--primary-color);
  font-size: 2em;
  font-weight: bold;
  cursor: pointer;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-content {
  position: absolute;
  z-index: 15;
  background-color: #fefefe;
  padding: var(--modal-padding);
  width: 100%;
  height: calc(100vh - 7rem);
  top: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.modal-user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.user-picture {
  border-radius: 50%;
  border: 1px solid var(--primary-color);
  width: 20rem;
  height: 20rem;
  object-fit: cover;
  margin-right: 2rem;
}

.user-name-and-id {
  text-align: center;
}

.user-name {
  font-size: 2rem;
  font-weight: bold;
}
.user-details-container {
  width: 100%;
  display: flex;
  justify-content: center;
  /* border-top: 1px solid var(--secondary-color); */
  padding: 2rem var(--modal-padding);
  margin: 0 6rem 0 4rem;
}

@media screen and (max-width: 1280px) {
  .modal {
    width: 100%;
    font-size: 1rem;
    margin: 0 auto;
  }

  .modal-header {
    padding: 0.5rem; 
  }

  .close-button {
    font-size: 1.5em;
    margin-bottom: 0.5rem;
  }

  .modal-content {
    padding: 0.1rem;
    height: calc(100vh - 3rem);
    top: 3rem;
    border: none;
  }

  .user-picture {
    width: 12rem;
    height: 12rem;
    margin: 2rem 0 0 0;
  }
  .user-id {
    font-size: 1rem;
    margin-left: 0.5rem;
  }

  .user-name {
    font-size: 1.4rem;
    margin-top: 2rem;
  }

  .user-details-container {
    border: none;
    flex-direction: column;
    width: 60%;
    margin: 0 3rem 0 0.5rem;
    padding: 0.1rem;
  }

}

@media screen and (max-width: 600px) {
  .modal {
    font-size: 0.6rem;
  }

  .close-button {
    font-size: 1.5em;
  }

  .user-picture {
    width: 5rem;
    height: 5rem;
  }
  .user-id {
    font-size: 0.4rem;
  }

  .user-name {
    font-size: 0.6rem;
  }

  .user-details-container {
    border: none;
    flex-direction: column;
    width: 70%;
    margin: 0 3rem 0 0.5rem;
    padding: 0.1rem;
  }

}
</style>
