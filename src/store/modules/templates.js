import axios from "axios";

const state = {
  // better use object as set {<id>: template} to guarantee uniqueness
  templates: {}
};

const getters = {
  /* BUG: Can't get property of state.templates on readTemplate */
  // getTemplateById: state => id => {
  //   return state.templates[id]
  // },
  // getTemplateById(state) {
  //   return id => {
  //     return state.templates[id];
  //   }
  // },
  getTemplateById(state) {
    return function(id) {
      return state.templates[id];
    }
  },
  // getTemplates: state => {
  //   return Object.values(state.templates);
  // }
  getTemplates(state) {
    return Object.values(state.templates);
  }
};

const mutations = {
  setTemplates(state, templates) {
    state.templates = templates.reduce((map, obj) => {
      map[obj.id] = obj;
      return map;
    }, {});
  },
  setTemplate(state, template) {
    state.templates[template.id] = template;
  },
  removeTemplate(state, template) {
    delete state.templates[template.id];
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
  readTemplate({ commit }, id) {
    const url = `/api/templates/${id}`;
    axios.get(url).then(response => {
      let template = response.data.data;
      commit("setTemplate", template);
    });
  },
  writeTemplate({ commit }, payload) {
    const url = "/api/templates/";
    axios.post(url, payload).then(response => {
      let template = response.data.data;
      commit("setTemplate", template);
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
