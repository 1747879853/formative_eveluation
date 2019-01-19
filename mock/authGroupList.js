import Mock from 'mockjs'

let data1 = [{"id":1,"title":"超级管理员","checked_id":[59,68,69,70,76,77,1],"checked":false},
{"id":2,"title":"学生","checked_id":[59],"checked":false},
{"id":3,"title":"教师","checked_id":[59,1],"checked":false},
{"id":6,"title":"开发者","checked_id":[59,68,69,70,71,76,77,1],"checked":false}]
let arr = [{"id":59,"title":"后台首页","name":"后台首页","authority":"Admin/index","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
{"id":67,"title":"系统管理","name":"系统管理","authority":"system-manage/index","condition":null,"status":"激活","expand":true,"checked":false,
    "children":[{"id":68,"title":"权限管理","name":"权限管理","authority":"system-manage/authority","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
        {"id":69,"title":"权限组管理","name":"权限组管理","authority":"system-manage/authority-groups","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
        {"id":70,"title":"用户权限分配","name":"用户权限分配","authority":"system-manage/user-authority-groups","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
        {"id":71,"title":"菜单管理","name":"菜单管理","authority":"system-manage/menu-manage","condition":null,"status":"激活","expand":true,"checked":false,"children":[]}]
},
{"id":75,"title":"用户管理","name":"用户管理","authority":"users-manage/index","condition":null,"status":"激活","expand":true,"checked":false,
    "children":[{"id":76,"title":"用户","name":"用户","authority":"users-manage/user","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
        {"id":77,"title":"组织管理","name":"组织管理","authority":"users-manage/organization","condition":null,"status":"激活","expand":true,"checked":false,"children":[]},
        ]
},
{"id":1,"title":"课堂成绩录入","name":"课堂成绩录入","authority":"input_class_grade/index","condition":null,"status":"激活","expand":true,"checked":false,"children":[]}]

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
   return {'a':data1,'b':arr};//返回这个数组,也就是返回处理后的假数据
 }
export default {
    path: '/authGroupList',
    data: list,
}