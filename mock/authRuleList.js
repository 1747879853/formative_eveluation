import Mock from 'mockjs'
/*
数组arr与数据库table中的内容映射如下：
表名:authRuleList
序号id对应数据库中字段id,类型为int,从1开始;
权限authority对应数据库中字段authority,类型为varchar,长度不固定;
权限名name对应数据库中字段name,类型为varchar,字符集应可识别中文汉字,长度不固定;
条件condition对应数据库字段condition,类型为varchar;
是否激活status对应数据库字段status,类型为varchar,也可以是枚举;
双亲结点leaf对应数据库字段parent_id,类型为int;
孩子children不在数据库中体现;
*/

let arr = [
          {
              id: '1',
              authority: 'Admin/Index/index',
              name: '后台首页',
              condition: '111',
              status: '激活',
              leaf: 0,
              children: [
                  {
                      id: '2',
                      authority: 'Admin/Index/welcome',
                      name: '欢迎页面',
                      condition: '222',
                      status: '激活',
                      leaf: 1,
                      children: [{
                      id: '5',
                      authority: 'Admin/Index/welcome',
                      name: '欢迎页面',
                      condition: '222',
                      status: '激活',
                      leaf: 2,
                      children: []
                  }]
                  },
                  {
                      id: '6',
                      authority: 'Admin/Index/welcome',
                      name: '欢迎页面',
                      condition: '222',
                      status: '激活',
                      leaf: 1,
                      children: []
                  }
              ]
          },
          {
              id: '3',
              authority: 'Manufacturing/Index/index',
              name: '生产首页',
              condition: '333',
              status: '激活',
              leaf: 0,
              children: [
                  {
                      id: '4',
                      authority: 'Manufacturing/Index/bom',
                      name: '物料清单',
                      condition: '444',
                      status: '激活',
                      leaf: 3,
                      children: []
                  }
              ]
          }
      ]

  let list = function (options) {
   /*模拟删除数据的方式*/
   let rtype = options.type.toLowerCase(); //获取请求类型
   switch (rtype) {
     case 'get':
       break;
     case 'post'://添加新权限
      var maxid=0;
      var newleaf=0;
      function findId(arr){  
          max_id(arr);  
      }
      function max_id(arr){  
          if (arr!=null){  
              for(let i=0;i<arr.length;i++){
                if(arr[i].id>maxid){
                    maxid=arr[i].id;
                }
                max_id(arr[i].children);
              }
          }         
      }
      function findLeaf(arr){  
          new_leaf(arr);  
      }
      function new_leaf(arr){  
          if (arr!=null){  
              for(let i=0;i<arr.length;i++){
                if(arr[i].id==parseInt(JSON.parse(options.body).params.id)){
                    newleaf=arr[i].id;
                }
                new_leaf(arr[i].children);
              }
          }         
      }
      findId(arr);
      findLeaf(arr);
     if(parseInt(JSON.parse(options.body).params.id)==0){
        let newarr = {
            id : maxid+1,
            authority : JSON.parse(options.body).params.v2,
            name : JSON.parse(options.body).params.v1,
            condition: JSON.parse(options.body).params.v3,
            status : JSON.parse(options.body).params.v4,
            leaf : 0 ,
            children: [
            ]
       };
       arr.push(newarr);
     }
     else if(parseInt(JSON.parse(options.body).params.id)!=0){
        let newarr = {
            id : maxid+1,
            authority : JSON.parse(options.body).params.v2,
            name : JSON.parse(options.body).params.v1,
            condition: JSON.parse(options.body).params.v3,
            status : JSON.parse(options.body).params.v4,
            leaf : newleaf ,
            children: [
            ]
       };
        function add(arr,newarr){  
          depthTraversal(arr,newarr);  
        }
        function depthTraversal(arr,newarr){  
            if (arr!=null){  
                for(let i=0;i<arr.length;i++){
                  if(arr[i].id==parseInt(JSON.parse(options.body).params.id)){
                      arr[i].children.push(newarr);
                  }
                  depthTraversal(arr[i].children,newarr);
                }
            }         
        }
        add(arr,newarr); 
     }
       
       break;
     case 'patch'://修改权限
        function edit(arr){  
          depthTraversal1(arr);  
        }
        function depthTraversal1(arr){  
            if (arr!=null){  
                for(let i=0;i<arr.length;i++){
                  if(arr[i].id==parseInt(JSON.parse(options.body).params.id)){
                      arr[i].name=JSON.parse(options.body).params.v1;
                      arr[i].authority=JSON.parse(options.body).params.v2;
                      arr[i].condition=JSON.parse(options.body).params.v3;
                      arr[i].status=JSON.parse(options.body).params.v4;
                  }
                  depthTraversal1(arr[i].children);
                }
            }         
        }
        edit(arr);
       break;
     case 'delete'://删除权限
        function del(arr){  
          depthTraversal2(arr);  
        }
        function depthTraversal2(arr){  
            if (arr!=null){  
                for(let i=0;i<arr.length;i++){
                  if(arr[i].id==parseInt(JSON.parse(options.body).params.id)){
                      arr.splice(i,1);
                  }
                  if(arr[i]!=null){
                    depthTraversal2(arr[i].children);
                  }                  
                }
            }         
        }
        del(arr);
        break; 
     default:
   }

   return arr;//返回这个数组,也就是返回处理后的假数据

 }


export default {
    path: '/authRuleList',
    data: list
}