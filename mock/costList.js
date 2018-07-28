let arr;
var id = 0;
var maxid = 10;
let params;
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    // debugger
    switch (rtype) {
        case 'get':
            arr = [
                {
                    id: '1',
                    title: '车辆费1',
                    children: [
                        {
                            id: '2',
                            title: '保养费2',
                            children:[],
                            expand:true,
                        },
                        {
                            id: '5',
                            title: '加油费5',
                            children: [
                                {
                                    id: '6',
                                    title: '保险费6',
                                    children: [],
                                    expand:true,
                                }
                            ],
                            expand:true,
                        }
                    ],
                    expand:true,
                }
            ];
            break;
        case 'post':// 添加
            id = maxid;
            maxid = maxid + 1;
            params = JSON.parse(options.body).params;
            arr = {
                id: id,
                title: params.title,
                children: []
            };
            break;
        case 'patch':// 修改
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                title: params.title,
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
