<template>
  <div id="app">

    <!-- sidebar -->

<b-container fluid>
  <div v-if="isAuthenticated">
      <b-sidebar
        id="sidebar-big"
        shadow="sm"
        no-header-close
        no-close-on-esc
        no-close-on-route-change
      >
        <template v-slot:footer>
          <div class="d-flex bg-light text-dark align-items-center px-3 py-2">
            <b-button squared v-b-toggle="'sidebar-big sidebar-small'" variant="light">
              <b-icon-arrow-bar-left></b-icon-arrow-bar-left>
            </b-button>
          </div>
        </template>

        <div class="sidebar-header">
          <img alt="Vue logo" src="./assets/logo.png" width="32" height="32" />
        </div>
        <div>
          <b-nav vertical class="text-left">
            <b-nav-item @click.prevent="logout">Logout</b-nav-item>
          </b-nav>
        </div>
      </b-sidebar>

      <b-sidebar
        id="sidebar-small"
        width="5em"
        shadow="sm"
        no-header-close
        no-close-on-esc
        no-close-on-route-change
        visible
      >
        <template v-slot:footer>
          <div class="d-flex bg-light text-dark align-items-center px-3 py-2">
            <b-button squared v-b-toggle="'sidebar-big sidebar-small'" variant="light">
              <b-icon-arrow-bar-right></b-icon-arrow-bar-right>
            </b-button>
          </div>
        </template>

        <div class="sidebar-header">
          <img alt="Vue logo" src="./assets/logo.png" width="32" height="32" />
        </div>
        <b-nav vertical class="text-left">
          <b-nav-item @click.prevent="logout">Logout</b-nav-item>
        </b-nav>
      </b-sidebar>
  </div>

  <router-view id="content" />
</b-container>

  </div>
</template>

<script type="text/javascript">
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  },
  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/");
      });
    }
  },
  created() {
  }
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}

#sidebar-small {
  /*
  top: 4rem;
  */
  max-height: calc(100vh - 0rem);
}
#sidebar-big {
  /*
  top: 4rem;
  */
  max-height: calc(100vh - 0rem);
}
#content {
  margin-left: 4rem;
  padding: 2rem;
}
</style>
