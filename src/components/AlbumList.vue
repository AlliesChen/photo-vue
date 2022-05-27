<template>
  <section>
    <ul v-for="album in baseList()" :key="album.id" class="m-0 p-0">
      <li v-for="item in listFiles(album)" :key="item.name" class="relative">
        <File-Case
          :source="item.root"
          :fileName="item.name"
          :fileType="item.type"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import { baseURL } from "../store/files";
import FileCase from "./FileCase.vue";
export default {
  components: {
    FileCase,
  },
  inject: ["baseList"],
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
  },
};
</script>

<style></style>
