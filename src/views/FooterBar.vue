<template>
  <footer class="footer">
    <Page-Switch v-if="currentMode === 'browse'" />
    <div v-if="currentMode === 'selection'" class="flex justify-space-around">
      <button disabled="true" class="flex">
        <feather type="external-link" />
      </button>
      <p class="text-xl m-0">已選取<span id="selectedCount">0</span>個項目</p>
      <button disabled="true" class="flex">
        <feather type="trash-2" />
      </button>
    </div>
  </footer>
</template>

<script>
import PageSwitch from "./PageSwitch.vue";
export default {
  components: { PageSwitch },
  computed: {
    currentMode() {
      return this.$store.getters.currentMode;
    },
  },
};
</script>

<style scoped>
.footer {
  position: sticky;
  bottom: 0;
  height: 4rem;
  background-color: white;
}
</style>
