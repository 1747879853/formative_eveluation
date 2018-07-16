let arr;
var id = 0;
var maxid = 10;
let params;
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    switch (rtype) {
        case 'get':
            arr = [
                {
                    id: '1',
                    authority: 'Admin/Index/index',
                    name: '后台首页',
                    condition: '111',
                    status: '激活',
                    children: [
                        {
                            id: '2',
                            authority: 'Admin/Index/welcome',
                            name: '欢迎页面',
                            condition: '222',
                            status: '激活',
                            children: [{
                                id: '5',
                                authority: 'Admin/Index/welcome',
                                name: '欢迎页面',
                                condition: '222',
                                status: '激活',
                                children: []
                            }]
                        },
                        {
                            id: '6',
                            authority: 'Admin/Index/welcome',
                            name: '欢迎页面',
                            condition: '222',
                            status: '激活',
                            children: []
                        }
                    ]
                },
                {
                    id: '3',
                    authority: 'Manufacturing/Index/index',
                    name: '生产首页',
                    condition: '333',
                    status: '激活',
                    children: [
                        {
                            id: '4',
                            authority: 'Manufacturing/Index/bom',
                            name: '物料清单',
                            condition: '444',
                            status: '激活',
                            children: []
                        }
                    ]
                }
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
                authority: params.v2,
                name: params.v1,
                condition: params.v3,
                status: params.v4
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
