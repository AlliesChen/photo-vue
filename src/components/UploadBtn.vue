<template>
  <label for="fileInput" class="flex-col justify-center rounded-full p-half">
    <feather type="plus" />
    <input
      v-show="false"
      @change="uploadFiles"
      type="file"
      id="fileInput"
      name="fileInput"
      accept="image/png, image/jpeg"
      multiple="multiple"
    />
  </label>
</template>

<script>
export default {
  methods: {
    uploadFiles(e) {
      this.$store.dispatch("uploadFiles", e.target.files).then(() => {
        e.target.value = "";
      });
    },
  },
};
</script>

<style scoped>
.p-half {
  padding: 0.125rem;
}
</style>
