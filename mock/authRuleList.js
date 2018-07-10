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
     case 'post':
     if(parseInt(JSON.parse(options.body).params.id)==0){
        let newarr = {
            id : parseInt(arr[arr.length-1].id)+1,
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
            id : 10,
            authority : JSON.parse(options.body).params.v2,
            name : JSON.parse(options.body).params.v1,
            condition: JSON.parse(options.body).params.v3,
            status : JSON.parse(options.body).params.v4,
            leaf : 0 ,
            children: [
            ]
       };
       for(let i = 0,k = 0; i < arr.length; i++){
            if(arr[i].children!=null){
                for(let j = 0; j < arr[i].children.length; j++){
                    if(arr[i].children[j].id==parseInt(JSON.parse(options.body).params.id)){
                        k=arr[i].children[j].id;
                        arr[i].children[j].children.push(newarr);
                        break;
                    }
                }
                if(k!=0){
                    break;
                }
            } 
                if(arr[i].id==parseInt(JSON.parse(options.body).params.id)){
                    arr[i].children.push(newarr);
                    break;
                }
                     
       }
     }
       
       break;
     case 'patch':
        for(let i = 0,k = 0; i < arr.length; i++){
            if(arr[i].children!=null){
                for(let j = 0; j < arr[i].children.length; j++){
                    if(arr[i].children[j].id==parseInt(JSON.parse(options.body).params.id)){
                        k=arr[i].children[j].id;
                        arr[i].children[j].name=JSON.parse(options.body).params.v1;
                        arr[i].children[j].authority=JSON.parse(options.body).params.v2;
                        arr[i].children[j].condition=JSON.parse(options.body).params.v3;
                        arr[i].children[j].status=JSON.parse(options.body).params.v4;
                        break;
                    }
                }
                if(k!=0){
                    break;
                }
            } 
                if(arr[i].id==parseInt(JSON.parse(options.body).params.id)){
                    arr[i].name=JSON.parse(options.body).params.v1;
                    arr[i].authority=JSON.parse(options.body).params.v2;
                    arr[i].condition=JSON.parse(options.body).params.v3;
                    arr[i].status=JSON.parse(options.body).params.v4;
                    break;
                }
                    
       }
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