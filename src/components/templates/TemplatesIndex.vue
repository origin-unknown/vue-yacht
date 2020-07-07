<template lang="html">
  <div id="templates">
    <b-table responsive :items="templates" :fields="fields" :sort-compare="mySortCompare">
      <template v-slot:cell(titleid)="data">
        <router-link :to="`/templates/${data.item.id}`">{{ data.item.title }}</router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // fields to display
      fields: [
        {
          key: 'titleid',
          label: 'Title',
          sortable: true,
        },
        {
          key: 'created_at',
          sortable: true,
          formatter: "fmtDate",
          thClass: "w-25"
        },
        {
          key: 'updated_at',
          sortable: true,
          formatter: "fmtDate",
          thClass: "w-25"
        }
      ],
      templatesData: []
    }
  },
  methods: {
    /* format date to local string */
    fmtDate(value) {
      return (new Date(Date.parse(value))).toLocaleString();
    },
    mySortCompare: function(a, b, key) {
      key = (key === 'titleid' ? 'title' : key);
      return a[key].toString().localeCompare(b[key].toString());
    },
  },
  computed: {
    ...mapState({
      templates: "templates/templates"
    })
  },
  mounted() {
    this.$store.dispatch("templates/loadTemplates");
  }
};
</script>

<style lang="css" scoped>
</style>
