import Mock from 'mockjs'
/*
数组data1与数据库table中的内容映射如下：
表名:authGroupList_data1
序号id对应数据库中字段id,类型为int,从1开始,主键,且是表authRuleList中字段id的外键;
权限名title对应数据库中字段name,类型为varchar,字符集应可识别中文汉字,长度不固定,且是表authRuleList中字段name的外键;
双亲结点leaf对应数据库字段parent_id,类型为int,且是表authRuleList中字段leaf的外键;
是否展开expand,是否勾选checked,孩子children,不在数据库中体现;

数组arr与数据库table中的内容映射如下：
表名:authGroupList_arr
序号id对应数据库中字段id,类型为int,从1开始,主键;
权限组名name对应数据库中字段name,类型为varchar,字符集应可识别中文汉字,长度不固定;
勾选项checked_id对应数据库字段checked_id,保存为整形数组;
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
        var ch_id = arr[parseInt(JSON.parse(options.body).params.num)].checked_id;
        function edit(arr){  
          depthTraversal1(arr); 
          return arr; 
        }   
        function depthTraversal1(arr){  
            if (arr!=null){  
                for(let i=0;i<arr.length;i++){
                    if(ch_id.length!=0){
                    for(let j=0;j<ch_id.length;j++){
                        if(arr[i].id==ch_id[j]){
                            arr[i].checked=true;
                            break;
                        }
                        else{arr[i].checked=false;}
                    }
                    }else{
                        arr[i].checked=false;
                    }
                  depthTraversal1(arr[i].children);
                }
            }         
        }
        data1=edit(data1);    
       break;
     case 'post'://添加新权限组
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
        arr[parseInt(JSON.parse(options.body).params.group_id)].checked_id=tree_id;
        break;
     default:
   }

   return [data1,arr];//返回这个数组,也就是返回处理后的假数据

 }
export default {
    path: '/authGroupList',
    data: list,
}