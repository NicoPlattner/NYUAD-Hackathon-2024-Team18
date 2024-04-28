<script>
import {cities} from "@/components/layout/components/cities.js";
import {useRoute} from "vue-router";
import eventBus from "@/eventBus.js";

export default {
  data() {
    return {
      name: 'Apples',
      message: 'I like apples',
      isMap: false,
      dates: [
        '29.04.2024',
        '30.04.2024',
        '01.05.2024',
        '02.05.2024',
        '03.05.2024',
        '04.05.2024',
        '05.05.2024',
        '06.05.2024',
        '07.05.2024',
        '08.05.2024',
        '09.05.2024',
        '10.05.2024',
        '11.05.2024',
        '12.05.2024',
      ]
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
        document.getElementById('dateSelect').style.visibility = 'visible'
        document.getElementById('dateSelect').selectedIndex = 0
      } else {
        document.getElementById('regionSelect').style.visibility = 'hidden'
        document.getElementById('dateSelect').style.visibility = 'hidden'
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
  <div
      style="height: 10vh; padding: 0 1rem; display:flex;justify-content: space-between; align-items: center; background-color: white;">
    <RouterLink to="/" style="height: 80%">
      <img src="/saylogo.png" style="height: 100%; width: auto" alt="Sayl Logo">
    </RouterLink>
    <nav style="font-size: 1.3rem; font-family: Roboto">
      <RouterLink to="/" style="color: black !important; text-decoration: none; margin: 1rem">Home</RouterLink>
      <RouterLink to="/Map" style="color: black !important; text-decoration: none; margin: 1rem">Map</RouterLink>
    </nav>
    <div>
        <input type="date" style="right: 2rem; height: 2rem; font-size: 1.2rem; margin: 1rem" id="dateSelect">
      </input>
      <select style="right: 2rem; height: 2rem; font-size: 1.2rem; margin: 1rem" id="regionSelect">
        <option disabled selected>Select a city</option>
        <option v-for="city in sorted" :key="city.id" :value="city.id">{{ city.name }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 320px) {
  #dateSelect {
    visibility: hidden;
  }
}

@media screen and (min-width: 768px) {
  #dateSelect {
    visibility: visible;
  }
}


</style>