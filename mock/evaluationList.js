let arr;
var id = 0;
var maxid = 10;
let params;
let evaluationList=[{id:1,name:'评价指标1',type:'input',status:1},
                    {id:2,name:'评价指标2',type:'input',status:1},
                    {id:3,name:'评价指标3',type:'option',status:1},
                    {id:4,name:'评价指标4',type:'input',status:1},
                    {id:5,name:'评价指标5',type:'option',status:1}];
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    // debugger
    switch (rtype) {
        case 'get':
            arr=evaluationList;
            break;
        case 'post':
            id = maxid;
            maxid = maxid + 1;
            params = JSON.parse(options.body).params;
            arr = {
                id: id,
                name: params.name,
                type: params.type,
                status: 1
            };
            break;
        case 'patch':
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                name: params.name,
                type: params.type,
            };
            break;
        case 'delete':
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                status:0
            };
            break;
        default:
    }

    return arr;// 返回这个数组,也就是返回处理后的假数据
};

export default {
    path: '/evaluationList',
    data: list
};
