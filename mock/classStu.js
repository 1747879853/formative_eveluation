let arr;
var id = 0;
var maxid = 10;
let params;
let stuList = [{name: '1小王', id: '2016424732', startyear: '2016'}, {name: '1小红', id: '2016425732', startyear: '2016'}, {name: '1小蓝', id: '2016424732', startyear: '2016'}, {name: '1小绿', id: '2016424732', startyear: '2016'}, {name: '1小d', id: '2016334732', startyear: '2016'}];
let classList2 = [{name: '2小王', id: '2016424732', startyear: '2016'}, {name: '2小红', id: '2016425732', startyear: '2016'}, {name: '2小蓝', id: '2016424732', startyear: '2016'}, {name: '2小绿', id: '2016424732', startyear: '2016'}, {name: '2小d', id: '2016334732', startyear: '2016'}];
let classList3 = [{name: '3小王', id: '2016424732', startyear: '2016'}, {name: '3小红', id: '2016425732', startyear: '2016'}, {name: '3小蓝', id: '2016424732', startyear: '2016'}, {name: '3小绿', id: '2016424732', startyear: '2016'}, {name: '3小d', id: '2016334732', startyear: '2016'}];
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    // debugger
    switch (rtype) {
        case 'get':
            arr = stuList;
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
                name: params.name
            };
            break;
        case 'delete':
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                status: '离校'
            };
            break;
        default:
    }

    return arr;// 返回这个数组,也就是返回处理后的假数据
};

export default {
    path: '/classStu',
    data: list
};
