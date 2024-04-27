<script>
import {cities} from "@/components/layout/components/cities.js";
import {useRoute} from "vue-router";
import eventBus from "@/eventBus.js";

export default {
  data() {
    return {
      name: 'Apples',
      message: 'I like apples',
      isMap: false
    }
  },
  setup() {
    const sorted = cities.sort((a, b) => a.name.localeCompare(b.name));
    const isMap = window.location.pathname === "/Map";
    const route = useRoute()

    return {sorted, isMap}
  },
  watch: {
    $route(to, from) {
      if (to.fullPath === "/Map") {
        document.getElementById('regionSelect').style.visibility = 'visible'
        document.getElementById('regionSelect').selectedIndex = 0
      } else {
        document.getElementById('regionSelect').style.visibility = 'hidden'
      }
    }
  },
  mounted() {
    document.getElementById('regionSelect').addEventListener('change', (e) => {
      eventBus.$emit('citySelected', e.target.value)
    })
  }
};
</script>

<template>
  <div style="height: 10vh; padding: 0 2rem; display:flex;justify-content: space-between; align-items: center; background-color: white;">
    <RouterLink to="/" style="height: 80%">
      <img src="/saylogo.png" style="height: 100%" alt="Sayl Logo">
    </RouterLink>
    <nav style="font-size: 1.3rem; font-family: Roboto">
      <RouterLink to="/" style="color: black !important; text-decoration: none; margin: 1rem">Home</RouterLink>
      <RouterLink to="/Map" style="color: black !important; text-decoration: none; margin: 1rem">Map</RouterLink>
    </nav>
    <select style="right: 2rem; height: 2rem; font-size: 1.2rem" id="regionSelect">
      <option disabled selected>Select a city</option>
      <option v-for="city in sorted" :key="city.id" :value="city.id">{{city.name}}</option>
    </select>
  </div>
</template>

<style scoped>


</style>