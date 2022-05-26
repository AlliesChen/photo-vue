<template>
  <footer class="sticky">
    <Page-Switch v-if="currentMode() === 'browse'" />
    <Selection-Agent v-if="currentMode() === 'selection'" />
  </footer>
</template>

<script>
import PageSwitch from "./PageSwitch.vue";
import SelectionAgent from "./SelectionAgent.vue";
export default {
  components: { PageSwitch, SelectionAgent },
  inject: ["currentMode"],
};
</script>

<style scoped>
footer {
  bottom: 0;
  height: 4rem;
  background-color: var(--white);
}
</style>
