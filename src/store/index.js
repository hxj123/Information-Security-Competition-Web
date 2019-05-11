import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		increment(state) {
			setTimeout(() => { console.log(1) }, 1000);
			console.log(2);
		}
	},
	getters: {
		count: state => {
			return state.count + 3;
		}
	},
	actions: {
		increment(context) {
			setTimeout(() => { console.log(1) }, 1000);
			console.log(2);
		}
	}
})