<template lang="html">
  <div id="templates">
    <b-table
      responsive
      fixed
      selectable
      stacked="sm"
      head-variant="dark"
      hover
      outlined
      borderless
      :items="getTemplates"
      :fields="fields"
      @row-clicked="templateDetails"
    >
      <template v-slot:cell(title)="data">
        <router-link :to="`/templates/${data.item.id}`">
          {{ data.item.title }}
        </router-link>
      </template>

      <template v-slot:cell(update_now)="data">
        <div>
          <b-button
            squared
            block
            v-b-toggle="'collapse-actions' + data.item.id"
            title="Actions"
            class="m-1"
            variant="dark"
          >
            Actions
            <b-icon-chevron-down />
          </b-button>
          <b-collapse
            :id="'collapse-actions' + data.item.id"
            accordion="template-actions"
          >
            <b-card bg-variant="light" no-body>
              <b-button
                @click="refreshTemplate(data.item.id)"
                squared
                class="d-flex px-4 align-items-center"
                title="Update Template"
                variant="light"
              >
                Update
                <b-icon-arrow-repeat class="ml-auto" />
              </b-button>
              <b-button
                v-b-modal="'modal-delete'"
                squared
                class="d-flex px-4 align-items-center"
                title="Remove Template"
                variant="light"
                @click="selectedTemplate = data.item"
              >
                Delete
                <b-icon-trash class="ml-auto" />
              </b-button>

            </b-card>
          </b-collapse>
        </div>
      </template>

    </b-table>

    <!-- title="Delete Template" -->
    <b-modal v-if="selectedTemplate"
      id="modal-delete"
      :title="`Delete Template: &quot;${selectedTemplate.title}&quot;`"
      header-bg-variant="dark"
      header-text-variant="light"
      ok-variant="danger"
      hide-backdrop
      content-class="shadow"
      @ok="removeTemplate(selectedTemplate.id)"
    >
      <p>
        Deleting this template will remove the ability to lauch all apps defined
        by it. <br />
        (this will have no effect on running apps)
      </p>
    </b-modal>

  </div>
</template>

<script>
// import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      // fields to display
      fields: [
        {
          key: "title",
          label: "Title",
          sortable: true
        },
        {
          key: "created_at",
          sortable: true,
          formatter: "fmtDate",
          thClass: "w-25"
        },
        {
          key: "updated_at",
          sortable: true,
          formatter: "fmtDate",
          thClass: "w-25"
        },
        {
          key: "update_now",
          sortable: false,
          label: "",
          headerTitle: "Update Buttons"
        }
      ],
      selectedTemplate: null
    };
  },
  methods: {
    ...mapActions({
      readTemplates: "templates/readTemplates",
      updateTemplate: "templates/updateTemplate",
      deleteTemplate: "templates/deleteTemplate"
    }),
    /* format date to local string */
    fmtDate(value) {
      return new Date(Date.parse(value)).toLocaleString();
    },
    // mySortCompare: function(a, b, key) {
    //   key = key === "titleid" ? "title" : key;
    //   return a[key].toString().localeCompare(b[key].toString());
    // },
    templateDetails(template) {
      this.$router.push({ path: `/templates/${template.id}` });
    },
    refreshTemplate(id) {
      this.updateTemplate(id);
      this.readTemplates();
    },
    /* deleteSelectedTemplate */
    removeTemplate(id) {
      this.deleteTemplate(id);
      // this.readTemplates();
    }
  },
  computed: {
    ...mapGetters({
      getTemplates: "templates/getTemplates"
    })
  },
  mounted() {
    this.readTemplates();
  },
  watch: {
    getTemplates() {
      console.log('items updated');
    }
    // '$store.state.templates.templates': function() {
    //   // this.readTemplates();
    // }
  }
};
</script>

<style lang="css" scoped></style>
