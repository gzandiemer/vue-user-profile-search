<template>
  <div class="user-detail-item">
    <font-awesome-icon
      :icon="icon"
      :size="size"
      :style="{ color: computedColor }"
    />
    <div class="user-detail-info">
      <p v-for="(detail, index) in details" :key="index">{{ detail }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default defineComponent({
  name: 'UserDetailItem',
  props: {
    icon: {
      type: Array as PropType<IconProp[]>,
      required: true
    },
    details: {
      type: Array as PropType<string[]>,
      required: true
    },
    size: {
      type: String,
      default: 'lg'
    },
    color: {
      type: String,
      default: '#f18a19'
    }
  },
  setup(props) {
    const computedColor = computed(() => {
      // Get the root computed styles
      const styles = window.getComputedStyle(document.documentElement);
      // Get the color variable or fallback to the prop value
      return styles.getPropertyValue('--primary-color') || props.color;
    });

    return {
      computedColor
    };
  }
});
</script>

<style scoped>
.user-detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: var(--margin-md);
  background-color: var(--secondary-color);
  border-left: 5px solid var(--primary-color);
  color: #fff;
  border-radius: 10px;
  padding: var(--padding-sm);
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
  margin-top: var(--margin-xl);
  margin-bottom: 0;
}
</style>
