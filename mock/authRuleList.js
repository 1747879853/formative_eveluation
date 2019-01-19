let arr;
var id = 0;
var maxid = 10;
let params;
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    switch (rtype) {
        case 'get':
            arr = [{"id":59,"title":"后台首页","name":"后台首页","authority":"Admin/index","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
{"id":67,"title":"系统管理","name":"系统管理","authority":"system-manage/index","condition":null,"status":"激活","expand":true,"checked":false,
    "children":[{"id":68,"title":"权限管理","name":"权限管理","authority":"system-manage/authority","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
        {"id":69,"title":"权限组管理","name":"权限组管理","authority":"system-manage/authority-groups","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
        {"id":70,"title":"用户权限分配","name":"用户权限分配","authority":"system-manage/user-authority-groups","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
        {"id":71,"title":"菜单管理","name":"菜单管理","authority":"system-manage/menu-manage","condition":null,"status":"激活","expand":true,"checked":false,"children":[]}]
},
{"id":75,"title":"用户管理","name":"用户管理","authority":"users-manage/index","condition":null,"status":"激活","expand":true,"checked":false,
    "children":[{"id":76,"title":"用户","name":"用户","authority":"users-manage/user","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
        {"id":77,"title":"组织管理","name":"组织管理","authority":"users-manage/organization","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
        ]
},{"id":1,"title":"课堂成绩录入","name":"课堂成绩录入","authority":"input_class_grade/index","condition":null,"status":"激活","expand":true,"checked":false,"children":[]}
];
            break;
        case 'post':// 添加新权限
            id = maxid;
            maxid = maxid + 1;
            params = JSON.parse(options.body).params;
            arr = {
                id: id,
                authority: params.authority,
                name: params.name,
                condition: params.condition,
                status: params.status,
                children: []
            };
            break;
        case 'patch':// 修改权限
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                authority: params.authority,
                name: params.name,
                condition: params.condition,
                status: params.status,
            };
            break;
        case 'delete':// 删除权限
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id
            };
            break;
        default:
    }

    return arr;// 返回这个数组,也就是返回处理后的假数据
};

export default {
    path: '/authRuleList',
    data: list
};
