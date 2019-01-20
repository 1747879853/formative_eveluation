let arr;
var id = 0;
var maxid = 10;
let params;
let courseList=[{id:1,name:'英语1',status:'开课'},{id:2,name:'英语2',status:'开课'},{id:3,name:'英语3',status:'开课'},{id:4,name:'英语4',status:'开课'},{id:5,name:'英语5',status:'开课'}];
let courseList1=[{id:1,name:'英语1',status:'开课'},{id:2,name:'英语2',status:'开课'},{id:3,name:'英语3',status:'开课'}];
let courseList2=[{id:2,name:'英语2',status:'开课'},{id:3,name:'英语3',status:'开课'},{id:4,name:'英语4',status:'开课'}];
let courseList3=[{id:3,name:'英语3',status:'开课'},{id:4,name:'英语4',status:'开课'},{id:5,name:'英语5',status:'开课'}];
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    // debugger
    switch (rtype) {
        case 'get':
            arr = courseList;
            break;
        case 'post':
            id = maxid;
            maxid = maxid + 1;
            params = JSON.parse(options.body).params;
            arr = {
                id: id,
                name: params.name,
                status: '开课'
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
                status:'停课'
            };
            break;
        default:
    }

    return arr;// 返回这个数组,也就是返回处理后的假数据
};

export default {
    path: '/courseList',
    data: list
};
