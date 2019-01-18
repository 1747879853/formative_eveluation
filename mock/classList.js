let arr;
let params;
let classList1=[{id:1,name:'1班'},{id:2,name:'2班'},{id:3,name:'3班'}];
let classList2=[{id:2,name:'2班'},{id:3,name:'3班'},{id:4,name:'4班'}];
let classList3=[{id:3,name:'3班'},{id:4,name:'4班'},{id:5,name:'5班'}];
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    // debugger
    switch (rtype) {
        case 'get':
            break;
        case 'post':// 添加
            params = JSON.parse(options.body).params;
            if(params.courseid==1){
                arr = classList1;
            }else if(params.courseid==2){
                arr = classList2;
            }else{
                arr = classList3;
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
    path: '/classList',
    data: list
};
