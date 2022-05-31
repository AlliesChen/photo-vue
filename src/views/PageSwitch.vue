<template>
  <div class="flex h-full">
    <router-link
      v-for="btn in btns"
      :key="btn.uuid"
      :to="`/${btn.to}`"
      class="btn flex-col justify-flex-start items-center h-full"
      :class="$route.params.type === btn.to ? 'text-cyan' : 'text-black'"
    >
      <feather :type="btn.icon" />
      <small>{{ btn.text }}</small>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PageSwitch",
  data() {
    return {
      btns: [
        {
          uuid: this.$uuid.v1(),
          icon: "image",
          text: "圖庫",
          to: "images",
        },
        {
          uuid: this.$uuid.v1(),
          icon: "video",
          text: "影片",
          to: "videos",
        },
        {
          uuid: this.$uuid.v1(),
          icon: "book",
          text: "相簿",
          to: "albums",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.btn {
  flex: auto;
  text-decoration: none;
  &:active {
    background-color: var(--cyan-dark);
    color: var(--cyan-light);
  }
  @media only screen and (min-width: 480px) {
    &:hover {
      background-color: var(--cyan-dark);
      color: var(--cyan-light);
    }
  }
}
</style>
