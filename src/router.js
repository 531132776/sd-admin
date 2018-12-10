import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: "current_link",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      meta: { requireAuth: true },
      redirect: { name: 'innerUser' },
      children: [
        /**PC后台管理*/
        {/**平台用户管理-内部用户列表*/
          path: 'innerUser',
          name: 'innerUser',
          component: () => import('./views/backStage/inner-user-list.vue'),
          meta: { requireAuth: true },
        },
        {/**平台用户管理-外部用户列表*/
          path: 'outerUser',
          name: 'outerUser',
          component: () => import('./views/backStage/outer-user-list.vue'),
          meta: { requireAuth: true },
        },
        {/**平台用户管理-外部用户列表-详情*/
          path: 'outerUserDetail/:id',
          name: 'outerUserDetail',
          component: () => import('./views/backStage/outer-user-detail.vue'),
          meta: { requireAuth: true },
        },
        {/**后台管理-角色管理*/
          path: 'roleMgt',
          name: 'roleMgt',
          component: () => import('./views/backStage/roleMgt.vue'),
          meta: { requireAuth: true },
        },
        {/**后台管理-角色管理-详情*/
          path: 'roleDetail/:id',
          name: 'roleDetail',
          component: () => import('./views/backStage/roleDetail.vue'),
          meta: { requireAuth: true },
        },
        {/**后台管理-资源管理*/
          path: 'permissionList',
          name: 'permissionList',
          component: () => import('./views/backStage/permissionList.vue'),
          meta: { requireAuth: true },
        },
        {/**后台管理-资源管理-详情*/
          path: 'permissionDetail/:id',
          name: 'permissionDetail',
          component: () => import('./views/backStage/permissionDetail.vue'),
          meta: { requireAuth: true },
        },
        // 
        {/**网站管理-频道管理*/
          path: 'channel',
          name: 'channel',
          component: () => import('./views/backStage/channel.vue'),
          meta: { requireAuth: true },
        },
        {/**网站管理-展位管理*/
          path: 'stand',
          name: 'stand',
          component: () => import('./views/backStage/stand.vue'),
          meta: { requireAuth: true },
        },
        {/**网站管理-文章管理*/
          path: 'article',
          name: 'article',
          component: () => import('./views/backStage/article.vue'),
          meta: { requireAuth: true },
        },
        {/**网站管理-广告数据管理*/
          path: 'advert',
          name: 'advert',
          component: () => import('./views/backStage/advert.vue'),
          meta: { requireAuth: true },
        },
        {/**网站管理-商城设置*/
          path: 'store',
          name: 'store',
          component: () => import('./views/backStage/store.vue'),
          meta: { requireAuth: true },
        },
        {/**网站管理-支持城市管理*/
          path: 'city',
          name: 'city',
          component: () => import('./views/backStage/city.vue'),
          meta: { requireAuth: true },
        },
        // {/**权限管理-用户列表*/
        //   path: 'admins',
        //   name: 'admins',
        //   component: () => import('./views/backStage/admin-list.vue'),
        //   meta: { requireAuth: true },
        // },
        {/**权限管理-角色管理*/
          path: 'role',
          name: 'role',
          component: () => import('./views/backStage/role.vue'),
          meta: { requireAuth: true },
        },
        {/**权限管理-资源管理*/
          path: 'resource',
          name: 'resource',
          component: () => import('./views/backStage/resource.vue'),
          meta: { requireAuth: true },
        },
        {/**开发商录入*/
          path: 'developerEntry',
          name: 'developerEntry',
          component: () => import('./views/backStage/developerEntry.vue'),
          meta: { requireAuth: true },
        },
        /**PC客服管理*/
        {/**房源管理-房源上传*/
          path: 'houseUpLoad',
          name: 'houseUpLoad',
          component: () => import('./views/customer/house-upload.vue'),
          meta: { requireAuth: true },
        },
        {/**房源管理-房源核实*/
          path: 'houseaudit',
          name: 'houseaudit',
          component: () => import('./views/customer/house-audit.vue'),
          meta: { requireAuth: true },
        },
        {/**房源管理-房源初审*/
          path: 'trialhouse/:id',
          name: 'trialhouse',
          props: true,
          component: () => import('./views/customer/trial-house.vue'),
          meta: { requireAuth: true },
        },
        {/**房源管理-房源终审*/
          path: 'finalhouse/:id',
          name: 'finalhouse',
          props: true,
          component: () => import('./views/customer/final-house.vue'),
          meta: { requireAuth: true },
        },
         {/**房源管理-客服上传*/
          path: 'uploadHouse/:memberId',
          name: 'uploadHouse',
          props: true,
          component: () => import('./views/customer/upload-house.vue'),
          meta: { requireAuth: true },
        },
        {/**房源管理-外获上传*/
          path: 'outsideUpload',
          name: 'outsideUpload',
          props: true,
          component: () => import('./views/customer/outside-upload.vue'),
          meta: { requireAuth: true },
        },
         {/**房源管理-外获上传-编辑*/
          path: 'outsideEdit/:id',
          name: 'outsideEdit',
          props: true,
          component: () => import('./views/customer/outside-edit.vue'),
          meta: { requireAuth: true },
        },
        {/**客服接单-投诉列表 */
          path: 'complain',
          name: 'complain',
          props: true,
          component: () => import('./views/customer/customer-complain.vue'),
          meta: { requireAuth: true },
        },
        {/**客服接单-投诉详情 */
          path: 'complainDetail/:code',
          name: 'complainDetail',
          props: true,
          component: () => import('./views/customer/customer-complain-detail.vue'),
          meta: { requireAuth: true },
        },
        {/**客服接单-反馈列表 */
          path: 'feedback',
          name: 'feedback',
          props: true,
          component: () => import('./views/customer/customer-feedback.vue'),
          meta: { requireAuth: true },
        }, 
        {/**客服接单-反馈详情 */
          path: 'feedbackDetail/:id',
          name: 'feedbackDetail',
          props: true,
          component: () => import('./views/customer/customer-feedback-detail.vue'),
          meta: { requireAuth: true },
        },  
        {/**客服接单-下架列表 */
          path: 'withdraw',
          name: 'withdraw',
          props: true,
          component: () => import('./views/customer/customer-withdraw.vue'),
          meta: { requireAuth: true },
        },
        {/**客服接单-下架详情 */
          path: 'withdrawDetail/:id',
          name: 'withdrawDetail',
          props: true,
          component: () => import('./views/customer/customer-withdraw-detail.vue'),
          meta: { requireAuth: true },
        },
        {/**客服接单-预约看房 */
          path: 'appoint',
          name: 'appoint',
          props: true,
          component: () => import('./views/customer/appoint.vue'),
          meta: { requireAuth: true },
        },
        {/**客服接单-订单搜索 */
          path: 'order',
          name: 'order',
          props: true,
          component: () => import('./views/customer/order.vue'),
          meta: { requireAuth: true },
        },
        {/**修改合同-合同列表 */
          path: 'contract',
          name: 'contract',
          props: true,
          component: () => import('./views/customer/contract.vue'),
          meta: { requireAuth: true },
        },
        {/**修改合同-合同详情-出租 */
          path: 'contractDetail_rent/:id',
          name: 'contractDetail_rent',
          props: true,
          component: () => import('./views/customer/contractDetail_rent.vue'),
          meta: { requireAuth: true },
        },
        {/**修改合同-合同详情-出售 */
          path: 'contractDetail_sale/:id',
          name: 'contractDetail_sale',
          props: true,
          component: () => import('./views/customer/contractDetail_sale.vue'),
          meta: { requireAuth: true },
        },
        {/**下架搜索 */
          path: 'withdrawSearch',
          name: 'withdrawSearch',
          component: () => import('./views/customer/withdraw-list.vue'),
          meta: { requireAuth: true },
        },//
         {/**下架搜索 */
          path: 'withdrawHouse/:id',
          name: 'withdrawHouse',
          props:true,
          component: () => import('./views/customer/withdraw-search-detail.vue'),
          meta: { requireAuth: true },
        },
        {/**个人中心 */
          path: 'personalCenter/:type',
          name: 'personalCenter',
          props: true,
          component: () => import('./views/personalCenter/personal_center.vue'),
          meta: { requireAuth: true },
        },
        {/**个人中心-关单记录列表 */
          path: 'personal_close_list/:type',
          name: 'personal_close_list',
          props: true,
          component: () => import('./views/personalCenter/personal_close_list.vue'),
          meta: { requireAuth: true },
        },
        {/**个人中心-关单记录-详情 */
          path: 'personal_close/:id',
          name: 'personal_close',
          props: true,
          component: () => import('./views/personalCenter/personal_close.vue'),
          meta: { requireAuth: true },
        },
        ,
        {/**个人中心-关单记录-反馈详情 */
          path: 'personal_close_feedback/:id',
          name: 'personal_close_feedback',
          props: true,
          component: () => import('./views/personalCenter/personal_close_feedback.vue'),
          meta: { requireAuth: true },
        },
        {/**个人中心-成单结佣记录-列表 */
          path: 'personal_commission_list/:id',
          name: 'personal_commission_list',
          props: true,
          component: () => import('./views/personalCenter/commission_list.vue'),
          meta: { requireAuth: true },
        },
        {/**个人中心-成单结佣记录-详情 */
          path: 'personal_commission/:id',
          name: 'personal_commission',
          props: true,
          component: () => import('./views/personalCenter/commission_detail.vue'),
          meta: { requireAuth: true },
        },
        {/**个人中心-考勤 */
          path: 'personal_schedule/:id',
          name: 'personal_schedule',
          props: true,
          component: () => import('./views/personalCenter/personal_schedule.vue'),
          meta: { requireAuth: true },
        },
        // {/**个人中心-主管排班 */
        //   path: 'personal_schedule/:id',
        //   name: 'personal_schedule',
        //   props: true,
        //   component: () => import('./views/personalCenter/personal_schedule.vue'),
        //   meta: { requireAuth: true },
        // },
        
        /**PC内勤------------------------------------------ */
        {/**线上出租 */
          path:'onlineRental',
          name:'onlineRental',
          component:()=>import('./views/backOffice/online-rental.vue'),
          meta: { requireAuth: true }
        },
        {/**线上出售 */
          path:'onlineSale',
          name:'onlineSale',
          component:()=>import('./views/backOffice/online-sale.vue'),
          meta: { requireAuth: true }
        },
        {/**线上出售-出售详情 */
          path:'editProgress/:orderId',
          name:'editProgress',
          props:true,
          component:()=>import('./views/backOffice/edit-progress.vue'),
          meta: { requireAuth: true }
        },
        {/**退款审批 */
          path:'refundApproval',
          name:'refundApproval',
          component:()=>import('./views/backOffice/refund-approval.vue'),
          meta: { requireAuth: true }
        },
         {/**退款审批-编辑 */
          path:'refundApprovalEdit/:refundId',
          name:'refundApprovalEdit',
          props:true,
          component:()=>import('./views/backOffice/refund-approval-edit.vue'),
          meta: { requireAuth: true }
        },
        {/**金融借贷 */
          path:'financialBorrowing',
          name:'financialBorrowing',
          component:()=>import('./views/backOffice/financial-borrowing.vue'),
          meta: { requireAuth: true }
        },
        {/**金融借贷-详情 */
          path:'borrowingDetail/:id',
          name:'borrowingDetail',
          props:true,
          component:()=>import('./views/backOffice/financial-borrowing-detail.vue'),
          meta: { requireAuth: true }
        },
        {/**开发商直售 */
          path:'developerSale',
          name:'developerSale',
          component:()=>import('./views/backOffice/developer-sale.vue'),
          meta: { requireAuth: true }
        },
        {/**开发商直售-详情 */
          path:'developerSaleDetail/:id',
          name:'developerSaleDetail',
          props:true,
          component:()=>import('./views/backOffice/developer-sale-detail.vue'),
          meta: { requireAuth: true }
        },
        {/**投诉 */
          path:'internalComplain',
          name:'internalComplain',
          props:true,
          component:()=>import('./views/backOffice/complain.vue'),
          meta: { requireAuth: true }
        },
        {/**投诉-详情 */
          path:'internalComplainDetail/:code',
          name:'internalComplainDetail',
          props:true,
          component:()=>import('./views/backOffice/complain-detail.vue'),
          meta: { requireAuth: true }
        },
        {/**合同列表  type=0-客服合同，type=1-内勤合同 */
          path:'contractList/:type',
          name:'contractList',
          props:true,
          component:()=>import('./views/backOffice/contractList.vue'),
          meta: { requireAuth: true }
        },
        {/**合同列表 */
          path:'back_contractDetail_rent',
          name:'back_contractDetail_rent',
          props:true,
          component:()=>import('./views/backOffice/contractDetail_rent.vue'),
          meta: { requireAuth: true }
        },
        {/**合同列表 */
          path:'back_contractDetail_sale',
          name:'back_contractDetail_sale',
          props:true,
          component:()=>import('./views/backOffice/contractDetail_sale.vue'),
          meta: { requireAuth: true }
        },
        /**PC财务管理----------------------------------------*/
        {/**线上所有服务费 */
          path: 'transactionList',
          name: 'transactionList',
          props: true,
          component: () => import('./views/finance/transaction_list.vue'),
          meta: { requireAuth: true },
        },
        {/**线上所有服务费-详情 */
          path: 'transactionDetail/:id',
          name: 'transactionDetail',
          props: true,
          component: () => import('./views/finance/transaction_detail.vue'),
          meta: { requireAuth: true },
        },
        {/**最终成交结佣列表 */
          path: 'commissionList',
          name: 'commissionList',
          props: true,
          component: () => import('./views/finance/commission_list.vue'),
          meta: { requireAuth: true },
        },
        {/**最终成交结佣列表-详情 */
          path: 'commissionDetail/:id',
          name: 'commissionDetail',
          props: true,
          component: () => import('./views/finance/commission_detail.vue'),
          meta: { requireAuth: true },
        },
        {/**退款列表 */
          path: 'refundList',
          name: 'refundList',
          props: true,
          component: () => import('./views/finance/refund_lis.vue'),
          meta: { requireAuth: true },
        },
        {/**退款列表 -详情*/
          path: 'refundDetail/:id',
          name: 'refundDetail',
          props: true,
          component: () => import('./views/finance/refund_detail.vue'),
          meta: { requireAuth: true },
        },
        {/**投诉*/
          path: 'financeComplain',
          name: 'financeComplain',
          props: true,
          component: () => import('./views/finance/finance-complain.vue'),
          meta: { requireAuth: true },
        },
        {/**投诉*/
          path: 'test',
          name: 'test',
          props: true,
          component: () => import('./views/test.vue'),
          meta: { requireAuth: true },
        },
      ]
    },
    {//找不到url路径重定向到登陆，
      path: '*',
      name: 'notFind',
      redirect: '/login'
    }
  ]
})
