<template>
  <div id="app">
    <Header-Bar />
    <File-Pages />
    <Footer-Bar />
  </div>
</template>

<script>
import HeaderBar from "./views/HeaderBar.vue";
import FilePages from "./views/FilePages.vue";
import FooterBar from "./views/FooterBar.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
    FilePages,
    FooterBar,
  },
  provide() {
    return {
      currentMode: () => this.$store.getters.currentMode,
      currentScene: () => this.$store.getters.currentScene,
      baseList: () => {
        let stateName;
        if (this.$route.name === "file") {
          stateName = this.$route.params.type.concat("s");
        } else {
          stateName = this.$route.name;
        }
        return this.$store.getters.checkState(stateName);
      },
    };
  },
  created() {
    this.$store.dispatch("getFileNames", ["images"]);
    this.$store.dispatch("getFileNames", ["videos"]);
  },
};
</script>

<style lang="scss">
@use "styles/main";
@include main.setJustify(center, space-around, flex-start, flex-end);
@include main.setItems(center);
@include main.setRounded();
@include main.setPosition(absolute, relative, sticky, fixed);
@include main.setTop(0);
@include main.setRight(1, 4, 16);
@include main.setBottom(1);
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;700&display=swap");
@import url("styles/basics.css");

:root {
  --corner-position: 0.4rem;
  --font-noto-sans: "Noto Sans TC", sans-serif;
  --white: white;
  --black: black;
  --pink-light: rgb(252, 231, 243);
  --pink: rgb(236, 72, 153);
  --pink-dark: rgb(131, 24, 67);
  --cyan-light: rgb(207, 250, 254);
  --cyan: rgb(6, 182, 212);
  --cyan-dark: rgb(22, 78, 99);
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
  cursor: pointer;
}

.text-white {
  color: var(--white);
}

.text-black {
  color: var(--black);
}

.text-pink {
  color: var(--pink);
}

.text-cyan {
  color: var(--cyan);
}
</style>
