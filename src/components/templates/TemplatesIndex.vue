<template lang="html">
  <div id="templates">
    <div class="d-flex">
      <b-form-input v-model="filter" placeholder="Type to Search" class="mr-2">
      </b-form-input>
      <b-button
        squared
        v-b-modal="'modal-add'"
        title="Add Template"
        class="ml-auto mb-1"
        variant="dark"
      >
        <b-icon-plus />
      </b-button>
    </div>

    <b-table
      responsive
      fixed
      selectable
      stacked="sm"
      head-variant="dark"
      hover
      outlined
      borderless
      :items="templates"
      :fields="fields"
      :filter="filter"
      :filter-included-fields="['title']"
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="templateDetails"
    >
      <template v-slot:cell(title)="data">
        <div class="namecell">
          <span class="nametext">
            <router-link :to="`/templates/${data.item.id}`">
              {{ data.item.title }}
            </router-link>
          </span>
          <b-dropdown
            variant="link"
            size="sm"
            right
            style="display:inline-block;"
          >
            <template slot="button-content">
              <b-icon-three-dots class="ml-auto" />
            </template>
            <b-dropdown-item @click="updateTemplate(data.item.id)">
              <b-icon-arrow-repeat class="ml-auto" /> Update
            </b-dropdown-item>
            <b-dropdown-item
              v-b-modal="'modal-delete'"
              @click="selectedTemplate = data.item"
            >
              <b-icon-trash class="ml-auto" /> Delete
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="templates.length"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <b-modal
      v-if="selectedTemplate"
      id="modal-delete"
      :title="`Delete Template: &quot;${selectedTemplate.title}&quot;`"
      header-bg-variant="dark"
      header-text-variant="light"
      ok-variant="danger"
      hide-backdrop
      content-class="shadow"
      @ok="deleteTemplate(selectedTemplate.id)"
    >
      <p>
        Deleting this template will remove the ability to lauch all apps defined
        by it. <br />
        (this will have no effect on running apps)
      </p>
    </b-modal>

    <b-modal
      :id="'modal-add'"
      :title="'Add Template'"
      header-bg-variant="dark"
      header-text-variant="light"
      hide-backdrop
      content-class="shadow"
    >
      <!-- Modal Footer -->
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <div class="d-flex">
          <b-button @click="cancel" variant="dark"> Cancel </b-button>
          <b-button
            @click="
              ok();
              addTemplate();
            "
            variant="primary"
            class=" ml-2 "
          >
            Add
            <b-icon-plus />
          </b-button>
        </div>
      </template>
      <!-- Modal Content -->
      <b-form>
        <b-form-group
          label="Title:"
          label-for="title"
          description="The title of the template."
        >
          <b-form-input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="Template Name"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          label="URL:"
          label-for="url"
          description="The URL of the template."
        >
          <b-form-input
            id="title"
            v-model="form.url"
            type="url"
            placeholder="http://example.com/path/to/template.json"
            required
          >
          </b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      filter: null,
      perPage: 5,
      currentPage: 1,
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
          thClass: "w-20"
        },
        {
          key: "updated_at",
          sortable: true,
          formatter: "fmtDate",
          thClass: "w-20"
        }
      ],
      form: {
        title: "Untitled Template 1",
        url: "http://localhost:5000/static/template.json"
      },
      selectedTemplate: null
    };
  },
  methods: {
    ...mapActions({
      readTemplates: "templates/readTemplates",
      updateTemplate: "templates/updateTemplate",
      deleteTemplate: "templates/deleteTemplate",
      writeTemplate: "templates/writeTemplate"
    }),
    /* format date to local string */
    fmtDate(value) {
      return new Date(Date.parse(value)).toLocaleString();
    },
    templateDetails(template) {
      this.$router.push({ path: `/templates/${template.id}` });
    },
    onSubmit() {
      const data = { ...this.form };
      this.writeTemplate(data);
      this.$refs.form.reset();
    },
    addTemplate() {
      const data = { ...this.form };
      this.writeTemplate(data);
      this.$refs.form.reset();
    }
  },
  computed: {
    ...mapState("templates", ["templates"])
  },
  mounted() {
    this.readTemplates();
  },
  watch: {
    // templates: (oldval, newval) => {
    //   console.log(oldval, newval);
    // }
  }
};
</script>

<style lang="css">
.w-20 {
  width: 20% !important;
}
.namecell {
  display: flex;
  min-width: 72px;
}
.nametext {
  width: 0;
  padding: 0px;
  padding-right: 20px;
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
