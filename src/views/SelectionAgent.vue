<template>
  <div class="flex justify-space-around">
    <button :disabled="counter === 0" class="flex">
      <feather type="external-link" />
    </button>
    <p class="text-xl m-0">已選取{{ counter }}個項目</p>
    <button :disabled="counter === 0" @click="useScene" class="flex">
      <feather type="trash-2" />
    </button>
  </div>
</template>

<script>
import CommonInfo from "../components/mixin/CommonInfo.vue";
export default {
  mixins: [CommonInfo],
  computed: {
    counter() {
      return this.baseList.reduce(
        (prev, current) => prev + (current.isSelect ? 1 : 0),
        0
      );
    },
  },
  destroyed() {
    this.baseList.forEach((item, index) => {
      if (item.isSelect) {
        this.$store.commit("setSelected", [this.currentPage, index]);
      }
    });
  },
  methods: {
    useScene() {
      this.$store.commit("useScene", "deletion");
    },
  },
};
</script>

<style></style>
