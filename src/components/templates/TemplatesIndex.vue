<template lang="html">
  <div id="templates">
    <b-table responsive :items="getTemplates" :fields="fields" :sort-compare="mySortCompare">
      <template v-slot:cell(titleid)="data">
        <router-link :to="`/templates/${data.item.id}`">{{ data.item.title }}</router-link>
      </template>
    </b-table>
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
    }
  },
  methods: {
    ...mapActions({
      readTemplates: "templates/readTemplates"
    }),
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
    // ...mapState('templates', [
    //   "templates"
    // ]),
    ...mapGetters({
      getTemplates: 'templates/getTemplates'
    }),
  },
  mounted() {
    this.readTemplates();
  }
};
</script>

<style lang="css" scoped>
</style>
