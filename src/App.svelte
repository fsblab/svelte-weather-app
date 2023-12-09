<script lang="ts">
  import IncDecButtons from "./lib/IncDecButtons.svelte";
  import WeatherBox from "./lib/WeatherBox.svelte";
  import { boxes } from "./store/store";
</script>



<main>
  <p style="color: white; margin: 5px"> Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a> </p>
  <IncDecButtons/>

  {#each $boxes as box (box.id)}
    <WeatherBox/>
  {/each}
</main>