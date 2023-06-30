Copy code
<template>
  <div class="user-detail-item">
    <font-awesome-icon :icon="icon" :size="size" :style="{ color: color }" />
    <div class="user-detail-info">
      <p v-for="(detail, index) in details" :key="index">{{ detail }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default defineComponent({
  name: 'UserDetailItem',
  props: {
    icon: {
      type: Array as PropType<IconProp[]>,
      required: true,
    },
    details: {
      type: Array as PropType<string[]>,
      required: true,
    },
    size: {
      type: String,
      default: 'lg',
    },
    color: {
      type: String,
      default: '#f18a19',
    },
  },
});

</script>

<style scoped>
.user-detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1rem;
  background-color: #424242; 
  border-left: 5px solid #f18a19;
  color: white;
  border-radius: 10px;
  padding: 10px;
}

.user-detail-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.user-detail-info p:first-child {
  margin-top: 2em;
  margin-bottom: 0;
}

</style>
