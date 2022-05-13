<template>
  <main class="main flex w-full">
    <ol class="m-0 p-0 flex">
      <li v-for="list in lists" :key="list.name">
        <image :src="list.image" />
      </li>
    </ol>
  </main>
</template>

<script>
export default {
  data() {
    return {
      lists: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  // header and footer are both 8 rem height
  min-height: calc(100vh - 8rem);
  align-content: flex-start;
  flex-wrap: wrap;
}

ol {
  list-style-type: none;
  & > li {
    position: relative;
    width: calc(100vw / 3);
    height: calc(100vw / 3);
    color: black;
  }
}
</style>
