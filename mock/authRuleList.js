import Mock from 'mockjs'

let arr = [
          {
              id: '1',
              authority: 'Admin/Index/index',
              name: '后台首页',
              condition: '111',
              status: '激活',
              children: [
                  {
                      id: '2',
                      authority: 'Admin/Index/welcome',
                      name: '欢迎页面',
                      condition: '222',
                      status: '激活',
                      children: [{
                      id: '5',
                      authority: 'Admin/Index/welcome',
                      name: '欢迎页面',
                      condition: '222',
                      status: '激活',
                      children: []
                  }]
                  },
                  {
                      id: '6',
                      authority: 'Admin/Index/welcome',
                      name: '欢迎页面',
                      condition: '222',
                      status: '激活',
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
              children: [
                  {
                      id: '4',
                      authority: 'Manufacturing/Index/bom',
                      name: '物料清单',
                      condition: '444',
                      status: '激活',
                      children: []
                  }
              ]
          }
      ]
  var id=0;
  var maxid=10;
  let list = function (options) {
   /*模拟删除数据的方式*/
   let rtype = options.type.toLowerCase(); //获取请求类型
   switch (rtype) {
     case 'get':
       break;
     case 'post'://添加新权限
     id=maxid;
     maxid=maxid+1;
     let params = JSON.parse(options.body).params; 
     arr = {
              id: id,
              authority: params.v2,
              name: params.v1,
              condition: params.v4,
              status: params.v3,
              children: []
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