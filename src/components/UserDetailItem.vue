Copy code
<template>
  <div class="user-detail">
    <font-awesome-icon :icon="icon" :style="{color: color}"/>
    <div class="user-detail-info">
      <p v-for="(detail, index) in details" :key="index">{{ detail }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default defineComponent({
  name: 'UserDetailItem',
  props: {
    icon: {
      type: Array as () => IconProp,
      required: true,
    },
    details: {
      type: Array as () => string[],
      required: true,
    },
    color: {
      type: String,
      default: '#f18a19',
    },
  },
});
</script>

<style scoped>
.user-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}

.user-detail-info {
   margin-top: 1em;
}

</style>
