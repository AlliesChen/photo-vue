<template>
  <div class="flex h-full" @click="useMutation">
    <div
      v-for="btn in btns"
      :key="btn.name"
      :data-to="btn.to"
      :class="[
        currentPage === btn.name ? 'text-cyan' : '',
        'btn',
        'flex-col justify-flex-start items-center h-full',
      ]"
    >
      <feather :type="btn.icon" />
      <small>{{ btn.text }}</small>
    </div>
  </div>
</template>

<script>
import FunctionMixin from "./FunctionMixin.vue";
export default {
  mixins: [FunctionMixin],
  name: "BrowserBtnSet",
  data() {
    return {
      btns: [
        {
          name: "photos",
          icon: "image",
          text: "圖庫",
          to: "page-photos",
        },
        {
          name: "videos",
          icon: "video",
          text: "影片",
          to: "page-videos",
        },
        {
          name: "albums",
          icon: "book",
          text: "相簿",
          to: "page-albums",
        },
      ],
    };
  },
  computed: {
    currentPage() {
      return this.$store.getters.currentPage;
    },
  },
  methods: {
    usePage(e) {
      const target = e.target.closest("div[data-name]");
      const page = target.dataset.name;
      this.$store.commit("usePage", page);
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  flex: auto;
  cursor: pointer;
  &:active {
    background-color: rgba(0, 0, 0, 0.3);
    color: aquamarine;
  }
  @media only screen and (min-width: 480px) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      color: aquamarine;
    }
  }
}
</style>
