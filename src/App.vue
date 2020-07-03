<template>
  <div id="app">
    <div id="nav">
      <span v-if="isAuthenticated">
        <router-link to="/dashboard">Dashboard</router-link> |
        <span><a @click.prevent="logout">Logout</a></span>
      </span>
      <span v-else>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/login">Login</router-link>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script type="text/javascript">
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/")
      })
    }
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
