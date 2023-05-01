//https://github.com/nuxt-modules/partytown/tree/main/playground

// random-id.worker.js
self.addEventListener("message", (event) => {
  console.log("Web Worker!");
  const id = generateRandomID();
  self.postMessage(id);
});

function generateRandomID() {
  // You can customize this function to generate IDs as per your requirements
  return Math.random().toString(36).substr(2, 9);
}
