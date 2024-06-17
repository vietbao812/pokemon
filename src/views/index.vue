<template>
  <div class="pokemon pb-10">
    <div class="title__main flex items-center justify-between">
      <h1 class="text-[30px] font-bold">Pokemon Stats</h1>
      <div class="flex flex-col items-end gap-2">
        <span>Nguyễn Viết Bảo</span>
        <span><a href="mailto:baobinh8122001@gmail.com">baobinh8122001@gmail.com</a></span>
        <span><a href="tel:0935520004">0935520004</a></span>
      </div>
    </div>
    <div class="flex items-center gap-4 justify-between px-10 text-base">
      <div>
        <input 
          placeholder="Search..." 
          v-model="inputSearch"
          class="p-2 border outline-none border-[#c9c9c9] focus-visible:border-primary rounded w-[300px] py-2 block"
        />
      </div>
      <div class="flex items-center gap-4">
        <div>
          <span class="pr-2">Sort: </span>
          <select v-model="paramsSearch.sort" class="py-2 px-2 border border-[#c9c9c9] rounded p-2 outline-none">
            <option value="number">Number</option>
            <option value="-total">Total</option>
            <option value="-hp">HP</option>
            <option value="-attack">Attack</option>
            <option value="-defense">Defense</option>
            <option value="-sp_atk">SP Atk</option>
            <option value="-sp_def">SP Def</option>
            <option value="-speed">speed</option>
          </select>
        </div>
        <div>
          <span class="pr-2">Pokemon type: </span>
          <select v-model="selectType" class="py-2 px-2 border border-[#c9c9c9] rounded p-2 outline-none">
            <option value="All">All</option>
            <option 
              v-for="option in listTypeOptions" 
              :key="option.value" 
              :value="option.value"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="listPokemon && !isLoading" class="content__card">
      <PokemonItem 
        v-for="pokemon in listPokemon" 
        :key="pokemon.id" 
        :data="pokemon" 
        @click="showPokemon(pokemon)"
      />
    </div>
    <div v-if="!isLoading" class="pagination flex items-center justify-center gap-2 mt-6">
      <div 
        v-if="pagination.last_page > 1"
        v-for="pagi in pagination.last_page" :key="pagi" 
        class="w-10 h-10 rounded flex items-center justify-center bg-[#f1f1f1] cursor-pointer hover:bg-primary hover:text-[#fff]"
        :style="pagination.current_page === pagi ? 'background-color: var(--color-primary); color: #fff' : ''"
        @click="pagination.current_page = pagi"
      >
        {{ pagi }}
      </div>
    </div>
    <ModalDetailPokemon ref="modalDetailPokemonRef" />
    <div v-if="isLoading" class="bg-[#fff] fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, reactive } from "vue";
import { usePokemonStore } from "@/stores/pokemon";
import PokemonItem from "@/components/views/pokemon/card.vue";
import ModalDetailPokemon from "@/components/modal/PokemonDetail.vue";
import { useDebounce } from "@/utils/debounce";
import { listColorType } from "@/constants/type-pokemon";
import { type pokemon } from "@/types/index.ts";

type paginationType = {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
}

const pokemonStore = usePokemonStore();
const listPokemon: any = computed(() => pokemonStore.list);
const modalDetailPokemonRef = ref();

const listTypeOptions: any = computed(() => {
  return listColorType.map((type) => ({
    name: type.name,
    value: type.id
  }));
});

const showPokemon = (pokemon: pokemon) => {
  modalDetailPokemonRef.value.show(pokemon);
};

const isLoading = ref(false);
const inputSearch = ref('');
const selectType = ref('All');
const paramsSearch = reactive({
  sort: 'number'
});

const pagination: paginationType = reactive({
  total: 0,
  current_page: 1,
  last_page: 1,
  per_page: 50
});

const getListPokemon = async () => {
  try {
    isLoading.value = true;
    const params = {
      'page[number]': pagination.current_page,
      'page[size]': pagination.per_page,
      'filter[name]': inputSearch.value,
      'filter[type]': selectType.value === 'All' ? '' : selectType.value,
      ...paramsSearch
    };
    const res: any = await pokemonStore.getListPokemon(params);
    pagination.total = res.meta.total;
    pagination.current_page = res.meta.current_page;
    pagination.last_page = res.meta.last_page;
    pagination.per_page = res.meta.per_page;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

watch(() => [paramsSearch, pagination.current_page, selectType.value], () => {
  getListPokemon();
}, { deep: true, immediate: true});

watch(() => [inputSearch, selectType], useDebounce(() => {
  pagination.current_page = 1;
  getListPokemon();
}, 700), { deep: true });

</script>

<style lang="scss" scoped>
.pokemon {
  .content__card {
    padding: 16px;
    display: flex;
    gap: 30px 20px;
    justify-content: center;
    flex-wrap: wrap;
    & > div  {
      width: 150px;
    }
  }
  .title__main {
    background-color: var(--color-primary);
    margin-bottom: 20px;
    font-size: 16px;
    text-align: center;
    line-height: normal;
    padding: 15px 10px;
    color: #fff;
  }
}
</style> 
