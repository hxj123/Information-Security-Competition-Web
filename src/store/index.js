import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		url: 'http://192.168.43.156:8080/',
		webId: 'huang131740',
		password: 'tsx1317490530',
		email: '1317490530@qq.com',
		phone: '17789930029'
	},
	mutations: {
		setWebId(state, data){
			state.webId = data;
		},
		setPassword(state, data){
			state.password = data;
		},
		setEamil(state, data){
			state.email = data;
		},
		setPhone(state, data){
			state.phone = data;
		}
	},
})