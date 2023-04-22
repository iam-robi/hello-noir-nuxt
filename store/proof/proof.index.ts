// following this example https://github.com/productdevbook/oku-nuxt3-template/tree/master/src
import { defineStore } from "pinia";
import { ProofState } from "~/store/proof/proof.types";
export const useProof = defineStore("proof", {
  state: (): ProofState => ({
    proof: null,
  }),

  actions: {},
  getters: {},
});
