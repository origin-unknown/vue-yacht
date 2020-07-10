<template lang="html">
  <div class="templates">
    <b-overlay :show="loading" variant="white" rounded="sm">
      <router-view></router-view>
    </b-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Templates",
  data() {
    return {};
  },
  computed: {
    ...mapState("templates", ["loading"])
  }
};
</script>

<style lang="css" scoped></style>
