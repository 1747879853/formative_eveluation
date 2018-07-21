import Mock from 'mockjs'

let arr;
let data1;
var id = 0;
var maxid = 10;
let params;
var newid=5;

  let list = function (options) {
   /*模拟删除数据的方式*/
   let rtype = options.type.toLowerCase(); //获取请求类型
   switch (rtype) {
     case 'get':
        arr = [
          {
              id: '1',
              name: '董事长',
              checked_id:[1,3],
              leaf: 0,
              children: [
                  {
                      id: '2',
                      name: '总经理',
                      checked_id:[1,2],
                      leaf: 1,
                      children:[{
                      id: '3',
                      name: '副总经理',
                      leaf: 2,
                      children: []
                  },
                  {
                      id: '4',
                      name: '副总经理',
                      checked_id:[1,4],
                      leaf: 2,
                      children: [
                          {
                          id: '5',
                          name: '生产部经理',
                          checked_id:[2,3],
                          leaf: 2,
                          children: []
                          },
                          {
                          id: '6',
                          name: '销售部经理',
                          checked_id:[2,4],
                          leaf: 2,
                          children: []
                          }
                      ]
                  },
                  ]
                  },
              ]
          },
      ]

      data1 = [           
                {
                    id:1,
                    title: 'leader1',
                    checked: false,                         
                },
                {
                    id:2,
                    title: 'leader2',
                    checked: false,
                },
                {
                    id:3,
                    title: 'leader3',
                    checked: false,
                },
                {
                    id:4,
                    title: 'leader4',
                    checked: false,
                }
            ]

       break;
     case 'post'://添加新权限
      id = maxid;
            maxid = maxid + 1;
            params = JSON.parse(options.body).params;
            arr = {
                id: id,
                name: params.name,
                children: []
            };
    
      var newarr = 
        {
            id : newid,
            name : JSON.parse(options.body).params.name, 
            checked_id : []             
        };
        arr.push(newarr);
        newid=newid+1;
       break;
     case 'patch'://修改权限
        params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                name: params.name,
            };

        let i=parseInt(JSON.parse(options.body).params.user_id);
        var newarr;
        arr[i].checked_id=JSON.parse(options.body).params.id;
        newarr=arr[i];
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
        arr.splice(parseInt(JSON.parse(options.body).params.id),1);
        break; 
     default:
   }

   return [data1,arr,newarr];//返回这个数组,也就是返回处理后的假数据

 }


export default {
    path: '/organization',
    data: list
}