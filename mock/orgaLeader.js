
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
              checked_id:[4],
              children: [
                  {
                      id: '2',
                      name: '总经理',
                      checked_id:[3],
                      leaf: 1,
                      children:[{
                      id: '3',
                      name: '副总经理',
                      checked_id:[2],
                      leaf: 2,
                      children: []
                  },
                  {
                      id: '4',
                      name: '副总经理',
                      checked_id:[1],
                      children: [
                          {
                          id: '5',
                          name: '生产部经理',
                          checked_id:[4],
                          leaf: 2,
                          children: []
                          },
                          {
                          id: '6',
                          name: '销售部经理',
                          checked_id:[3],
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
        return {a: arr, b: data1}
       break;
     case 'post'://添加新组织机构
            id = maxid;
            maxid = maxid + 1;
            params = JSON.parse(options.body).params;
            arr = {
                id: id,
                name: params.name,
                checked_id: [],
                children: []
            };
            return arr;
     case 'patch'://修改权限
         params = JSON.parse(options.body).params;
            arr = {
                id: params.id,
                checked_id:params.checked_id,
               }
        return arr;
     case 'delete'://删除权限
        params = JSON.parse(options.body).params;
            arr = {
                id: params.id
            };
        return arr; 
     default:
   }

   return [data1,arr,newarr];//返回这个数组,也就是返回处理后的假数据

 }


export default {
    path: '/orgaLeader',
    data: list
}