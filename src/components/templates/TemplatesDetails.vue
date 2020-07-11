<template lang="html">
  <div v-if="currentTemplate">
    <h4>{{ currentTemplate.title }}</h4>
    <p>{{ currentTemplate.url }}</p>

    <b-container fluid>
      <b-row cols="1">
        <b-col
          v-for="item in currentTemplate.items"
          :key="item.id"
          col
          no-gutters
          class="mb-2"
        >
          <b-media>
            <template v-slot:aside>
              <img :src="item.logo" width="64" alt="Media Aside" />
            </template>

            <h2 class="mt-0">{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </b-media>
          <hr />
        </b-col>
      </b-row>
    </b-container>
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
  },
  methods: {
    ...mapActions({
      readTemplate: "templates/readTemplate",
      deleteTemplate: "templates/deleteTemplate"
    }),
    removeTemplate(id) {
      this.deleteTemplate(id);
      this.$router.push("/templates/");
    }
  },
  mounted() {
    const templateId = this.$route.params.templateId;
    this.readTemplate(templateId);
  },
  beforeRouterUpdates(to, from, next) {
    const templateId = this.$route.params.templateId;
    this.readTemplate(templateId);
    next();
  }
};
</script>

<style lang="css" scoped></style>
