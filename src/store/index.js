import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    currencies: '',
    money: '',
    local: '',
    currency: 1,
    forchange: 1
  },
  mutations:{
    setCurrencies(state, data){
      state.currencies = data
    },
    setMoney(state, data){
      state.money = data
    },
    setCurrency(state, data){
      state.currency = data
    },
    setForchange(state, data){
      state.forchange = data
    },
    setLocal(state, data){
      state.local = data
    }
  },
  actions: {
    setCurrencies({commit}, data){
      commit("setCurrencies", data)
    }
  },
  getters:{
    getCurrencies(state){
      return state.currencies
    },
    getCurrency(state){
      return state.currency
    },
    getMoney(state){
      return state.money
    },
    getForchange(state){
      return state.forchange
    },
    getLocal(state){
      return state.local
    }
  }

});

export default store;
