<template>
  <button @click="deleteFiles">
    <feather type="trash-2" />
  </button>
</template>

<script>
import CommonInfo from "../components/mixin/CommonInfo.vue";
export default {
  mixins: [CommonInfo],
  methods: {
    deleteFiles() {
      const list = this.baseList.reduce(
        (prev, current) =>
          current.isSelect ? prev.concat(current.name) : prev,
        []
      );
      this.$store.dispatch("deleteFiles", list).then(() => {
        this.$store.commit("useMode", "browse");
      });
    },
  },
};
</script>

<style></style>
