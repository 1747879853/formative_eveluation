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
                    name: '车辆费',
                    children: [
                        {
                            id: '2',
                            name: '保养费',
                        },
                        {
                            id: '5',
                            name: '加油费',
                            children: [
                                {
                                    id: '6',
                                    name: '保险费',
                                    children: [],
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '3',
                    name: '邮电费',
                    children: [
                        {
                            id: '4',
                            name: '快递费',
                            children: []
                        }
                    ]
                }
            ];
            break;
        case 'post':// 添加
            id = maxid;
            maxid = maxid + 1;
            params = JSON.parse(options.body).params;
            arr = {
                id: id,
                name: params.name,
                children: []
            };
            break;
        case 'patch':// 修改
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                name: params.name,
            };
            break;
        case 'delete':// 删除
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
    path: '/costList',
    data: list
};
