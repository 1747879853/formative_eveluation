import Mock from 'mockjs'


let arr = [
          {
              id: '1',
              name: '董事长',
              condition: '111',
              status: '激活',
              leaf: 0,
              children: [
                  {
                      id: '2',
                      name: '总经理',
                      condition: '222',
                      status: '激活',
                      leaf: 1,
                      children:[{
                      id: '3',
                      name: '副总经理',
                      condition: '222',
                      status: '激活',
                      leaf: 2,
                      children: []
                  },
                  {
                      id: '4',
                      name: '副总经理',
                      condition: '222',
                      status: '激活',
                      leaf: 2,
                      children: [
                          {
                          id: '5',
                          name: '生产部经理',
                          condition: '222',
                          status: '激活',
                          leaf: 2,
                          children: []
                          },
                          {
                          id: '6',
                          authority: 'Admin/Index/welcome',
                          name: '销售部经理',
                          condition: '222',
                          status: '激活',
                          leaf: 2,
                          children: []
                          }
                      ]
                  },
                  ]
                  },
                  // {
                  //     id: '6',
                  //     authority: 'Admin/Index/welcome',
                  //     name: '欢迎页面',
                  //     condition: '222',
                  //     status: '激活',
                  //     leaf: 1,
                  //     children: []
                  // }
              ]
          },
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
    path: '/organization',
    data: list
}