import Mock from 'mockjs'

let data1 = [{id:1,name:'英语1',title:'英语1',status:'开课',checked_id:[1,2,3],checked:false},
          {id:2,name:'英语2',title:'英语2',status:'开课',checked_id:[1,3,4],checked:false},
          {id:3,name:'英语3',title:'英语3',status:'开课',checked_id:[1,3,5],checked:false},
          {id:4,name:'英语4',title:'英语4',status:'开课',checked_id:[2,3,4],checked:false},
          {id:5,name:'英语5',title:'英语5',status:'开课',checked_id:[3,4,5],checked:false}]
let arr = [{id:1,name:'评价指标1',title:'评价指标1',type:'input',checked:false},
            {id:2,name:'评价指标2',title:'评价指标2',type:'input',checked:false},
            {id:3,name:'评价指标3',title:'评价指标3',type:'option',checked:false},
            {id:4,name:'评价指标4',title:'评价指标4',type:'input',checked:false},
            {id:5,name:'评价指标5',title:'评价指标5',type:'option',checked:false}];

let list = function (options) {
   /*模拟删除数据的方式*/
   let rtype = options.type.toLowerCase(); //获取请求类型
   switch (rtype) {
     case 'get':   
        return {'a':data1,'b':arr}; 
       break;
     case 'post'://添加新用户
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
     case 'patch': //修改data1中的checked_id
        let i=parseInt(JSON.parse(options.body).params.user_id);
        var newarr;
        for(var j=0;j<data1.length;j++){
            if(data1[j].id==i)
                break;
        }
        data1[j].checked_id=JSON.parse(options.body).params.id;
        newarr=data1[j];
        break;
     default:
   }

   return newarr;//返回这个数组,也就是返回处理后的假数据

 }
export default {
    path: '/courseevalList',
    data: list,
}