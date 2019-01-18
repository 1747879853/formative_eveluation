let arr;
let params;
let courseList1=[{id:1,name:'英语1'},{id:2,name:'英语2'},{id:3,name:'英语3'}];
let courseList2=[{id:2,name:'英语2'},{id:3,name:'英语3'},{id:4,name:'英语4'}];
let courseList3=[{id:3,name:'英语3'},{id:4,name:'英语4'},{id:5,name:'英语5'}];
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    // debugger
    switch (rtype) {
        case 'get':
            break;
        case 'post':// 添加
            params = JSON.parse(options.body).params;
            if(params.teacherid==1){
                arr = courseList1;
            }else if(params.teacherid==2){
                arr = courseList2;
            }else{
                arr = courseList3;
            }            
            break;
        case 'patch':// 修改
            break;
        case 'delete':// 删除
            break;
        default:
    }

    return arr;// 返回这个数组,也就是返回处理后的假数据
};

export default {
    path: '/courseList',
    data: list
};
