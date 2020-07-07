import axios from "axios";

const state = {
  // better use object as set {<id>: template} to guarantee uniqueness
  templates: []
};

const getters = {
  templateById: state => id => {
    return state.templates.find(template => template.id == id);
  }
};

const mutations = {
  setTemplates(state, templates) {
    state.templates = templates;
  },
  addTemplate(state, template) {
    state.templates.push(template);
  },
  removeTemplate(state, template) {
    state.templates = state.templates.filter(
      _template => _template.id == template.id
    );
  }
};

const actions = {
  readTemplates({ commit }) {
    const url = "/api/templates/";
    axios.get(url).then(response => {
      let templates = response.data.data;
      commit("setTemplates", templates);
    });
  },
  // readTemplate(context, id) {
  //   const url = `/api/templates/${id}`;
  //   axios.get(url).then(response => {
  //     let template = response.data.data;
  //   });
  // },
  writeTemplate({ commit }, payload) {
    const url = "/api/templates/";
    axios.post(url, payload).then(response => {
      let template = response.data.data;
      commit("addTemplate", template);
    });
  },

  deleteTemplate(context, id) {
    const url = `/api/templates/${id}`;
    axios.delete(url).then(response => {
      let template = response.data.data;
      context.commit("removeTemplate", template);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
