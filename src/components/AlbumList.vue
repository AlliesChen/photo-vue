<template>
  <section class="flex flex-wrap">
    <article
      v-for="(album, index) in baseList()"
      :key="album.id"
      class="flex-col items-center"
    >
      <ul class="relative folder rounded-lg p-4">
        <li v-for="item in listFiles(album)" :key="item.name">
          <File-Case
            :source="item.root"
            :fileName="item.name"
            :fileType="item.type"
          />
        </li>
        <div
          v-show="currentMode() === 'selection'"
          @click="setFile(index)"
          class="mask absolute w-full h-full top-0 left-0"
        >
          <feather
            :type="album.isSelect ? 'check-circle' : 'circle'"
            class="absolute right-1 bottom-1 text-white"
          />
        </div>
      </ul>
      {{ album.name }}
    </article>
    <div
      v-if="currentScene() === 'creation'"
      class="absolute flex justify-center items-center mask w-full h-full"
    >
      <div class="modal rounded-lg">
        <p class="m-0">新增相簿名稱：</p>
        <input type="text" v-model="userInput" class="grid-col-span-2" />
        <button @click="createAlbum" class="rounded bg--cyan text-white">
          確認
        </button>
        <button @click="useScene('none')">取消</button>
      </div>
    </div>
  </section>
</template>

<script>
import { baseURL } from "../store/files";
import FileCase from "./FileCase.vue";
export default {
  data() {
    return {
      userInput: "",
    };
  },
  inject: ["baseList", "currentScene", "currentMode"],
  components: {
    FileCase,
  },
  methods: {
    listFiles(album) {
      if (this.$route.name !== "albums") return;
      return album.photoList.map((item) => {
        const itemExt = item.match(/\w+/g)[1];
        const isVideo = /mp4/.test(itemExt);
        const itemType = isVideo ? "video" : "image";
        return {
          root: `${baseURL}/${itemType.concat("-xs")}/${item}`,
          name: item,
          type: `${itemType}/${itemExt}`,
        };
      });
    },
    useScene(scene) {
      this.$store.commit("useScene", scene);
    },
    createAlbum() {
      this.$store.dispatch("createAlbum", { name: this.userInput });
      this.userInput = "";
      this.useScene("none");
    },
    setFile(index) {
      if (this.currentMode() === "selection") {
        this.$store.commit("setSelected", [this.$route.name, index]);
      }
    },
  },
  beforeDestroy() {
    this.useScene("none");
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
.mask {
  background-color: var(--black-tl);
}
.modal {
  display: grid;
  grid-template: 1fr 1fr 1fr / 1fr 1fr;
  gap: 1rem;
  padding: 2rem;
  background-color: var(--white);
}
.grid-col-span-2 {
  grid-column-end: span 2;
}
.bg--cyan {
  background-color: var(--cyan);
}
</style>
