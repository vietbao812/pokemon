<template>
  <div
    class="box__card"
    :style="{
      backgroundImage: `linear-gradient(165deg, ${colorType1} 0%, rgba(255, 255, 255, 1) 50%, ${colorType2} 100%)`,
    }"
  >
    <span>#{{ formatNumber(data.number) }}</span>
    <img class="img__card" :src="`https://api.vandvietnam.com/api/pokemon-api/pokemons/${data.id}/sprite`" :alt="data.name" />
    <h2 class="text-center">{{ data.name }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { listColorType } from "@/constants/type-pokemon";
import { formatNumber } from "@/utils";

interface Props {
  data: any;
}
const prop = defineProps<Props>();

const colorType1 = ref();
const colorType2 = ref();

onMounted(() => {
  colorType1.value = listColorType[prop.data.type_1].color;
  colorType2.value = prop.data.type_2
    ? listColorType[prop.data.type_2].color
    : colorType1.value;
});
</script>

<style lang="scss">
.box__card {
  transition: all .3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 170px;
  cursor: pointer;
  &:hover{
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  .img__card {
    width: 70px;
    height: 70px;
    object-fit: contain;
    margin: 0 auto;
    transform: scale(1);
    transition: transform 0.2s;
  }
  &:hover .img__card {
    transform: scale(1.2);
  }
  & h2{
    color: #000;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
