import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { type pokemon } from "@/types/index.ts";

export const usePokemonStore = defineStore('pokemon-store', {
  state: () => ({
    list: [] as pokemon[],
    listType: []
  }),
  actions: {
    async getListPokemon(params: any): Promise<void> {
      return new Promise(async (resolve, reject) => {
        try {
          const res: any = await axios.get('/pokemons', { params })
          this.list = res?.data?.data
          resolve(res.data)
          
        } catch (error) {
          reject(error)
        }
      })
    },
    async getTypePokemon(): Promise<void> {
      return new Promise(async (resolve, reject) => {
        try {
          const res: any = await axios.get('/types')
          this.listType = res?.data?.data
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
    }
    // getPokemonById(id: string) {
    //   return new Promise((resolve, reject) => {
    //     try {
    //       const res = axios.get(`/pokemons/${id}`)
    //       resolve(res)
    //     } catch (error) {
    //       reject(error)
    //     }
    //   })
    // },
  }
})