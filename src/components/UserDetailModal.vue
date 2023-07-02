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
  position: fixed;
  z-index: 10;
  right: 4px;
  top: 0;
  height: 100vh;
  width: 56%;
  margin: auto;
  background: var(--background-gradient); 
  box-shadow: var(--shadow-light);
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
  padding: var(--padding-lg); 
  width: 100%;
}

h2 {
  color: var(--secondary-color);
}

.close-button {
  position: relative;
  right: 8%;
  z-index: 15;
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
}

.close-button:hover,
.close-button:focus {
  color: var(--secondary-color);
  text-decoration: none;
  cursor: pointer;
}

.modal-content {
  position: absolute;
  z-index: 15;
  padding: var(--padding-lg);
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
  margin-bottom: var(--margin-xl);
  flex-wrap: wrap;
}

.user-picture {
  border-radius: 50%;
  border: 1px solid var(--primary-color);
  width: 20rem;
  height: 20rem;
  object-fit: cover;
  margin-right: var(--margin-xl);
}

.user-name-and-id {
  text-align: center;
}

.user-name {
  color: var(--secondary-color);
  font-size: 2rem;
  font-weight: 600;
}

.user-id {
  color: var(--deemphasized-text-color);
  }
.user-details-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem var(--padding-lg);
  margin: 0 6rem 0 4rem;
}

@media screen and (max-width: 1280px) {
  .modal {
    width: 100%;
    font-size: 1rem;
    margin: 0 auto;
  }

  .modal-header {  
     padding: var(--padding-sm);   
  }

  .close-button {
    font-size: 1.5em;
    margin-bottom: var(--margin-sm);
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
    margin: var(--margin-xl) auto 0 0 0;
  }
  .user-id {
    font-size: 1rem;
    margin-left: var(--margin-sm);
  }

  .user-name {
    font-size: 1.4rem;
    margin-top: var(--margin-xl);
  }

  .user-details-container {
    border: none;
    flex-direction: column;
    width: 60%;
    margin: 0 3rem 0 var(--margin-sm);;
    padding: 0.1rem;
  }

}

@media screen and (max-width: 600px) {
  .modal {
    font-size: 0.6rem;
  }

  .user-picture {
    width: 9rem;
    height: 9rem;
  }
  .user-id {
    font-size: 0.8rem;
  }

  .user-name {
    font-size: 1rem;
  }

  .user-details-container {
    border: none;
    flex-direction: column;
    width: 70%;
    margin: 0 3rem 0 var(--margin-sm);
  }

}

/* Adjustment for google nest hub screens */
@media screen and (min-width: 1024px) and (max-width: 1024px) and (min-height: 600px) and (max-height: 600px) {

  .modal-header {
    font-size: 0.8rem;
  }
  .modal-content {
  z-index: 20;
}

.user-picture {
    width: 6rem;
    height: 6rem;
   
}

.user-details-container {
    font-size: 0.8rem;
  }
}
</style>
