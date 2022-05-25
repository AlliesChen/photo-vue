<template>
  <article class="w-full h-full flex-col items-center bg__black">
    <header class="text-white flex items-center">
      {{ `${currentIndex + 1}/${baseList.length}` }}
      <!-- back to images or videos -->
      <router-link
        :to="`/${itemReference}`"
        class="absolute right-4 flex items-center text-white"
      >
        <feather type="x" />
      </router-link>
    </header>
    <main @click="swipeFile" class="grid__col--3">
      <File-Case
        v-if="currentIndex > 0"
        :type="type"
        :alter="prev.name"
        :source="`${baseURL}/${type}/${prev.name}`"
        class="prev"
      />
      <File-Case :type="type" :alter="id" :source="source" class="carry" />
      <File-Case
        v-if="currentIndex < baseList.length - 1"
        :type="type"
        :alter="next.name"
        :source="`${baseURL}/${type}/${next.name}`"
        class="next"
      />
    </main>
    <footer class="text-white flex items-center">{{ displayName }}</footer>
  </article>
</template>

<script>
import { baseURL } from "../store/files";
import CommonInfo from "../components/mixin/CommonInfo.vue";
import FileCase from "../components/FileCase.vue";
export default {
  name: "FileScene",
  mixins: [CommonInfo],
  components: {
    FileCase,
  },
  data() {
    return {
      type: "",
      id: "",
      source: "",
      baseURL,
    };
  },
  computed: {
    currentIndex() {
      return this.baseList.map((item) => item.name).indexOf(this.id);
    },
    itemReference() {
      return this.type.concat("s");
    },
    displayName() {
      const timestamp = this.id.match(
        /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
      );
      return `${timestamp[1]}/${timestamp[2]}/${timestamp[3]} ${timestamp[4]}:${timestamp[5]}:${timestamp[6]}`;
    },
    prev() {
      return {
        ...this.$store.getters.checkItem(
          this.itemReference,
          this.currentIndex - 1
        ),
      };
    },
    next() {
      return {
        ...this.$store.getters.checkItem(
          this.itemReference,
          this.currentIndex + 1
        ),
      };
    },
  },
  methods: {
    swipeFile() {
      // TODO: del
      console.log("swipe!");
      this.$router.push(`/${this.type}/${this.next.name}`);
    },
  },
  watch: {
    $route(newPath, oldPath) {
      if (Object.keys(newPath.params).length) {
        this.type = newPath.params.type;
        this.id = newPath.params.id;
      } else {
        this.type = oldPath.params.type;
        this.id = oldPath.params.id;
      }
      this.source = `${baseURL}/${this.type}/${this.id}`;
    },
  },
  created() {
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;
    this.source = `${baseURL}/${this.type}/${this.id}`;
  },
  activated() {
    this.$store.commit("useScene", "showcase");
  },
  deactivated() {
    this.$store.commit("useScene", "none");
  },
};
</script>

<style scoped lang="scss">
header,
footer {
  height: 4rem;
}
main {
  /* header and footer are both 8 rem height */
  min-height: calc(100vh - 8rem);
  & .carry {
    grid-column-start: 2;
  }
}
.bg__black {
  background-color: var(--black);
}
.mask {
  z-index: 2;
}
.grid__col--3 {
  display: grid;
  grid-template: 100% / repeat(3, 90vw);
  column-gap: 5vw;
  justify-items: center;
  align-items: center;
}
</style>
