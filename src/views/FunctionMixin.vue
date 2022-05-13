<script>
export default {
  methods: {
    useMutation(e) {
      const el = e.target.closest("[data-to]");
      const [state, target] = el.dataset.to.match(/(\w+)/g);
      console.log(target);
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
