<template lang="html">
  <div>
    <span>{{ message }}</span>
  </div>
</template>

<script>

export default {
  name: "Sample",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    fetchMessage() {
      const url = "/api/sample";
      this.$http.get(
        url
      ).then((resp) => {
        this.message = resp.data.message;
      }).catch((err) => {
        console.error(err)
      }).finally(() => {
        console.log('finished api request.')
      })
    },
  },
  mounted() {
    console.log('juhuu');
    this.fetchMessage();
  }
}
</script>

<style lang="css" scoped>
</style>
