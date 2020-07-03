import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import auth from "./modules/auth"

Vue.use(Vuex);

const state = {
  // single source of data
  username: null,
  refresh_token: null,
  access_token: null
};

const mutations = {
  // isolated data mutations
  setAuth(state, data) {
    state.username = data.username;
    state.access_token = data.access_token;
    state.refresh_token = data.refresh_token;
  }
};

const actions = {
  login: ({ commit }, data) => {
    console.log('action found', commit, data);
    axios
      .post("/api/login", {
        username: data.username,
        password: data.password
      })
      .then(response => {
        console.log(response.data);

        commit('setAuth',
          {
            username: data.username,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token
          });

        // i think this is unused
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        // localStorage.setItem('username', authData.username);

        // router.replace('dashboard');
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
