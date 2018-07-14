import Mock from 'mockjs'
/*
数组arr与数据库table中的内容映射如下：
表名:authGroupList
序号id对应数据库中字段id,类型为int,从1开始,主键,且是表authGroupList中字段id的外键;
权限authority对应数据库中字段authority,类型为varchar,长度不固定;
权限名name对应数据库中字段name,类型为varchar,字符集应可识别中文汉字,长度不固定;
条件condition对应数据库字段condition,类型为varchar;
是否激活status对应数据库字段status,类型为varchar,也可以是枚举;
双亲结点leaf对应数据库字段parent_id,类型为int;
孩子children不在数据库中体现;
*/
let data1 = [
                    {
                        id:1,
                        title: '权限控制',
                        expand: true,
                        checked: false,
                        leaf:0,
                        children: [
                            {
                                id:2,
                                title: '权限管理',
                                expand: true,
                                checked: false,
                                leaf:1,
                                children: [
                                    {
                                        id:3,
                                        title: '添加权限',
                                        expand: true,
                                        checked: false,
                                        leaf:2,
                                    },
                                    {
                                        id:4,
                                        title: '修改权限',
                                        expand: true,
                                        checked: false,
                                        leaf:2,
                                    },
                                    {
                                        id:5,
                                        title: '删除权限',
                                        expand: true,
                                        checked: false,
                                        leaf:2,
                                    }
                                ]
                            },
                            {
                                id:6,
                                title: '用户组管理',
                                expand: true,
                                checked: false,
                                leaf:1,
                                children: [
                                {
                                    id:7,
                                    title: '添加用户组',
                                    expand: true,
                                    checked: false,
                                    leaf:6,
                                },
                                {
                                    id:8,
                                    title: '修改用户组',
                                    expand: true,
                                    checked: false,
                                    leaf:6,
                                },
                                {
                                    id:9,
                                    title: '删除用户组',
                                    expand: true,
                                    checked: false,
                                    leaf:6,
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
                        leaf:0,
                        children: [
                            {
                                id:11,
                                title: '欢迎页面',
                                expand: true,
                                checked: false,
                                leaf:10,
                            }
                        ]
                    }]
let arr = [
               {    
                    id: 1,
                    name:'权限组1',
                    checked_id:[2,4,6,8]
                },
                {    
                    id: 2,
                    name: '权限组2',
                    checked_id:[1,3,5,7]
                }
                ]

let list = function (options) {
   /*模拟删除数据的方式*/
   let rtype = options.type.toLowerCase(); //获取请求类型
   switch (rtype) {
     case 'get':    
       break;
     case 'patch':   
     debugger
        let ch_id = arr[parseInt(JSON.parse(options.body).params.num)].checked_id;
        function edit(arr,h){  
          depthTraversal1(arr,h);  
        }
        function depthTraversal1(arr,h){  
            if (arr!=null){  
                for(let i=0;i<arr.length;i++){
                  if(arr[i].id==h){
                      arr[i].checked=true;
                  }
                  depthTraversal1(arr[i].children,h);
                }
            }         
        }
        for(let j=0;j<ch_id.length;j++){
            edit(data1,ch_id[j]);
        }       
       break;
     case 'post'://添加新权限
       let newarr = 
        {
            id:arr[arr.lenth-1].id+1,
            name: JSON.parse(options.body).params.v1,              
        };
     arr.push(newarr);
       break;
     default:
   }

   return [data1,arr];//返回这个数组,也就是返回处理后的假数据

 }
export default {
    path: '/authGroupList',
    data: list,
}