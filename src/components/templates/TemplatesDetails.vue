<template lang="html">
  <div v-if="currentTemplate">
    <b-button type="button" @click="removeTemplate(currentTemplate.id)"
      >Delete
    </b-button>
    <h4>{{ currentTemplate.title }}</h4>
    <p>{{ currentTemplate.url }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("templates", ["currentTemplate"]),
    ...mapGetters({
      getTemplateById: "templates/getTemplateById"
    })
    // currently unused, see currentTemplate
    // template() {
    //   const templateId = this.$route.params.templateId;
    //   return this.getTemplateById(templateId);
    // }
  },
  methods: {
    ...mapActions({
      readTemplate: "templates/readTemplate",
      // readTemplates: "templates/readTemplates",
      deleteTemplate: "templates/deleteTemplate"
    }),
    removeTemplate(id) {
      // console.log(id);
      this.deleteTemplate(id);
      this.$router.push("/templates/");
    }
  },
  mounted() {
    // BUG: getter getTemplateById returns undefined
    const templateId = this.$route.params.templateId;
    this.readTemplate(templateId);

    // NO BUG:
    // this.readTemplates();
  },
  beforeRouterUpdates(to, from, next) {
    // BUG: getter getTemplateById returns undefined
    const templateId = this.$route.params.templateId;
    this.readTemplate(templateId);

    // NO BUG:
    // this.readTemplates();
    next();
  }
};
</script>

<style lang="css" scoped></style>
