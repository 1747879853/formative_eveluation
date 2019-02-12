import Mock from 'mockjs'

let data1 = [{"id":31,"name":"laoshi1","checked_class_id":[1,3],"checked_course":[{class_id:1,classname:'1班',checked_id:[1,2]},{class_id:3,classname:'3班',checked_id:[3]}],"status":"在职","operation":"edit,delete"},
{"id":32,"name":"laoshi2","checked_class_id":[2,4],"checked_course":[{class_id:2,classname:'2班',checked_id:[3,2]},{class_id:4,classname:'4班',checked_id:[4]}],"status":"在职","operation":"edit,delete"},
{"id":33,"name":"laoshi3","checked_class_id":[5],"checked_course":[{class_id:5,classname:'5班',checked_id:[3,4,5]}],"status":"在职","operation":"edit,delete"}]

let data2 = [{"id":31,"name":"laoshi1","user_tel":15166666666,"user_name":"laoshi1","checked_class_id":[2,4],"checked_course":[{class_id:2,classname:'2班',checked_id:[3,2]},{class_id:4,classname:'4班',checked_id:[4]}],"status":"在职","operation":"edit,delete"},
{"id":32,"name":"laoshi2","user_tel":15166666666,"user_name":"laoshi2","checked_class_id":[1,3],"checked_course":[{class_id:1,classname:'1班',checked_id:[1,2]},{class_id:3,classname:'3班',checked_id:[3]}],"status":"在职","operation":"edit,delete"},
{"id":33,"name":"laoshi3","user_tel":15166666666,"user_name":"laoshi3","checked_class_id":[5],"checked_course":[{class_id:5,classname:'5班',checked_id:[3,4,5]}],"status":"在职","operation":"edit,delete"}]

let data3 = [{"id":31,"name":"laoshi1","user_tel":15166666666,"user_name":"laoshi1","checked_class_id":[5],"checked_course":[{class_id:5,classname:'5班',checked_id:[3,4,5]}],"status":"在职","operation":"edit,delete"},
{"id":32,"name":"laoshi2","user_tel":15166666666,"user_name":"laoshi2","checked_class_id":[2,4],"checked_course":[{class_id:2,classname:'2班',checked_id:[3,2]},{class_id:4,classname:'4班',checked_id:[4]}],"status":"在职","operation":"edit,delete"},
{"id":33,"name":"laoshi3","user_tel":15166666666,"user_name":"laoshi3","checked_class_id":[1,3],"checked_course":[{class_id:1,classname:'1班',checked_id:[1,2]},{class_id:3,classname:'3班',checked_id:[3]}],"status":"在职","operation":"edit,delete"}]

let arr = [{"id":1,"name":"1班",title:'1班',"status":"1","checked_id":[1,2,3],checked:false},
            {"id":2,"name":"2班",title:'2班',"status":"1","checked_id":[2,3,4],checked:false},
            {"id":3,"name":"3班",title:'3班',"status":"1","checked_id":[3,4,5],checked:false},
            {"id":4,"name":"4班",title:'4班',"status":"1","checked_id":[1,2,4],checked:false},
            {"id":5,"name":"5班",title:'5班',"status":"1","checked_id":[1,2,5],checked:false}]
let arr1 = [{id:1,name:'英语1',title:'英语1',status:'开课',checked_id:[1,2,3],checked:false,classname:''},
          {id:2,name:'英语2',title:'英语2',status:'开课',checked_id:[1,2,3],checked:false,classname:''},
          {id:3,name:'英语3',title:'英语3',status:'开课',checked_id:[1,2,3],checked:false,classname:''},
          {id:4,name:'英语4',title:'英语4',status:'开课',checked_id:[1,2,3],checked:false,classname:''},
          {id:5,name:'英语5',title:'英语5',status:'开课',checked_id:[1,2,3],checked:false,classname:''}]

let list = function (options) {
   /*模拟删除数据的方式*/
   let rtype = options.type.toLowerCase(); //获取请求类型
   switch (rtype) {
     case 'get':   
        return {'a':data1,'b':arr,'c':arr1}; 
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
        data1[j].checked_course=JSON.parse(options.body).params.checked_course;
        data1[j].checked_class_id=JSON.parse(options.body).params.checked_class_id;
        newarr=data1[j];
        break;
     default:
   }

   return newarr;//返回这个数组,也就是返回处理后的假数据

 }
export default {
    path: '/teacherclasscourse',
    data: list,
}