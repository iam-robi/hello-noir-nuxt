import initialiseAztecBackend from "@noir-lang/aztec_backend";

self.addEventListener("message", (event) => {
  console.log("worker starting to generate proof assets!", event.data);
  (async () => {
    const proof = await generateProof();
    self.postMessage(proof);
  })();
});

async function generateProof() {
  //TODO: find error with vite for initialiseAztecBackend
  //await initialiseAztecBackend();
  return Math.random().toString(36);
}
