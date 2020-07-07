<template lang="html">
  <div v-if="template">
    <b-button type="button" @click="removeTemplate(template.id)">Delete</b-button>
    <h4>{{ template.title }}</h4>
    <p>{{ template.url }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

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
    ...mapActions({
      readTemplates: "templates/readTemplates",
      deleteTemplate: "templates/deleteTemplate"
    }),
    removeTemplate(id) {
      console.log(id);
      this.deleteTemplate(id);
      this.$router.push('/templates/');
    }
  },
  mounted() {
    this.readTemplates();
  },
  beforeRouterUpdates(to, from, next) {
    this.readTemplates();
    // const templateId = this.$route.params.templateId;
    // this.readTemplate(templateId);
    next();
  }
};
</script>

<style lang="css" scoped>
</style>
