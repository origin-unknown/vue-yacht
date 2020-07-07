<template lang="html">
  <div v-if="template">
    <b-button type="button" @click="removeTemplate">Delete</b-button>
    <h4>{{ template.title }}</h4>
    <p>{{ template.url }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // templateData: null
    };
  },
  computed: {
    ...mapGetters({
      templateById: 'templates/templateById'
    }),
    template() {
      const templateId = this.$route.params.templateId;
      return this.templateById(templateId);
    }
  },
  methods: {
    removeTemplate() {
      console.log(this.templateData.id);
//      this.deleteTemplate(this.templateData.id);
    }
  },
  mounted() {
    this.$store.dispatch("templates/loadTemplates");
  },
  // beforeRouterUpdates(to, from, next) {
  //   const templateId = this.$route.params.templateId;
  //   this.readTemplate(templateId);
  //   next();
  // }
};
</script>

<style lang="css" scoped>
</style>
