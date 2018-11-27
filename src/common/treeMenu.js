export default{
    menu:[
        {
            firstMenu: "PC后台管理",
            link: "",
            icon:'el-icon-document',
            secondMenuList: [
                {
                    secondMenu: "用户管理",
                    link: "",
                    icon:'',
                    thirdMenuList:[
                        {
                            thirdMenu: "内部用户",
                            link: "/home/innerUser",
                            icon:'el-icon-document',
                        },
                        {
                            thirdMenu: "外部用户",
                            link: "/home/outerUser",
                            icon:'el-icon-document',
                        }
                    ]
                },
                {
                    secondMenu: "网站管理",
                    link: "",
                    icon:'',
                    thirdMenuList:[
                        {
                            thirdMenu: "频道管理",
                            link: "/home/channel",
                            icon:'el-icon-document',
                        },
                        {
                            thirdMenu: "展位管理",
                            link: "/home/stand",
                            icon:'el-icon-document',
                        },
                        {
                            thirdMenu: "文章管理",
                            link: "/home/article",
                            icon:'el-icon-document',
                        },
                        {
                            thirdMenu: "广告数据管理",
                            link: "/home/advert",
                            icon:'el-icon-document',
                        },
                        {
                            thirdMenu: "商城设置",
                            link: "/home/store",
                            icon:'el-icon-document',
                        },
                        {
                            thirdMenu: "支持城市管理",
                            link: "/home/city",
                            icon:'el-icon-document',
                        }
                    ]
                },  
                {
                    secondMenu: "权限管理",
                    link: "",
                    icon:'',
                    thirdMenuList:[
                        {
                            thirdMenu: "角色管理",
                            link: "/home/roleMgt",
                            icon:'el-icon-document',
                        },
                        {
                            thirdMenu: "权限管理",
                            link: "/home/permissionLis",
                            icon:'el-icon-document',
                        }
                    ]
                },              
                {
                    firstMenu: "PC客服管理",
                    link: "",
                    icon:'el-icon-service',
                    secondMenuList: [
                        {
                            secondMenu: "房源管理",
                            link: "",
                            icon:'',
                            thirdMenuList:[
                                {
                                    thirdMenu: "房源上传",
                                    link: "",
                                    icon:'el-icon-document',
                                },
                                {
                                    thirdMenu: "房源核实",
                                    link: "",
                                    icon:'el-icon-document',
                                }
                            ]
                        },
                    ]            
                }
            ]
        },
        {
            firstMenu: "",
            link: "",
            icon:'el-icon-document',
            secondMenuList: [
                {
                    secondMenu: "",
                    link: "",
                    icon:'',
                    thirdMenuList:[
                        {
                            thirdMenu: "",
                            link: "",
                            icon:'el-icon-document',
                        },
                        {
                            thirdMenu: "",
                            link: "",
                            icon:'el-icon-document',
                        }
                    ]
                },
            ]            
        }
    ]
}