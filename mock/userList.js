let arr;
var id = 0;
var maxid = 10;
let params;
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    switch (rtype) {
        case 'get':
            arr = [{"id":28,"name":"dev@welltek.com","user_tel":null,"user_name":"dev","checked_id":[6],"status":"在职","operation":"edit,delete"},
{"id":29,"name":"supermessi@welltek.com","user_tel":null,"user_name":"supermessi","checked_id":[1],"status":"在职","operation":"edit,delete"},
{"id":30,"name":"xialiaozhuren1","user_tel":null,"user_name":"xialiaozhuren1","checked_id":[4],"status":"在职","operation":"edit,delete"},
{"id":31,"name":"xialiaozhuren2","user_tel":null,"user_name":"xialiaozhuren2","checked_id":[4],"status":"在职","operation":"edit,delete"},
{"id":32,"name":"zupinzhuren1","user_tel":null,"user_name":"zupinzhuren1","checked_id":[4],"status":"在职","operation":"edit,delete"},
{"id":33,"name":"zupinzhuren2","user_tel":null,"user_name":"zupinzhuren2","checked_id":[4],"status":"在职","operation":"edit,delete"},
{"id":34,"name":"xialiaobanzhuren1","user_tel":null,"user_name":"xialiaobanzhuren1","checked_id":[5],"status":"在职","operation":"edit,delete"},
{"id":35,"name":"xialiaobanzhuren2","user_tel":null,"user_name":"xialiaobanzhuren2","checked_id":[5],"status":"在职","operation":"edit,delete"},
{"id":36,"name":"zupinbanzhuren1","user_tel":null,"user_name":"zupinbanzhuren1","checked_id":[5],"status":"在职","operation":"edit,delete"},
{"id":37,"name":"zupinbanzhuren2","user_tel":null,"user_name":"zupinbanzhuren2","checked_id":[5],"status":"在职","operation":"edit,delete"},
{"id":38,"name":"zhijianyuan1","user_tel":null,"user_name":"zhijianyuan1","checked_id":[7],"status":"在职","operation":"edit,delete"},
{"id":39,"name":"shengchanjingli","user_tel":null,"user_name":"shengchanjingli","checked_id":[3],"status":"在职","operation":"edit,delete"},
{"id":40,"name":"yyk","user_tel":"","user_name":"yyk","checked_id":[],"status":"在职","operation":"edit,delete"}]
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
