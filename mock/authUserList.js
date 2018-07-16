import Mock from 'mockjs'

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
     case 'post'://添加新用户
       var newid=5;     
       var newarr = 
        {
            id : newid,
            name : JSON.parse(options.body).params.name, 
            checked_id : []             
        };
        arr.push(newarr);
        newid=newid+1;
       break;
     case 'delete':
            arr.splice(parseInt(JSON.parse(options.body).params.id),1);
        break;
     case 'patch': //修改data1中的checked_id
        let i=parseInt(JSON.parse(options.body).params.user_id);
        var newarr;
        arr[i].checked_id=JSON.parse(options.body).params.id;
        newarr=arr[i];
        break;
     default:
   }

   return [data1,arr,newarr];//返回这个数组,也就是返回处理后的假数据

 }
export default {
    path: '/authUserList',
    data: list,
}