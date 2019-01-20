let arr;
var id = 0;
var maxid = 10;
let params;
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    switch (rtype) {
        case 'get':
            arr = [{"id":31,"name":"laoshi1","user_tel":15166666666,"user_name":"laoshi1","checked_id":[4],"status":"在职","operation":"edit,delete"},
{"id":32,"name":"laoshi2","user_tel":15166666666,"user_name":"laoshi2","checked_id":[4],"status":"在职","operation":"edit,delete"},
{"id":33,"name":"laoshi3","user_tel":15166666666,"user_name":"laoshi3","checked_id":[4],"status":"在职","operation":"edit,delete"},
{"id":34,"name":"admin","user_tel":15166666666,"user_name":"admin","checked_id":[5],"status":"在职","operation":"edit,delete"},
{"id":35,"name":"dev","user_tel":15166666666,"user_name":"dev","checked_id":[5],"status":"在职","operation":"edit,delete"},]
            break;
        case 'post':
            id = maxid;
            maxid = maxid + 1;
            params = JSON.parse(options.body).params;
            arr = {
                id: id,
                name: params.email,
                user_name: params.username,
                user_tel: params.tel,
                status: '在职'
            };
            break;
        case 'patch':
            params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                name: params.email,
                user_name: params.username,
                user_tel: params.tel,
            };
            break;
        case 'delete':
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
    path: '/teacherList',
    data: list
}
