<script>
export default {
  methods: {
    switchScene(el) {
      const [state, target] = el.to.match(/(\w+)/g);
      let mutation;
      switch (state) {
        case "page":
          mutation = "usePage";
          break;
        case "mode":
          mutation = "useMode";
          break;
        default:
          throw new Error("Sorry, wrong state");
      }
      this.$store.commit(mutation, target);
    },
  },
};
</script>
