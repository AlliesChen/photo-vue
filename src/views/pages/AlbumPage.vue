<template>
  <section class="flex flex-wrap">
    <article
      v-for="(album, index) in baseList()"
      :key="album.name"
      class="flex-col items-center"
    >
      {{ album.name }}
    </article>
    <Creation-Scene
      v-if="currentScene() === 'creation'"
      class="absolute bg--black-tl"
    />
  </section>
</template>

<script>
import { baseURL } from "../../store/files";
import FileCase from "../../components/FileCase.vue";
import CreationScene from "../../components/CreationScene.vue";
export default {
  components: {
    FileCase,
    CreationScene,
  },
  inject: ["baseList", "currentScene", "currentMode"],
  methods: {
    listFiles(album) {
      if (this.$route.name !== "albums") return;
      return album.photoList.map((item) => {
        const itemExt = item.match(/\w+/g)[1];
        const isVideo = /mp4/.test(itemExt);
        const itemType = isVideo ? "video" : "image";
        return {
          root: `${baseURL}/${itemType.concat("-xs")}/${item}`,
          id: item,
          type: `${itemType}/${itemExt}`,
        };
      });
    },
    setFile(index) {
      if (this.currentMode() === "selection") {
        this.$store.commit("setSelected", [this.$route.name, index]);
      }
    },
  },
};
</script>

<style scoped>
article {
  width: calc(100% / 2);
}
li {
  list-style-type: none;
}
.folder {
  width: calc(100vw / 2 - 4rem);
  height: calc(100vw / 2 - 4rem);
  margin-bottom: 0;
  margin-top: 1rem;
  margin-inline: 1rem;
  background-color: var(--amber);
}
.bg--black-tl {
  background-color: var(--black-tl);
}
.bg--cyan-tl {
  background-color: rgba(22, 78, 99, 0.7);
}
</style>
