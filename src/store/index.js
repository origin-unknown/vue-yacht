import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import auth from "./modules/auth"

Vue.use(Vuex);

const state = {
  // single source of data
  refresh_token: null,
  access_token: null
};

const mutations = {
  // isolated data mutations
};

const actions = {
  login: ({ commit }, data) => {
    console.log('action found', commit, data);
    axios
      .post("/api/login", {
        username: data.username,
        password: data.password
      })
      .then(resp => {
        console.log(resp.data);

        // i think this is unused
        localStorage.setItem("access_token", resp.data.access_token);
        localStorage.setItem("refresh_token", resp.data.refresh_token);
        // localStorage.setItem('username', authData.username);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        console.log("finished api request.");
      });
  },
};

const modules = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules
});
