<template>
  <div class="modal" v-if="user">
    <div class="modal-header">
        <h2>User Profile</h2>
        <span class="close-button" @click="closeModal">x</span>
      </div>
      
    <div class="modal-content">
      <div class="modal-user-info">
        <img class="user-picture" :src="user.picture.large" alt="User picture" />
        <div class="user-name-and-id">
          <p>{{ formattedName }}</p>
          <p>User ID: {{ user.login.uuid }}</p>
        </div>
      </div>
      <div class="user-location">
        <p>Address:
      {{ user.location.street.name }}, {{ user.location.postcode }} {{ user.location.city }}</p>
        <p>{{ user.location.state }} - {{ user.location.country }} </p>
      </div>
      <div class="user-contact">
        <p>Email: {{ user.email }}</p>
        <p>Phone: {{ user.phone }}</p>
      </div> 
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '../types';

export default defineComponent({
  props: {
    user: {
      type: Object as () => User,
      required: false,
      default: null
    }
  },
  computed: {
    formattedName() {
      const first =
        this.user.name.first.charAt(0).toUpperCase() +
        this.user.name.first.slice(1);
      const last =
        this.user.name.last.charAt(0).toUpperCase() +
        this.user.name.last.slice(1);
      return `${first} ${last}`;
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  }
});
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  right: 0;
  top: 0;
  width: 60%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
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
  border: 1px solid #888;
  width: 100%;
  height: calc(100% - 70px);
  overflow: auto;
  top: 70px;
}



.close-button {
  position: relative; 
  right: 10%;
  z-index: 15;
  color: #aaa;
  font-size: 28px;
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
  margin-top: 10%;
  margin-left: 20%;
}

.user-picture {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.user-name-and-id {
  margin-left: 20px;
}
</style>
