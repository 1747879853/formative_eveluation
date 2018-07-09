import Mock from 'mockjs'

// let arr = []

//  for (let i = 0; i < 4; i++) {
//    let newArticleObject = {
//         id: (i*2)+1,
//         name: '后台首页',
//         authority: 'Admin/Index/index',
//         status: '激活',
//         condition: '',
//         children:[{
//                         id: (i*2)+2,
//                         name: '欢迎界面',
//                         authority: 'Admin/Index/welcome',
//                         status: '激活',
//                         condition: ''
//                     }]
//    }
//    arr.push(newArticleObject);
//  }

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
                      leaf: 1
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
                      leaf: 1
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
     case 'post':
       let newarr = {
            id : '5',
            authority : '5',
            name : '5',
            condition: '5',
            status : '5',
            leaf : 0 ,
            children: [
            ]
       };
       arr.push(newarr);
       break;
     case 'son-insert':
       break;
     case 'edit':
       break;
     case 'delete':
        let id = parseInt(JSON.parse(options.body).params.id); //获取删除的id
        arr = arr.filter(function(val){
          return val.id!=id;
        });
        break; 
     default:
   }

   return arr;//返回这个数组,也就是返回处理后的假数据

 }


export default {
    path: '/authRuleList',
    data: list
}