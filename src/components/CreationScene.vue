<template>
  <div class="flex justify-center items-center w-full h-full">
    <div v-if="$route.params.type === 'albums'" class="modal rounded-lg">
      <p class="m-0">新增相簿名稱：</p>
      <input type="text" v-model="userInput" class="grid-col-span-2" />
      <button @click="createAlbum" class="rounded bg--cyan text-white">
        確認
      </button>
      <button @click="useScene('none')">取消</button>
    </div>
    <div v-else class="modal rounded-lg">
      <p class="m-0">選取相簿：</p>
      <div>
        <button>新增相簿</button>
        <div v-for="album in albumList" :key="album.id">
          <input
            v-model="userSelect"
            v-show="false"
            :id="album.id"
            :value="album.id"
            type="radio"
            name="albums"
          />
          <label
            :for="album.id"
            :class="{ 'text-cyan': album.id === userSelect }"
            >{{ album.name }}</label
          >
        </div>
      </div>
      <button @click="addItems" class="rounded bg--cyan text-white">
        加入相簿
      </button>
      <button @click="useScene('none')">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: "",
      userSelect: "",
    };
  },
  inject: ["baseList"],
  computed: {
    albumList() {
      return this.$store.getters.checkState("albums");
    },
  },
  methods: {
    createAlbum() {
      this.$store.dispatch("createAlbum", { name: this.userInput });
      this.userInput = "";
      this.useScene("none");
    },
    useScene(scene) {
      this.$store.commit("useScene", scene);
    },
    addItems() {
      const albumId = this.userSelect;
      const list = this.baseList().reduce(
        (prev, current) => (current.isSelect ? prev.concat(current.id) : prev),
        []
      );
      this.$store.dispatch("addItems", [albumId, list]);
      this.useScene("none");
      this.$store.commit("useMode", "browse");
    },
  },
  beforeDestroy() {
    this.useScene("none");
  },
};
</script>

<style>
.modal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 2rem;
  background-color: var(--white);
  box-shadow: 0.5rem 0.5rem 1rem -0.5rem var(--black);
}
.grid-col-span-2 {
  grid-column-end: span 2;
}
.bg--cyan {
  background-color: var(--cyan);
}
</style>
