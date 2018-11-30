import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'

import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import qs from 'qs';
import zh from '@/common/lang/zh'
import en from '@/common/lang/en';
import './assets/scss/main.scss'

Vue.use(ElementUI, { locale });

Vue.use(VueI18n);

// 图片懒加载

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
	error: require('./assets/images/placeholder.png'),
})


const i18n = new VueI18n({
	locale: 'en',//default lang
	messages: {
		'zh': zh,
		'en': en
	}

});


// 引入全局filter
import filters from './common/filter';
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})


//axios添加请求,响应拦截器
axios.interceptors.request.use(config => {
	//TODO 配合服务端做无状态验证的时候 处理接口权限问题
	if (config.url != '/api/login') {
		//在请求头添加数据 或者其它的处理
		config.headers.auth = 'CDGHKFDSHKFGBSDHBFHWMKGBFSGHKGHKGBHK';
	}
	return config;
}, error =>{
	return Promise.reject(error)
});

axios.interceptors.response.use(
	response => {
		// response.data.result === 0 || response.data.result === 1002 ? Promise.resolve(response.data) : Promise.reject(response.data)
		if( response.data.result === 1001 ){
			router.push('/login');	
			return Promise.reject(response.data);
		}else if( response.data.result === 0 || response.data.result === 1002){	//正常状态码
			return Promise.resolve(response.data);
		}else{
			return Promise.reject(response.data);
		}	
		
	}, error =>{
		return Promise.reject(error)	
	} 
);
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$Loading = Loading;

Vue.config.productionTip = false

//定义路由守卫 处理登陆跳转问题
router.beforeEach((to, from, next) => {
	//console.log('router gard...',to);
	if (to.meta.requireAuth) { //需要登录
		if (sessionStorage.getItem('accessToken')) { //已登录
			next();
		} else { //未登陆->首页
			next({
				name: 'login'
			});
		}
	} else { //无需登录
		next();
	}

	if (to.name == 'login') {
		if (localStorage.getItem('store')) {
			localStorage.removeItem('store');
		}
	}

});

router.afterEach((to, from) => {
	//TODO 可以结合beforeEach做 路由切换的loading 效果,loading控制的变量可以放在store中
	/** 
	 *  store.commit('updateLoadingStatus', {isLoading: false})
	 */
});

var vm = new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')
