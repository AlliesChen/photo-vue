<template>
  <main class="main">
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
  width: 100%;
}
</style>
