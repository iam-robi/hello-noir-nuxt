//https://github.com/nuxt-modules/partytown/tree/main/playground

// random-id.worker.js
self.addEventListener("message", (event) => {
  console.log("worker starting to generate proof!");
  const proof = generateProof();
  self.postMessage(proof);
});

function generateProof() {
  //TODO: generate actual proof
  return Math.random().toString(36);
}
