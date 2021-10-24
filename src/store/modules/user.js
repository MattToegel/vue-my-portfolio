// initial state
const state = () => ({
  currentUser: null
})

// getters
const getters = {
    currentUser: (state)=>{
        return state.currentUser;
    }
}

// mutations
const mutations = {
    SET_USER:(state, data) =>{
      state.currentUser = data;
    }
}

// actions
const actions = {
    fetchUser: ({ commit }, user) =>{
      if (user) {
        commit("SET_USER", user);
      } else {
        commit("SET_USER", null);
      }
    }
}
export default {
  state,
  getters,
  actions,
  mutations,
}