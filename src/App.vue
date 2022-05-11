<template>
  <div id="app">
    <FunctionBar />
  </div>
</template>

<script>
import FunctionBar from "./components/FunctionBar.vue";

export default {
  name: "App",
  components: {
    FunctionBar,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;700&display=swap");
@import url("./styles/basics.css");

:root {
  --corner-position: 0.4rem;
  --font-noto-sans: "Noto Sans TC", sans-serif;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-noto-sans);
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

button {
  background: none;
  border: none;
}

button[data-active="false"],
input[data-active="false"] {
  width: 0;
  height: 0;
  visibility: hidden;
}
</style>
