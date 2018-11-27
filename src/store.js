import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingState: false,
    permission:[],
    permissionList:[],
    add:null, //新增
    detail:null,//查看
    update:null,//更新
    delete:null,//删除
    routePath:null,
    routeIndex:[]
  },
  getters:{ //取值
    getPermission(state){
        if(state.permission.length==0){
          state = JSON.parse(localStorage.getItem('store')) 
        }
        return state.permission;
    },
    getPermissionList(state){
      if(state.permissionList.length==0){
        state = JSON.parse(localStorage.getItem('store')) 
      }
      return state.permissionList;
    },
    getRoutePath(state){
      return state.routePath;
    },
    getRouteIndex(state){
      return state.routeIndex;
    }
},
  mutations: {
    setLoadingState(state, isLoading) {
      console.log('state:::',isLoading)
      state.loadingState = isLoading;
    },
    getPermission(state,arr){ //存选中的路径对应的四级
      state.permission  = arr;
    },
    getPermissionList(state,arr){ //存入权限列表
      state.permissionList = arr;
    },
    getpermissionCode(state,str){
      if(str==null){
        state['add'] = false;
        state['detail'] = false;
        state['update'] = false;
        state['delete'] = false;
      }else{
        state[str] = true;
      }
    },
    syncRoutePath(state,str){
      state.routePath = str;
    },
    syncRouteIndex(state,arr){
      state.routeIndex = arr;
    }
  },
  actions: {
    addPermission(context,arr){
      context.commit('getPermission',arr);
    },
    addpermissionList(context,arr){
      context.commit('getPermissionList',arr);
    },
    setpermissionCode(context,str){  //根据permissionCode设置页面权限
      context.commit('getpermissionCode',str);
    },
    setRoutePath(context,str){  //保存左侧菜单要展示的第一条路径；
      context.commit('syncRoutePath',str);
    },
    setLoading(context,str){ //全局loading
      context.commit('setLoadingState',str);
    },
    setRouteIndex(context,arr){  //当前打开的 sub-menu 的 index 的数组
      context.commit('syncRouteIndex',arr);
    },
  }
})
