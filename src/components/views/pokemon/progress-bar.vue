<template>
  <div class="bg-[#f1f1f1] h-[10px] rounded-full relative">
    <div :style="{ width: `${value / max * 100}%` }" class="bg-[#19bd61] rounded-full absolute h-full left-0 top-0"></div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  value: number;
  max: number;
}>();
</script>