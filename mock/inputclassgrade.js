let stu={stu_id:1,stu_name:'学生1',class_name:'1班',table_msg:
            [{course_id:1,coursename:'英语1',eval:[{evalname:'评价指标1',evaltype:'input'},{evalname:'评价指标2',evaltype:'input'},{evalname:'评价指标3',evaltype:'option'}]},
            {course_id:2,coursename:'英语2',eval:[{evalname:'评价指标1',evaltype:'input'},{evalname:'评价指标3',evaltype:'option'},{evalname:'评价指标4',evaltype:'input'}]},
            {course_id:3,coursename:'英语3',eval:[{evalname:'评价指标1',evaltype:'input'},{evalname:'评价指标3',evaltype:'option'},{evalname:'评价指标5',evaltype:'option'}]}]};
let data=[[{course_id:1,coursename:'英语1',grade1:91,grade2:86,grade3:'A'}],
            [{course_id:2,coursename:'英语2',grade1:82,grade2:'B',grade3:78}],
            [{course_id:3,coursename:'英语3',grade1:66,grade2:'C',grade3:'B'}],]
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    // debugger
    switch (rtype) {
        case 'get':
            return {'a':stu,'b':data};
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

    return {'a':stu,'b':data};// 返回这个数组,也就是返回处理后的假数据
};

export default {
    path: '/inputclassgrade',
    data: list
};