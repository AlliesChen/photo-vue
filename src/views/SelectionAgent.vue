<template>
  <div class="flex justify-space-around">
    <button
      :disabled="counter === 0"
      @click="useScene('creation')"
      class="flex"
    >
      <feather type="external-link" />
    </button>
    <p class="text-xl m-0">已選取{{ counter }}個項目</p>
    <button
      :disabled="counter === 0"
      @click="useScene('deletion')"
      class="flex"
    >
      <feather type="trash-2" />
    </button>
  </div>
</template>

<script>
export default {
  inject: ["baseList"],
  computed: {
    counter() {
      return this.baseList().reduce(
        (prev, current) => prev + (current.isSelect ? 1 : 0),
        0
      );
    },
  },
  destroyed() {
    this.baseList().forEach((item, index) => {
      if (item.isSelect) {
        this.$store.commit("setSelected", [this.$route.params.type, index]);
      }
    });
  },
  methods: {
    useScene(scene) {
      this.$store.commit("useScene", scene);
    },
  },
};
</script>

<style></style>
