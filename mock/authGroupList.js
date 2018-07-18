import Mock from 'mockjs'

let data1 = [
                    {
                        id:1,
                        title: '权限控制',
                        expand: true,
                        checked: false,
                        children: [
                            {
                                id:2,
                                title: '权限管理',
                                expand: true,
                                checked: false,
                                children: [
                                    {
                                        id:3,
                                        title: '添加权限',
                                        expand: true,
                                        checked: false,
                                    },
                                    {
                                        id:4,
                                        title: '修改权限',
                                        expand: true,
                                        checked: false,
                                    },
                                    {
                                        id:5,
                                        title: '删除权限',
                                        expand: true,
                                        checked: false,
                                    }
                                ]
                            },
                            {
                                id:6,
                                title: '用户组管理',
                                expand: true,
                                checked: false,
                                children: [
                                {
                                    id:7,
                                    title: '添加用户组',
                                    expand: true,
                                    checked: false,
                                },
                                {
                                    id:8,
                                    title: '修改用户组',
                                    expand: true,
                                    checked: false,
                                },
                                {
                                    id:9,
                                    title: '删除用户组',
                                    expand: true,
                                    checked: false,
                                }
                                ]
                            }
                        ]
                    },
                    {
                        id:10,
                        title: '后台首页',
                        expand: true,
                        checked: false,
                        children: [
                            {
                                id:11,
                                title: '欢迎页面',
                                expand: true,
                                checked: false,
                            }
                        ]
                    }]
let arr = [
               {    
                    id: 1,
                    name:'权限组1',
                    checked_id:[4,7,8]
                },
                {    
                    id: 2,
                    name: '权限组2',
                    checked_id:[3,5,7]
                }
                ]

let list = function (options) {
   /*模拟删除数据的方式*/
   let rtype = options.type.toLowerCase(); //获取请求类型
   switch (rtype) {
     case 'get':    
       break;
     case 'patch': 
        let i=parseInt(JSON.parse(options.body).params.group_id);
        var newarr;
        arr[i].checked_id=JSON.parse(options.body).params.id;
        newarr=arr[i];     
       break;
     case 'post'://添加新权限组
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
     default:
   }
   return [data1,arr,newarr];//返回这个数组,也就是返回处理后的假数据
 }
export default {
    path: '/authGroupList',
    data: list,
}