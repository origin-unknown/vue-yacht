<template lang="html">
  <div>
    <span>{{ message }}</span>
    <hr/>
    <templates />
  </div>
</template>

<script>
import Templates from "@/components/templates/Templates.vue";

export default {
  name: "Dashboard",
  components: {
    Templates
  },
  data() {
    return {
      message: ""
    };
  },
  methods: {
    fetchMessage() {
      const url = "/api/sample";
      this.$http
        .get(url)
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          console.log("finished api request.");
        });
    }
  },
  mounted() {
    this.fetchMessage();
  }
};
</script>

<style lang="css" scoped></style>
