<template>
  <div class="flex justify-center items-center w-full h-full">
    <div class="modal rounded-lg">
      <p class="m-0">新增相簿名稱：</p>
      <input type="text" v-model="userInput" class="grid-col-span-2" />
      <button @click="createAlbum" class="rounded bg--cyan text-white">
        確認
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
    };
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
  },
  beforeDestroy() {
    this.useScene("none");
  },
};
</script>

<style>
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
