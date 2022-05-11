<template>
  <header id="appHeader" class="header justify-center items-start">
    <h2 id="appTitle" class="text-white"></h2>
    <button id="selectionButton" class="btn" data-active="true">選取</button>
    <button id="cancelButton" class="btn" data-active="false">取消</button>
    <label for="fileInput" class="btn flex-col-center rounded-full">
      <feather type="plus" />
      <input
        type="file"
        id="fileInput"
        name="fileInput"
        accept="image/png, image/jpeg"
        multiple="multiple"
        data-active="false"
      />
    </label>
  </header>
</template>

<script>
export default {
  name: "FunctionBar",
  data() {
    return {
      photo: "",
    };
  },
  methods: {
    getFileNames: async function (items) {
      // this.axios.defaults.baseURL = "http://127.0.0.1:8080";
      try {
        const response = await this.axios({
          url: `/${items}`,
          baseURL: "http://127.0.0.1:8080",
        });
        const data = response.data;
        // in case no file exists
        if (!data) {
          return [];
        }
        const fileNames = data.map((item) => item.slice(0));
        return fileNames;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin rounded($rounded: 0.25rem) {
  border-radius: $rounded;
}

@mixin setJustify($alignment) {
  .justify-#{$alignment} {
    justify-content: $alignment;
  }
}

@mixin setItems($alignments...) {
  @for $i from 1 to length($alignments) {
    .items-#{nth($alignments, $i)} {
      align-items: #{nth($alignments, $i)};
    }
  }
}

@include setJustify(center);
@include setItems(center, start, end);

.header {
  position: sticky;
  z-index: 2;
  top: 0;
  width: 100%;
  display: flex;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(74, 74, 74, 1) 25%,
    rgba(255, 255, 255, 0.65) 100%
  );
}

.btn {
  font-size: 1rem;
  position: absolute;
  right: 60px;
  color: white;
  background-color: gray;
  border-radius: 14px;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
}

.rounded {
  @include rounded;
}

.rounded-full {
  @include rounded(50%);
}
</style>
