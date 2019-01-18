let arr;
let params;
let studentList1=[{id:'1',name:'学生1',evaluation1:'1',evaluation2:'1',evaluation3:'1'},
                   {id:'2',name:'学生2',evaluation1:'2',evaluation2:'2',evaluation3:'2'},
                   {id:'3',name:'学生3',evaluation1:'3',evaluation2:'3',evaluation3:'3'}];
let studentList2=[{id:'4',name:'学生4',evaluation1:'1',evaluation2:'1',evaluation3:'1'},
                   {id:'5',name:'学生5',evaluation1:'2',evaluation2:'2',evaluation3:'2'},
                   {id:'6',name:'学生6',evaluation1:'3',evaluation2:'3',evaluation3:'3'}];
let studentList3=[{id:'7',name:'学生7',evaluation1:'1',evaluation2:'1',evaluation3:'1'},
                   {id:'8',name:'学生8',evaluation1:'2',evaluation2:'2',evaluation3:'2'},
                   {id:'9',name:'学生9',evaluation1:'3',evaluation2:'3',evaluation3:'3'}];
let studentList4=[{id:'10',name:'学生10',evaluation1:'1',evaluation2:'1',evaluation3:'1'},
                   {id:'11',name:'学生11',evaluation1:'2',evaluation2:'2',evaluation3:'2'},
                   {id:'12',name:'学生12',evaluation1:'3',evaluation2:'3',evaluation3:'3'}];
let studentList5=[{id:'13',name:'学生13',evaluation1:'1',evaluation2:'1',evaluation3:'1'},
                   {id:'14',name:'学生14',evaluation1:'2',evaluation2:'2',evaluation3:'2'},
                   {id:'15',name:'学生15',evaluation1:'3',evaluation2:'3',evaluation3:'3'}];
let list = function (options) {
    /* 模拟删除数据的方式 */
    let rtype = options.type.toLowerCase(); // 获取请求类型
    // debugger
    switch (rtype) {
        case 'get':
            break;
        case 'post':// 添加
            params = JSON.parse(options.body).params;
            if(params.classid==1){
                arr = studentList1;
            }else if(params.classid==2){
                arr = studentList2;
            }else if(params.classid==3){
                arr = studentList3;
            }else if(params.classid==4){
                arr = studentList4;
            }else{
                arr = studentList5;
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
    path: '/studentList',
    data: list
};
