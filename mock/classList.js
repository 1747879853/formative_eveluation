let arr;
var id = 0;
var maxid = 10;
let params;
let classList=[{id:1,name:'1班',status:'在校'},{id:2,name:'2班',status:'在校'},{id:3,name:'3班',status:'在校'},{id:4,name:'4班',status:'在校'},{id:5,name:'5班',status:'在校'}];
let classList1=[{id:1,name:'1班',status:'在校'},{id:2,name:'2班',status:'在校'},{id:3,name:'3班',status:'在校'}];
let classList2=[{id:2,name:'2班',status:'在校'},{id:3,name:'3班',status:'在校'},{id:4,name:'4班',status:'在校'}];
let classList3=[{id:3,name:'3班',status:'在校'},{id:4,name:'4班',status:'在校'},{id:5,name:'5班',status:'在校'}];
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    // debugger
    switch (rtype) {
        case 'get':
            arr=classList;
            break;
        case 'post':
            id = maxid;
            maxid = maxid + 1;
            params = JSON.parse(options.body).params;
            arr = {
                id: id,
                name: params.name,
                status: '在校'
            };
            break;
        case 'patch':
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                name: params.name,
            };
            break;
        case 'delete':
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                status:'离校'
            };
            break;
        default:
    }

    return arr;// 返回这个数组,也就是返回处理后的假数据
};

export default {
    path: '/classList',
    data: list
};
