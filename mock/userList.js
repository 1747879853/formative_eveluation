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
                        'id': 4,
                        'name': '@cname',
                        'user_name': '@cname',
                        'user_tel': '@natural',
                        'status': '在职',
                        operation: 'edit,delete'
                    },
                    {
                        'id': 5,
                        'name': '@cname',
                        'user_name': '@cname',
                        'user_tel': '@natural',
                        'status': '在职',
                        operation: 'edit,delete'
                    },
                    {
                        'id': 6,
                       'name': '@cname',
                        'user_name': '@cname',
                        'user_tel': '@natural',
                        'status': '在职',
                        operation: 'edit,delete'
                    },
            ]
            break;
        case 'post':// 添加新权限
            id = maxid;
            maxid = maxid + 1;
            params = JSON.parse(options.body).params;
            arr = {
                id: id,
                name: params.name,
                user_name: params.user_name,
                user_tel: params.user_tel,
                status: '在职'
            };
            break;
        case 'patch':// 修改权限
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                name: params.name,
                user_name: params.user_name,
                user_tel: params.user_tel,
            };
            break;
        case 'delete':// 删除权限
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                status:'离职'
            };
            break;
        default:
    }

    return arr;// 返回这个数组,也就是返回处理后的假数据
};

export default {
    path: '/userList',
    data: list
}
