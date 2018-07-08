 let arr = []

 for (let i = 0; i < 4; i++) {
   let newArticleObject = {
        id: i,
        name: '后台首页',
        authority: 'Admin/Index/index',
        status: '激活',
        condition: '',
        children:[{
                        id: '01',
                        name: '欢迎界面',
                        authority: 'Admin/Index/welcome',
                        status: '激活',
                        condition: ''
                    }]
   }
   arr.push(newArticleObject);
 }
 
let list = function (options) {
   /*模拟删除数据的方式*/
   let rtype = options.type.toLowerCase(); //获取请求类型
   switch (rtype) {
     case 'get':
     
       break;
     case 'post':
        let id = parseInt(JSON.parse(options.body).params.id); //获取删除的id
        let index;
        for (let i in arr) {
          if (arr[i].id === id) { //在数组arr里找到这个id
            index = i;
            break;
          }
        }
        arr.splice(index, 1); //把这个id对应的对象从数组里删除
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
    data: {
    body:list}
}