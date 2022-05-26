<template>
  <button @click="deleteFiles">
    <slot></slot>
  </button>
</template>

<script>
export default {
  inject: ["baseList"],
  methods: {
    deleteFiles() {
      const list = this.baseList().reduce(
        (prev, current) =>
          current.isSelect ? prev.concat(current.name) : prev,
        []
      );
      this.$store.dispatch("deleteFiles", list).then(() => {
        this.$store.commit("useScene", "none");
      });
    },
  },
};
</script>

<style></style>
