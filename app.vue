<template>
  <div class="flex flex-col h-screen z-10">
    <Navbar></Navbar>
    <LayoutHeroBanner></LayoutHeroBanner>
    <div class="flex justify-center items-center">
      <div class="w-full max-w-md p-10 card rounded-box">
        <!-- Card content goes here -->
        <div class="flex flex-col space-y-4">
          <label for="input1" class="text-lg font-bold">Input X: </label>
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
          <button @click="executeProcedure" class="btn">Execute</button>
          <div>Proof (random string for now) {{ proof }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/layout/Navbar.vue";
import LayoutHeroBanner from "./components/layout/HeroBanner.vue";
import initNoirWasm, { compile } from "@noir-lang/noir_wasm";
import initialiseAztecBackend from "@noir-lang/aztec_backend";

import { initialiseResolver } from "@noir-lang/noir-source-resolver";

let worker: Worker | null = null;
const proof = ref(null);

const initializeProofWorker = () => {
  worker = new Worker(new URL("/assets/workers/prover.ts", import.meta.url), {
    type: "module",
  });

  worker.addEventListener("message", (event) => {
    proof.value = event.data;
  });

  worker.postMessage("generate");
};

onBeforeUnmount(() => {
  if (worker) {
    worker.terminate();
  }
});
const fetchData = async () => {
  // Use the randomID.value in your application logic
  console.log("fetchData", proof.value);
};

// ...
const { data, error } = useAsyncData("fetch-data", fetchData, {
  lazy: true,
  watch: [proof],
  immediate: false,
});
// ...

const executeProcedure = async function () {
  await initNoirWasm();
  let files;
  await $fetch("/api/listdirectory", {
    method: "POST",
  }).then((res) => {
    files = res;
  });
  console.log("files", files);

  let compiled_noir;
  const code = await $fetch("/api/readcircuitfile", {
    method: "POST",
    body: {
      filename: "main.nr",
    },
  });

  initialiseResolver((id: any) => {
    return code;
  });

  let circuit, abi;
  try {
    const compiled_noir = compile({});
    console.log("compiled_noir", compiled_noir);
    circuit = compiled_noir.circuit;
    abi = compiled_noir.abi;
    //return compiled_noir;
  } catch (e) {
    console.log("Error while compiling:", e);
  }

  console.log("circuit", circuit);

  //TODO: see why it's failing
  //await initialiseAztecBackend();

  initializeProofWorker();
};
</script>
