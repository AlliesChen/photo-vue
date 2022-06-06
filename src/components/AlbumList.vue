<template>
  <ul
    class="relative grid__content--center folder rounded-lg p-4"
    :style="gridTemplate"
  >
    <li v-for="item in thumbnails" :key="item.id">
      <File-Case
        :source="item.type === 'image' ? item.small : item.origin"
        :fileName="item.id"
        :fileType="item.type"
      />
    </li>
    <div
      v-show="currentMode() === 'selection'"
      @click="setFile(albumIndex)"
      class="absolute top-0 left-0 w-full h-full bg--cyan-tl rounded-lg"
    >
      <feather
        :type="isSelect ? 'check-circle' : 'circle'"
        class="absolute right-1 bottom-1 text-white"
      />
    </div>
  </ul>
</template>

<script>
import FileCase from "./FileCase.vue";
export default {
  props: {
    photoList: Array,
    albumIndex: Number,
    isSelect: Boolean,
  },
  inject: ["currentMode"],
  components: {
    FileCase,
  },
  computed: {
    listQty() {
      if (this.photoList.length < 4) {
        return 1;
      } else if (this.photoList.length < 9) {
        return 4;
      } else {
        return 9;
      }
    },
    thumbnails() {
      return this.photoList.slice(0, this.listQty);
    },
    gridTemplate() {
      const sideLength = Math.sqrt(this.listQty);
      return {
        "grid-template": `repeat(${sideLength}, 1fr) / repeat(${sideLength}, 1fr)`,
      };
    },
  },
  methods: {
    setFile(index) {
      if (this.currentMode() === "selection") {
        this.$store.commit("setSelected", [this.$route.name, index]);
      }
    },
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}
.grid__content--center {
  display: grid;
  align-content: center;
}
.folder {
  width: calc(100vw / 2 - 4rem);
  height: calc(100vw / 2 - 4rem);
  margin-bottom: 0;
  margin-top: 1rem;
  margin-inline: 1rem;
  background-color: var(--amber);
}
.bg--cyan-tl {
  background-color: rgba(22, 78, 99, 0.7);
}
</style>
