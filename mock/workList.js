//工作日结
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
                    date: '2018.01.01',
                    address: '工作地点',
                    workcontent: '工作内容',
                    transport: '交通工具',
                    explain: '说明',
                    children:[{
                        name: '花费科目',
                        thing: '具体事由',
                        money: '100',
                    },{
                        name: '花费科目',
                        thing: '具体事由',
                        money: '100',
                    },
                    ]     
                },
               
            ];
            break;
        case 'post':// 添加
            id = maxid;
            maxid = maxid + 1;
            // debugger
            params = JSON.parse(options.body).params;
            arr = {
                date: params.date,
                address: params.address,
                workcontent: params.workcontent,
                transport: params.transport,
                explain: params.explain,
                children: params.children
            };
            break;
        case 'patch':// 修改
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                date: params.date,
                address: params.address,
                workcontent: params.workcontent,
                transport: params.transport,
                explain: params.explain,
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
    path: '/workList',
    data: list
};
