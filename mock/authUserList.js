import Mock from 'mockjs'
/*
数组data1与数据库table中的内容映射如下：
表名:authUserList_data1
序号id对应数据库中字段id,类型为int,从1开始,主键,且是表authGroupList_arr中字段id的外键;
权限组名title对应数据库中字段name,类型为varchar,字符集应可识别中文汉字,长度不固定,且是表authGroupList_arr中字段name的外键;
是否勾选checked不在数据库中体现;

数组arr与数据库table中的内容映射如下：
表名:authUserList_arr
序号id对应数据库中字段id,类型为int,从1开始,主键;
用户名name对应数据库中字段name,类型为varchar,字符集应可识别中文汉字,长度不固定;
勾选项checked_id对应数据库字段checked_id,保存为整形数组;
*/
let data1 = [           
                {
                    id:1,
                    title: '权限组1',
                    checked: false,                         
                },
                {
                    id:2,
                    title: '权限组2',
                    checked: false,
                },
                {
                    id:3,
                    title: '权限组3',
                    checked: false,
                },
                {
                    id:4,
                    title: '权限组4',
                    checked: false,
                }
            ]
let arr = [
               {    
                    id: 1,
                    name:'用户1',
                    checked_id:[1,3]
                },
                {    
                    id: 2,
                    name: '用户2',
                    checked_id:[2,4]
                }
          ]

let list = function (options) {
   /*模拟删除数据的方式*/
   let rtype = options.type.toLowerCase(); //获取请求类型
   switch (rtype) {
     case 'get':    
       break;
     case 'patch':   
        var ch_id = arr[parseInt(JSON.parse(options.body).params.num)].checked_id;
        for(let i=0;i<data1.length;i++){
            if(ch_id.length!=0){
                for(let j=0;j<ch_id.length;j++){
                    if(data1[i].id==ch_id[j]){
                        data1[i].checked=true;
                        break;
                    }
                    else{data1[i].checked=false;
                    }
                }
            }else{
                data1[i].checked=false;
            }
        }   
       break;
     case 'post'://添加新用户
     var newid;
     if(arr.length==0){
        newid=1;
     }else{
        var max=0;
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i].id>max){
                max=arr[i].id;
            }
        }
        newid=max+1;
     }
       let newarr = 
        {
            id : newid,
            name : JSON.parse(options.body).params.v1, 
            checked_id : []             
        };
        arr.push(newarr);
       break;
     case 'delete':
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i].id=parseInt(JSON.parse(options.body).params.id)+1){
                arr.splice(parseInt(JSON.parse(options.body).params.id),1);
            }
        }
        break;
     case 'put': //修改data1中的checked_id
        let checked_tree = JSON.parse(options.body).params.id;
        let tree_id = [];
        for(let i=0;i<checked_tree.length;i++){
            tree_id[i]=checked_tree[i].id;
        }
        arr[parseInt(JSON.parse(options.body).params.user_id)].checked_id=tree_id;
        break;
     default:
   }

   return [data1,arr];//返回这个数组,也就是返回处理后的假数据

 }
export default {
    path: '/authUserList',
    data: list,
}