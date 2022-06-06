<template>
  <section class="flex flex-wrap">
    <article
      v-for="(album, index) in baseList()"
      :key="album.name"
      class="flex-col items-center"
    >
      <Album-List
        :photoList="album.photoList"
        :albumIndex="index"
        :isSelect="album.isSelect"
      />
      {{ album.name }}
    </article>
    <Creation-Scene
      v-if="currentScene() === 'creation'"
      class="absolute bg--black-tl"
    />
  </section>
</template>

<script>
import CreationScene from "../../components/CreationScene.vue";
import AlbumList from "../../components/AlbumList.vue";
export default {
  components: {
    CreationScene,
    AlbumList,
  },
  inject: ["baseList", "currentScene"],
};
</script>

<style scoped>
article {
  width: calc(100% / 2);
}
.bg--black-tl {
  background-color: var(--black-tl);
}
</style>
