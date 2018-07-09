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
              condition: '',
              status: '激活',
              leaf: 0,
              children: [
                  {
                      id: '2',
                      authority: 'Admin/Index/welcome',
                      name: '欢迎页面',
                      condition: '',
                      status: '激活',
                      leaf: 1
                  }
              ]
          },
          {
              key: '3',
              authority: 'Manufacturing/Index/index',
              name: '生产首页',
              condition: '',
              status: '激活',
              leaf: 0,
              children: [
                  {
                      key: '4',
                      authority: 'Manufacturing/Index/bom',
                      name: '物料清单',
                      condition: '',
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