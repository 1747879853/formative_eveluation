import Main from '@/views/Main.vue';
import Cookies from 'js-cookie';
// console.log(Cookies.get('user_agent'));
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '教学形成性评价系统 - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const padteam = {
    path: '/padteam',
    name: 'padteam',
    meta: {
        title: '班组'
    },
   component: () => import('@/views/production-manage/pad-order-team.vue')
};

// export const padicg = {
//     path: '/pad_input_class_grade',
//     name: 'pad_input_class_grade',
//     meta: {
//         title: '学生成绩录入'
//     },
//    component: () => import('@/views/input_class_grade/pad_input_class_grade.vue')
// };

export const padmaterial = {
    path: '/padmaterial',
    name: 'padmaterial',
    meta: {
        title: '领料'
    },
    component: () => import('@/views/production-manage/component/pad-material-requisition.vue')
};
export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'detailsHistogram', title: "教师活跃度详情", name: 'detailsHistogram', component: () => import('@/views/home/components/details_histogram') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/production-manage/component/order-info.vue') }, // 用于展示动态路由
        { path: 'work-shop-order-info/:work_shop_order_id', title: '工单详情', name: 'work-shop-order-info', component: () => import('@/views/production-manage/component/work-shop-order-info.vue') }, // 用于展示动态路由
        { path: 'material-requisition/:work_shop_team_order_id', title: '物料清单', name: 'material-requisition', component: () => import('@/views/production-manage/component/material-requisition.vue') }, // 用于展示动态路由

        { path: 'material-requisition-detail/:material_requisition_id', title: '生产领料单', name: 'material-requisition-detail', component: () => import('@/views/production-manage/component/material-requisition-detail.vue') }, // 用于展示动态路由

        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },
        { path: 'design-approval/:approval_id', title: '审批表单设计', name: 'design-approval', component: () => import('@/views/approval/design-approval.vue') },
        { path: 'approval-procedure/:approval_id', title: '审批流程', name: 'approval-procedure', component: () => import('@/views/approval/approval-procedure.vue') },
        { path: 'approval-new/:approval_id', title: '创建新审批', name: 'approval-new', component: () => import('@/views/my-approval/approval-new.vue') },
        { path: 'add-dailySummary', title: '填写工作日报', name: 'add-dailySummary', component: () => import('@/views/daily-summary/add-summary.vue') },
        { path: 'add-template/:work_order_id', title: '填写模板', name: 'add-template', component: () => import('@/views/production-manage/component/add_template.vue') },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
    //     ]
    // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
    //     ]
    // },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: () => import('@/views/international/international.vue') }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'scroll-bar',
    //             icon: 'android-upload',
    //             name: 'scroll-bar',
    //             title: '滚动条',
    //             component: () => import('@/views/my-components/scroll-bar/scroll-bar-page.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
    //         { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }

    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
    //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
    //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
    //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
    //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') }
    //     ]
    // },
    // {
    //     path: '/production-manage',
    //     icon: 'ios-infinite',
    //     name: 'production-manage',
    //     title: '生产管理',
    //     access:'production-manage/index',
    //     component: Main,
    //     children: [
    //         { path: 'order-manage', title: '订单', access:'production-manage/order-manage', name: 'order-manage', icon: 'link', component: () => import('@/views/production-manage/order-manage.vue') },
    //         { path: 'order-workshop', title: '组拼车间', access:'production-manage/order-workshop', name: 'order-workshop', icon: 'link', component: () => import('@/views/production-manage/order-workshop.vue') },
    //         // { path: 'tree-order-workshop', title: '下料车间', access:'production-manage/tree-order-workshop', name: 'tree-order-workshop', icon: 'link', component: () => import('@/views/production-manage/tree-order-workshop.vue') },
    //         { path: 'painting', title: '喷漆车间', access:'production-manage/painting', name: 'painting', icon: 'link', component: () => import('@/views/production-manage/painting.vue') },
    //         { path: 'tree-order-workshop1', title: '下料车间', access:'production-manage/tree-order-workshop1', name: 'tree-order-workshop1', icon: 'link', component: () => import('@/views/production-manage/tree-order-workshop1.vue') },
    //         // // { path: 'order-workshop-xialiao', title: '下料车间', access:'production-manage/order-workshop-xialiao', name: 'order-workshop-xialiao', icon: 'link', component: () => import('@/views/production-manage/order-workshop-xialiao.vue') },
    //
    //         { path: 'order-team', title: '班组', access:'production-manage/order-team', name: 'order-team', icon: 'link', component: () => import('@/views/production-manage/order-team.vue') },
    //         { path: 'quality-checking', title: '质检', access:'production-manage/quality-checking', name: 'quality-checking', icon: 'link', component: () => import('@/views/production-manage/quality-checking.vue') },
    //         { path: 'allot-process', title: '分配与进度', access:'production-manage/allot-process', name: 'allot-process', icon: 'link', component: () => import('@/views/production-manage/allot-process.vue') },
    //
    //         // { path: 'requisition-list', title: '领料单', name: 'requisition-list', icon: 'link', component: () => import('@/views/production-manage/requisition-list.vue') },
    //
    //
    //         // { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/production-manage/argument-page.vue') }
    //     ]
    // },
    // {
    //     path: '/approval',
    //     icon: 'key',
    //     name: 'approval',
    //     title: '审批管理',
    //     access:'approval/index',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '审批管理', access:'approval/index', name: 'approval_index', component: () => import('@/views/approval/approval.vue') }
    //     ]
    // },
    //
    // {
    //     path: '/my-approval',
    //     icon: 'key',
    //     name: 'myapproval',
    //     title: '审批',
    //     access:'my-approval/index',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '审批', access:'my-approval/index', name: 'my_approval', component: () => import('@/views/my-approval/my-approval.vue') }
    //     ]
    // } ,

    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // },
    {
        path: '/system-manage',
        icon: 'settings',
        name: 'system-manage',
        title: '系统管理',
        access:'system-manage/index',
        parent:'',
        component: Main,
        children: [
            {
                path: 'authority',
                icon: 'compose',
                name: 'authority',
                title: '权限管理',
                access:'system-manage/authority',
                parent:'system-manage/index',
                component: () => import('@/views/system-manage/authority-manage.vue')
            },
            {
                path: 'authority-groups',
                icon: 'pound',
                name: 'authority-groups',
                title: '权限组管理',
                access:'system-manage/authority-groups',
                parent:'system-manage/index',
                component: () => import('@/views/system-manage/authority-groups-manage.vue')
            },
            {
                path: 'user-authority-groups',
                icon: 'pound',
                name: 'user-authority-groups',
                title: '用户权限分配',
                access:'system-manage/user-authority-groups',
                parent:'system-manage/index',
                component: () => import('@/views/system-manage/user-authority-allocation.vue')
            },
            {
                path: 'menu-manage',
                icon: 'compose',
                name: 'menu-manage',
                title: '菜单管理',
                access:'system-manage/menu-manage',
                parent:'system-manage/index',
                component: () => import('@/views/system-manage/menu-manage.vue')
            },
        ]
    },
    // {
    //     path: '/region-manage',
    //     icon: 'settings',
    //     name: 'region-manage',
    //     title: {i18n: 't_region_manage'},
    //     access:'region-manage/index',
    //     parent:'',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'region',
    //             icon: 'compose',
    //             name: 'region',
    //             title: {i18n: 't_region'},
    //             access:'region-manage/region',
    //             parent:'region-manage/index',
    //             component: () => import('@/views/region-manage/region.vue')
    //         },
    //         {
    //             path: 'region-user',
    //             icon: 'pound',
    //             name: 'region-user',
    //             title: {i18n: 't_region_user'},
    //             access:'region-manage/region-user',
    //             parent:'region-manage/index',
    //             component: () => import('@/views/region-manage/region-user.vue')
    //         },
    //         {
    //             path: 'region-well-base',
    //             icon: 'pound',
    //             name: 'region-well-base',
    //             title: {i18n: 't_region_well_base'},
    //             access:'region-manage/region-well-base',
    //             parent:'region-manage/index',
    //             component: () => import('@/views/region-manage/region-well-base.vue')
    //         },
    //     ]
    // },
    // {
    //     path: '/single-well-manage',
    //     icon: 'settings',
    //     name: 'single-well-manage',
    //     title: '单井维护',
    //     access:'single-well-manage/index',
    //     parent:'',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'well-info',
    //             icon: 'compose',
    //             name: 'well-info',
    //             title: '单井资料',
    //             access:'single-well-manage/well-info',
    //             parent:'single-well-manage/index',
    //             component: () => import('@/views/single-well-manage/well-info.vue')
    //         },
    //         {
    //             path: 'std-wgraph',
    //             icon: 'pound',
    //             name: 'std-wgraph',
    //             title: '标准功图设置',
    //             access:'single-well-manage/std-wgraph',
    //             parent:'single-well-manage/index',
    //             component: () => import('@/views/single-well-manage/std-wgraph.vue')
    //         },
    //         {
    //             path: 'alarm-scope',
    //             icon: 'pound',
    //             name: 'alarm-scope',
    //             title: '报警范围设置',
    //             access:'single-well-manage/alarm-scope',
    //             parent:'single-well-manage/index',
    //             component: () => import('@/views/single-well-manage/alarm-scope.vue')
    //         },
    //     ]
    // },
    // {
    //     path: '/daily-summary',
    //     icon: 'settings',
    //     name: 'daily-summary',
    //     title: '日清日结',
    //     access:'daily-summary/index',
    //     component: Main,
    //     children: [
    //
    //         {
    //             path: 'daily-work',
    //             icon: 'compose',
    //             name: 'daily-work',
    //             title: '工作日报',
    //             access:'daily-summary/daily-work',
    //             component: () => import('@/views/daily-summary/daily-work.vue')
    //         },
    //         {
    //             path: 'query',
    //             icon: 'pound',
    //             name: 'query',
    //             title: '工作日报查询',
    //             access:'daily-summary/query',
    //             component: () => import('@/views/daily-summary/query.vue')
    //         },
    //         {
    //             path: 'evaluation',
    //             icon: 'pound',
    //             name: 'evaluation',
    //             title: '工作日报评价',
    //             access:'daily-summary/evaluation',
    //             component: () => import('@/views/daily-summary/evaluation.vue')
    //         },
    //         {
    //             path: 'job_item_content',
    //             icon: 'settings',
    //             name: 'job_item_content',
    //             title: '工作项-工作内容',
    //             access:'daily-summary/job_item_content',
    //             component: () => import('@/views/daily-summary/job_item_content.vue')
    //         },
    //         {
    //             path: 'cost',
    //             icon: 'compose',
    //             name: 'cost',
    //             title: '花费科目',
    //             access:'daily-summary/cost',
    //             component: () => import('@/views/daily-summary/cost.vue')
    //         },
    //     ]
    // },

    {
        path: '/users-manage',
        icon: 'settings',
        name: 'users-manage',
        title: '用户管理',
        access:'users-manage/index',
        component: Main,
        children: [
              {
                path: 'teacher',
                icon: 'compose',
                name: 'teacher',
                title: '教师信息管理',
                access:'users-manage/teacher',
                component: () => import('@/views/users-manage/teacher.vue')
            },
            // {
            //     path: 'student',
            //     icon: 'compose',
            //     name: 'student',
            //     title: '学生信息管理',
            //     access:'users-manage/student',
            //     component: () => import('@/views/users-manage/student.vue')
            // },
            // {
            //     path: 'organization',
            //     icon: 'compose',
            //     name: 'organization',
            //     title: '组织管理',
            //     access:'users-manage/organization',
            //     component: () => import('@/views/users-manage/organization.vue')
            // },
            // {
            //     path: 'workshop-maintenance',
            //     icon: 'compose',
            //     name: 'workshop-maintenance',
            //     title: '车间维护',
            //     access:'users-manage/workshop-maintenance',
            //     component: () => import('@/views/users-manage/workshop-maintenance.vue')
            // },
            // {
            //     path: 'workteam-maintenance',
            //     icon: 'compose',
            //     name: 'workteam-maintenance',
            //     title: '班组维护',
            //     access:'users-manage/workteam-maintenance',
            //     component: () => import('@/views/users-manage/workteam-maintenance.vue')
            // },
        ]
    },
    {
        path: '/input_class_grade',
        icon: 'settings',
        name: 'input_class_grade',
        title: '课堂成绩录入',
        access:'input_class_grade/index',
        component: Main,
        children: [
            { 
                path: 'input_student_grade', 
                title: '学生成绩录入',
                icon: 'compose',
                access:'input_class_grade/input_student_grade', 
                name: 'input_student_grade', 
                component: () => import('@/views/input_class_grade/input_class_grade.vue')
                
            },
            { 
                path: 'assign_homework', 
                title: '课程作业布置',
                icon: 'compose',
                access:'input_class_grade/assign_homework', 
                name: 'assign_homework', 
                component: () => import('@/views/input_class_grade/assign_homework.vue') 
            },
            { 
                path: 'immediate_evaluation', 
                title: '即时性评价',
                icon: 'compose',
                access:'input_class_grade/immediate_evaluation', 
                name: 'immediate_evaluation', 
                component: () => import('@/views/input_class_grade/immediate_evaluation.vue') 
            },
            { 
                path: 'output_grades', 
                title: '学生成绩导出',
                icon: 'compose',
                access:'input_class_grade/output_grades', 
                name: 'output_grades', 
                component: () => import('@/views/input_class_grade/output_grades.vue') 
            },
            { 
                path: 'Details_of_achievements', 
                title: '成绩详情',
                icon: 'compose',
                access:'input_class_grade/Details_of_achievements', 
                name: 'Details_of_achievements', 
                component: () => import('@/views/input_class_grade/Details_of_achievements.vue') 
            }
            // {
            //     path: 'pad_input_class_grade',                
            //     title: '平板-学生成绩录入',
            //     icon: 'compose',
            //     access:'input_class_grade/input_student_grade',
            //     name: 'pad_input_class_grade',
            //    component: () => import('@/views/input_class_grade/pad_input_class_grade.vue')
            // }
        ]
    },
    {
        path: '/student_grade',
        icon: 'key',
        name: 'student_grade',
        title: '学生成绩查看',
        access:'student_grade/index',
        component: Main,
        children: [
            { 
                path: 'check_grade', 
                title: '查看成绩', 
                icon: 'compose',
                access:'student_grade/check_grade', 
                name: 'check_grade', 
                component: () => import('@/views/student_grade/student_grade.vue') 
            },
            { 
                path: 'submit_homework', 
                title: '我的作业', 
                icon: 'compose',
                access:'student_grade/submit_homework', 
                name: 'submit_homework', 
                component: () => import('@/views/student_grade/submit_homework.vue') 
            },
        ]
    },
    {
        path: '/resource-manage',
        icon: 'settings',
        name: 'resource-manage',
        title: '教学资源管理',
        access:'resource-manage/index',
        component: Main,
        children: [
              {
                path: 'class',
                icon: 'compose',
                name: 'class',
                title: '班级管理',
                access:'resource-manage/class',
                component: () => import('@/views/resource-manage/class.vue')
            },
            {
                path: 'class-student',
                icon: 'compose',
                name: 'class-student',
                title: '班级-学生管理',
                access:'resource-manage/class-student',
                component: () => import('@/views/resource-manage/class-student-manage.vue')
            },
            {
                path: 'course',
                icon: 'compose',
                name: 'course',
                title: '课程管理',
                access:'resource-manage/course',
                component: () => import('@/views/resource-manage/course.vue')
            },
            // {
            //     path: 'evaluation1',
            //     icon: 'compose',
            //     name: 'evaluation1',
            //     title: '评价指标',
            //     access:'resource-manage/evaluation',
            //     component: () => import('@/views/resource-manage/evaluation.vue')
            // },
            {
                path: 'evaluation',
                icon: 'compose',
                name: 'evaluation',
                title: '评价指标管理',
                access:'resource-manage/evaluation',
                component: () => import('@/views/resource-manage/evaluation-manage.vue')
            },
            // {
            //     path: 'class-course',
            //     icon: 'compose',
            //     name: 'class-course',
            //     title: '班级课程分配',
            //     access:'resource-manage/class-course',
            //     component: () => import('@/views/resource-manage/class-course-allocation.vue')
            // },
            {
                path: 'course-evaluation',
                icon: 'compose',
                name: 'course-evaluation',
                title: '课程评价指标权重分配',
                access:'resource-manage/course-evaluation',
                component: () => import('@/views/resource-manage/course-evaluation-allocation.vue')
            },
            // {
            //     path: 'teacher-course',
            //     icon: 'compose',
            //     name: 'teacher-course',
            //     title: '教师课程分配',
            //     access:'resource-manage/teacher-course',
            //     component: () => import('@/views/resource-manage/teacher-course-allocation.vue')
            // },
            {
                path: 'teacher-class-course',
                icon: 'compose',
                name: 'teacher-class-course',
                title: '教师班级课程管理',
                access:'resource-manage/teacher-class-course',
                component: () => import('@/views/resource-manage/teacher-class-course.vue')
            },
            {
                
                path: 'term',
                icon: 'compose',
                name: 'term-manage',
                title: '学期管理',
                access:'resource-manage/term-manage',
                component: () => import('@/views/resource-manage/term-manage.vue')
            },
            {
                path: 'upload-student-template',
                icon: 'compose',
                name: 'upload-student-template',
                title: '学生信息模板上传',
                access:'resource-manage/upload-student-template',
                component: () => import('@/views/resource-manage/upload-student-template.vue')
            },
        ]
    },
    // {
    //     path: '/employee-information',
    //     icon: 'settings',
    //     name: 'employee-name',
    //     title: '员工信息',
    //     access:'employee-information/index',
    //     component: Main,
    //     children: [
    //           {
    //             path: 'attendance-record',
    //             icon: 'compose',
    //             name: 'attendance-record',
    //             title: '考勤记录',
    //             access:'employee-information/attendance-record',
    //             component: () => import('@/views/employee-information/attendance-record.vue')
    //         },
    //     ]
    // },
    //  {
    //     path: '/vehicle-manage',
    //     icon: 'settings',
    //     name: 'vehicle-manage',
    //     title: '车辆管理',
    //     access:'vehicle-manage/index',
    //     component: Main,
    //     children: [
    //           {
    //             path: 'vehicle-comeandgo-identify',
    //             icon: 'compose',
    //             name: 'vehicle-comeandgo-identify',
    //             title: '车辆进出识别',
    //             access:'vehicle-manage/vehicle-comeandgo-identify',
    //             component: () => import('@/views/vehicle-manage/vehicle-comeandgo-identify.vue')
    //         },
    //     ]
    // },
    // {
    //     path: '/error-/page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    padteam,
    // padicg,
    padmaterial,
    ...appRouter,
    page500,
    page403,
    page404

];
