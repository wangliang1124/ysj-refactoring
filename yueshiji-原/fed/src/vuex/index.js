import Vue from 'vue';
import Vuex from 'vuex';
import cookie from 'cookiejs';

Vue.use(Vuex);

const storeUser = (d) => {
  cookie('token', d.token, { expires: 30, path: '/' });
  cookie('uuid', d.user_id, { expires: 30, path: '/' });
};

const state = {
  userInfo: {},
  vipInfo: {},
  token: {
    id: cookie('token') || '',
    user_id: cookie('uuid') || '',
  },
  location: {
    lat: '', // 纬度
    lng: '', // 经度
  },
  cookTop11: [],
  rankListMonth: [],
  rankListTotal: [],
};

const getters = {
  token: s => s.token,
  userInfo: s => s.userInfo,
  vipInfo: s => s.vipInfo,
  location: s => s.location,
  cookTop11: s => s.cookTop11,
  rankListMonth: s => s.rankListMonth,
  rankListTotal: s => s.rankListTotal,
};

const actions = {
  setUser({ commit }, d) {
    storeUser(d);
    commit('SET_USER', d);
  },
  setUserInfo({ commit }, d) {
    commit('SET_USER_INFO', d);
  },
  setVIPInfo({ commit }, d) {
    commit('SET_VIP_INFO', d);
  },
  editUserInfo({ commit }, d) {
    commit('EDIT_USER_INFO', d);
  },
  setLocation({ commit }, d) {
    commit('SET_LOCATION', d);
  },
  setCookTop11({ commit }, d) {
    commit('SET_COOKTOP11', d);
  },
  setRankListMonth({ commit }, d) {
    commit('SET_RANKLIST_MONTH', d);
  },
  setRankListTotal({ commit }, d) {
    commit('SET_RANKLIST_TOTAL', d);
  },
};

const mutations = {
  SET_USER(s, d) {
    s.token = {
      id: d.token,
      user_id: d.user_id,
    };
  },
  SET_USER_INFO(s, d) {
    s.userInfo = {
      ...d.user_info,
    };
    s.vipInfo = {
      ...d.user_vip,
    };
    // 把获取到用户信息的数据存储到本地，防止页面刷新state重置
    window.localStorage.setItem('userInfo', JSON.stringify(s.userInfo));
    cookie('userInfo', JSON.stringify(s.userInfo));
  },
  SET_VIP_INFO(s, d) {
    s.vipInfo = {
      ...d,
    };
  },
  EDIT_USER_INFO(s, d) {
    s.userInfo = {
      ...d,
    };
  },
  SET_LOCATION(s, d) {
    s.location = {
      lat: d.latitude,
      lng: d.longitude,
    };
    window.localStorage.setItem('location', JSON.stringify(s.location));
    // cookie('location', JSON.stringify(s.location));
  },
  SET_COOKTOP11(s, d) {
    s.cookTop11 = [
      ...d.cookTop11,
    ];
  },
  SET_RANKLIST_MONTH(s, d) {
    s.rankListMonth = [...d.rankListMonth];
  },
  SET_RANKLIST_TOTAL(s, d) {
    s.rankListTotal = [...d.rankListTotal];
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
