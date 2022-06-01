<template>
  <ul class="relative folder rounded-lg p-4">
    <li v-for="item in listFiles(album)" :key="item.id">
      <File-Case
        :source="item.root"
        :fileName="item.id"
        :fileType="item.type"
      />
      <div
        v-show="currentMode() === 'selection'"
        @click="setFile(index)"
        class="absolute top-0 left-0 w-full h-full bg--cyan-tl rounded-lg"
      >
        <feather
          :type="album.isSelect ? 'check-circle' : 'circle'"
          class="absolute right-1 bottom-1 text-white"
        />
      </div>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style></style>
