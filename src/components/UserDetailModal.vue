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
  z-index: 1;
  right: 0;
  top: 0;
  height: 100vh;
  width: 60%;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.modal-header {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fefefe;
  padding: 20px;
  border-bottom: 1px solid #888;
  width: 100%;
}

.modal-content {
  position: absolute;
  background-color: #fefefe;
  padding: 20px;
  width: 100%;
  height: calc(100vh - 70px);
  overflow: auto;
  top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.close-button {
  position: relative;
  right: 8%;
  z-index: 15;
  color: #f18a19;
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

.modal-user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.user-picture {
  border-radius: 50%;
  border: 1px solid #f18a19;
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-right: 2rem;
}

.user-name-and-id {
  text-align: center;
}

.user-name {
  font-size: 2em;
  font-weight: bold;
}

.user-details-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #888;
  padding: 2rem 20px;
}
.user-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
}

.user-location,
.user-contact {
  width: 45%;
  position: relative;
}

.icon {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1.4rem;
  color: #f18a19;
  margin-bottom: 1rem;
}

@media screen and (max-width: 1280px) {
  .modal {
    width: 100%;
  }

  .user-name {
    font-size: 1em;
    margin-top: 2rem;
  }

  .user-id {
    font-size: 1rem;
    margin-left: 0.5rem;
  }

  .user-picture {
    width: 120px;
    height: 120px;
    margin: 2rem 0 0 0;
  }

  .modal-content {
    padding: 10px;
  }

  .user-details-container {
    flex-direction: column;
  }

  .user-detail {
    width: 100%;
    margin-bottom: 1rem;
  }

  .close-button {
    font-size: 1.5em;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
  }
}
</style>
