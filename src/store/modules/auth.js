import axios from "axios";
import router from "@/router";

const state = {
  // single source of data
  username: localStorage.getItem("username") || "",
  access_token: localStorage.getItem("access_token") || "",
  refresh_token: localStorage.getItem("refresh_token") || ""
};

const mutations = {
  // isolated data mutations
  setAuth(state, data) {
    state.username = data.username;
    state.access_token = data.access_token;
    state.refresh_token = data.refresh_token;
  },
  clearAuth(state) {
    state.username = null;
    state.access_token = null;
    state.refresh_token = null;
  }
};

const actions = {
  login: ({ commit }, data) => {
    axios
      .post("/api/login", {
        username: data.username,
        password: data.password
      })
      .then(response => {
        console.log(response.data);

        commit("setAuth", {
          username: data.username,
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token
        });

        // i think this is unused
        localStorage.setItem("username", data.username);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;

        router.replace("dashboard");
      })
      .catch(err => {
        console.error(err);

        commit("clearAuth");

        localStorage.removeItem("username");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        delete axios.defaults.headers.common["Authorization"];

        // router.replace("about");
      })
      .finally(() => {
        console.log("finished api request.");
      });
  },
  // register
  // logout
  logout: ({ commit }) => {
    return new Promise(resolve => {
      commit("clearAuth");
      localStorage.removeItem("username");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  }
};

const getters = {
  isAuthenticated(state) {
    return !!state.access_token;
  }
};

export default {
  namespaced: false,
  state,
  mutations,
  getters,
  actions
};
