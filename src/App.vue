<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import LayoutsDefault from '@/layouts/default.vue';

const route = useRoute();

const layout = computed(() => route.meta.layout || LayoutsDefault);

</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
