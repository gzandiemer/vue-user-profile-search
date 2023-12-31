<template>
  <div @click="selectUser" class="user-card">
    <img
      class="user-picture"
      :src="user.picture.thumbnail"
      @error="imageError"
      alt="User picture"
    />
    <div class="user-info">
      <h2>{{ formattedName }}</h2>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { User } from '@/types';

export default defineComponent({
  name: 'UserSummaryCard',
  props: {
    user: {
      type: Object as () => User,
      required: true
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
    selectUser() {
      // Emit custom event with user as payload
      this.$emit('user-selected', this.user);
    },
    imageError(event: Event) {
      // Typecast the event target to an HTMLImageElement
      const img = event.target as HTMLImageElement;
      img.src = 'https://via.placeholder.com/150';
    }
  }
});
</script>

<style scoped>
.user-card {
  width: 90%;
  max-width: 800px;
  margin: var(--margin-xl) auto var(--margin-sm);
  cursor: pointer;
  background: var(--background-gradient);
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  padding: var(--padding-lg);
  box-shadow: var(--shadow-light);
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}
.user-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}
.user-picture {
  border-radius: 50%;
  border: 1px solid var(--primary-color);
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-left: 5%;
}
.user-info {
  flex: 1;
}

.user-info h2 {
  color: var(--secondary-color);
  margin-bottom: var(--margin-xs);
  font-weight: 600;
}
.user-info p {
  color: var(--deemphasized-text-color);
}

@media screen and (max-width: 768px) {
  .user-card {
    font-size: 0.8rem;
  }
  .user-picture {
    width: 60px;
    height: 60px;
  }
}
</style>
