<template>
  <div v-if="isVisible" class="modal-detail">
    <div @click="hide" class="modal-detail_overplay"></div>
    <div class="modal-detail_box">
      <div>
        <IconClose @click="hide" class="close-btn" />
        <div
          :style="{
            backgroundImage: `linear-gradient(165deg, ${colorType1} 0%, rgba(255, 255, 255, 1) 50%, ${colorType2} 100%)`,
          }"
          class="modal-detail_thumbnail"
        >
          <img :src="`https://api.vandvietnam.com/api/pokemon-api/pokemons/${pokemon?.id}/sprite`" alt="" >
          <div class="absolute top-2 left-2">
            Number: #{{ formatNumber(pokemon.number) }}
          </div>
        </div>
        <div class="p-4 text-center">
          <h3 class="text-2xl mb-2">{{ pokemon.name }}</h3>
          <div class="text-lg mb-2">
            Type: 
            <span>
              {{ (listColorType.find((type) => type.id === pokemon.type_1)!).name }}
            </span>
            <span v-if="pokemon.type_2">
              - {{ (listColorType.find((type) => type.id === pokemon.type_2)!).name }}
            </span>
          </div>
          <div class="mb-3">Generation: {{ pokemon.generation }}</div>
          <div v-if="pokemon.legendary">Pokemon Legendary</div>
        </div>
        <div class="px-4 text-base">
          <div class="grid grid-cols-[60px_20px_1fr_30px] items-center gap-2 mb-3">
            <span>Total: </span>
            <span>{{ pokemon.total }}</span>
            <div>
              <ProgressBar :value="pokemon.total" :max="MAX_STATS.total" />
            </div>
            <span>{{ MAX_STATS.total }}</span>
          </div>
          <div class="grid grid-cols-[60px_20px_1fr_30px] items-center gap-2 mb-3">
            <span>HP: </span>
            <span>{{ pokemon.hp }}</span>
            <div>
              <ProgressBar :value="pokemon.hp" :max="MAX_STATS.hp" />
            </div>
            <span>{{ MAX_STATS.hp }}</span>
          </div>
          <div class="grid grid-cols-[60px_20px_1fr_30px] items-center gap-2 mb-3">
            <span>Attack: </span>
            <span>{{ pokemon.attack }}</span>
            <div>
              <ProgressBar :value="pokemon.attack" :max="MAX_STATS.attack" />
            </div>
            <span>{{ MAX_STATS.attack }}</span>
          </div>
          <div class="grid grid-cols-[60px_20px_1fr_30px] items-center gap-2 mb-3">
            <span>Defense: </span>
            <span>{{ pokemon.defense }}</span>
            <div>
              <ProgressBar :value="pokemon.attack" :max="MAX_STATS.defense" />
            </div>
            <span>{{ MAX_STATS.defense }}</span>
          </div>
          <div class="grid grid-cols-[60px_20px_1fr_30px] items-center gap-2 mb-3">
            <span>SP Atk: </span>
            <span>{{ pokemon.sp_atk }}</span>
            <div>
              <ProgressBar :value="pokemon.sp_atk" :max="MAX_STATS.sp_atk" />
            </div>
            <span>{{ MAX_STATS.sp_atk }}</span>
          </div>
          <div class="grid grid-cols-[60px_20px_1fr_30px] items-center gap-2 mb-3">
            <span>SP Def: </span>
            <span>{{ pokemon.sp_def }}</span>
            <div>
              <ProgressBar :value="pokemon.sp_def" :max="MAX_STATS.sp_def" />
            </div>
            <span>{{ MAX_STATS.sp_def }}</span>
          </div>
          <div class="grid grid-cols-[60px_20px_1fr_30px] items-center gap-2 mb-3">
            <span>Speed: </span>
            <span>{{ pokemon.speed }}</span>
            <div>
              <ProgressBar :value="pokemon.speed" :max="MAX_STATS.speed" />
            </div>
            <span>{{ MAX_STATS.speed }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { listColorType, MAX_STATS } from "@/constants/type-pokemon";
import { formatNumber } from "@/utils";
import IconClose from "@/components/icon/x-circle.vue";
import ProgressBar from "@/components/views/pokemon/progress-bar.vue";
import { type pokemon } from "@/types/index.ts";

const pokemon: any = ref({})
const isVisible = ref(false);

const hide = () => {
  isVisible.value = false;
};

const show = (data: pokemon) => {
  pokemon.value = data;
  colorType1.value = listColorType[data.type_1].color;
  colorType2.value = pokemon.value.type_2
    ? listColorType[pokemon.value.type_2].color
    : colorType1.value;
  isVisible.value = true;
};

defineExpose({
  hide,
  show,
});

const colorType1 = ref();
const colorType2 = ref();

</script>

<style lang="scss" scoped>
.modal-detail {
  position: fixed;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal-detail_overplay {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  &_box {
    width: 340px;
    background-color: #fff;
    border-radius: 8px;
    overflow-y: auto;
    z-index: 2;
    position: relative;
    padding-bottom: 30px;
    .modal-detail_thumbnail {
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 24px 24px 0px;
      img {
        width: 125px;
        height: auto;
        object-fit: contain;
        display: inline-block;
      }
    }
  }
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #000;
  font-size: 24px;
  transition: all 0.3s ease;
  &:hover {
    color: #f00;
  }
}
</style>