<script setup lang="ts">
import { Render, Texture, Particle, Physics, Gltf, Girl } from "./render";

import { ref, onMounted } from "vue";

const el = ref<HTMLCanvasElement>();

onMounted(() => {
  const render = new Render(el.value!);
  // Particle.renderSPS(render);
  // Particle.renderCloudSystem(render);
  // Texture.renderTexure(render);
  // Sphere.renderSphere(render);
  // Physics.renderPhysics(render);
  // Gltf.renderGltf(render)
  Girl.renderGirl(render)
  render.render();
});
</script>

<template>
  <canvas ref="el"></canvas>
</template>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
  overflow: hidden;
}
</style>
