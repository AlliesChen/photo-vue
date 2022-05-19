<template>
  <div class="flex justify-space-around">
    <button :disabled="counter === 0" class="flex">
      <feather type="external-link" />
    </button>
    <p class="text-xl m-0">已選取{{ counter }}個項目</p>
    <Deletion-Btn :disabled="counter === 0" class="flex" />
  </div>
</template>

<script>
import CommonInfo from "../components/mixin/CommonInfo.vue";
import DeletionBtn from "../components/DeletionBtn.vue";
export default {
  mixins: [CommonInfo],
  components: {
    DeletionBtn,
  },
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
};
</script>

<style></style>
