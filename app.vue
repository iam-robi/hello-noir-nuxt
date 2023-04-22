<template>
  <div class="flex flex-col h-screen z-10">
    <div class="p-4 @lex gap-4">
      <button @click="onConnect" class="btn">
        Connect {{ wallet.wallet.status }}
      </button>

      <vd-board :connectors="connectors" dark>
        <!-- <template #loading>
          <div v-if="wallet.wallet.status === 'loading'">loading...</div>
        </template> -->
      </vd-board>

      <select class="select w-full max-w-xs" v-model="colorMode.preference">
        <option disabled selected>Theme</option>
        <option v-for="theme of themes" :key="theme">{{ theme }}</option>
      </select>
    </div>
    <div class="hero bg-base-200 py-10">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello Noir !</h1>
          <p class="py-6">Simple starter template for a Noir UI</p>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center">
      <div class="w-full max-w-md p-10 card rounded-box">
        <!-- Card content goes here -->
        <div class="flex flex-col space-y-4">
          <label for="input1" class="text-lg font-bold">Input X:</label>
          <input
            id="input1"
            type="text"
            class="input input-primary"
            placeholder="Enter input X"
          />

          <label for="input2" class="text-lg font-bold">Input Y:</label>
          <input
            id="input2"
            type="text"
            class="input input-primary"
            placeholder="Enter input Y"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProof } from "./store/proof/proof.index";
import { PhSignature, PhFileSearch } from "@phosphor-icons/vue";
import {
  MetaMaskConnector,
  WalletConnectConnector,
  CoinbaseWalletConnector,
  SafeConnector,
  useBoard,
  useEthers,
  useWallet,
} from "vue-dapp";

const wallet = useWallet();
const board = useBoard();
// board.open();
const onConnect = function () {
  console.log("connect");
  board.open();
};

const connectors = [
  new MetaMaskConnector({
    appUrl: "http://localhost:3000",
  }),
  new WalletConnectConnector({
    qrcode: true,
    rpc: {
      1: `https://eth.llamarpc.com`,
      5: `https://eth-goerli.g.alchemy.com/v2/mb4872MrLwfUdJfLcYfkXKhvsZo3PJsh`,
    },
  }),
  new CoinbaseWalletConnector({
    appName: "Vue Dapp",
    jsonRpcUrl: `https://eth-goerli.g.alchemy.com/v2/mb4872MrLwfUdJfLcYfkXKhvsZo3PJsh`,
  }),
  // new SafeConnector(),
];
const classificationStore = useProof();
// a computed ref

const colorMode = useColorMode();
const themes = [
  "system",
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];
</script>
