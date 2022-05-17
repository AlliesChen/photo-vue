<template>
  <main class="main flex w-full">
    <router-view />
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  /* header and footer are both 8 rem height */
  min-height: calc(100vh - 8rem);
  align-content: flex-start;
  flex-wrap: wrap;
}
</style>
