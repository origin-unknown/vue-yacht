<template lang="html">
  <form @submit.prevent="onSubmit">
    <div>
      <label>Username</label>
      <input v-model="username" type="text" placeholder="Username" />
    </div>
    <div>
      <label>Password</label>
      <input v-model="password" type="text" placeholder="Password" />
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      console.log(this.username, this.password);
      // const url = "/api/login";
      // this.$http
      //   .post(url, {
      //     username: this.username,
      //     password: this.password
      //   })
      //   .then(resp => {
      //     console.log(resp.data);
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   })
      //   .finally(() => {
      //     console.log("finished api request.");
      //   });
      let data = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch('login', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
};
</script>

<style lang="css" scoped></style>
