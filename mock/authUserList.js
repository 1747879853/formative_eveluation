import Mock from 'mockjs'

let data1 = [{"id":2,"name":"","password_hash":"$2a$10$6bF47aEYHw81Mi8ZbG8LreAA4Ar1moaMrCqc8um/HZJURiSQYMWlu","password_salt":"$2a$10$6bF47aEYHw81Mi8ZbG8Lre",
"owner_id":2,"owner_type":"Company","tel":null,"is_logged_in":null,"login_failed_times":0,"login_failed_last_time":null,"last_login_ip":"","username":'xuesheng1',"email":null,
"password_digest":null,"last_login":null,"status":"1","checked_id":[2]},
{"id":2,"name":"","password_hash":"$2a$10$6bF47aEYHw81Mi8ZbG8LreAA4Ar1moaMrCqc8um/HZJURiSQYMWlu","password_salt":"$2a$10$6bF47aEYHw81Mi8ZbG8Lre",
"owner_id":2,"owner_type":"Company","tel":null,"is_logged_in":null,"login_failed_times":0,"login_failed_last_time":null,"last_login_ip":"","username":'xuesheng2',"email":null,
"password_digest":null,"last_login":null,"status":"1","checked_id":[2]},
{"id":2,"name":"","password_hash":"$2a$10$6bF47aEYHw81Mi8ZbG8LreAA4Ar1moaMrCqc8um/HZJURiSQYMWlu","password_salt":"$2a$10$6bF47aEYHw81Mi8ZbG8Lre",
"owner_id":2,"owner_type":"Company","tel":null,"is_logged_in":null,"login_failed_times":0,"login_failed_last_time":null,"last_login_ip":"","username":'xuesheng3',"email":null,
"password_digest":null,"last_login":null,"status":"1","checked_id":[2]},
{"id":2,"name":"","password_hash":"$2a$10$6bF47aEYHw81Mi8ZbG8LreAA4Ar1moaMrCqc8um/HZJURiSQYMWlu","password_salt":"$2a$10$6bF47aEYHw81Mi8ZbG8Lre",
"owner_id":2,"owner_type":"Company","tel":null,"is_logged_in":null,"login_failed_times":0,"login_failed_last_time":null,"last_login_ip":"","username":'laoshi1',"email":null,
"password_digest":null,"last_login":null,"status":"1","checked_id":[3]},
{"id":2,"name":"","password_hash":"$2a$10$6bF47aEYHw81Mi8ZbG8LreAA4Ar1moaMrCqc8um/HZJURiSQYMWlu","password_salt":"$2a$10$6bF47aEYHw81Mi8ZbG8Lre",
"owner_id":2,"owner_type":"Company","tel":null,"is_logged_in":null,"login_failed_times":0,"login_failed_last_time":null,"last_login_ip":"","username":'laoshi2',"email":null,
"password_digest":null,"last_login":null,"status":"1","checked_id":[3]},
{"id":2,"name":"","password_hash":"$2a$10$6bF47aEYHw81Mi8ZbG8LreAA4Ar1moaMrCqc8um/HZJURiSQYMWlu","password_salt":"$2a$10$6bF47aEYHw81Mi8ZbG8Lre",
"owner_id":2,"owner_type":"Company","tel":null,"is_logged_in":null,"login_failed_times":0,"login_failed_last_time":null,"last_login_ip":"","username":'laoshi3',"email":null,
"password_digest":null,"last_login":null,"status":"1","checked_id":[3]},
{"id":2,"name":"","password_hash":"$2a$10$6bF47aEYHw81Mi8ZbG8LreAA4Ar1moaMrCqc8um/HZJURiSQYMWlu","password_salt":"$2a$10$6bF47aEYHw81Mi8ZbG8Lre",
"owner_id":2,"owner_type":"Company","tel":null,"is_logged_in":null,"login_failed_times":0,"login_failed_last_time":null,"last_login_ip":"","username":'admin',"email":null,
"password_digest":null,"last_login":null,"status":"1","checked_id":[1]},
{"id":2,"name":"","password_hash":"$2a$10$6bF47aEYHw81Mi8ZbG8LreAA4Ar1moaMrCqc8um/HZJURiSQYMWlu","password_salt":"$2a$10$6bF47aEYHw81Mi8ZbG8Lre",
"owner_id":2,"owner_type":"Company","tel":null,"is_logged_in":null,"login_failed_times":0,"login_failed_last_time":null,"last_login_ip":"","username":'dev',"email":null,
"password_digest":null,"last_login":null,"status":"1","checked_id":[6]}]
let arr = [{"id":1,"title":"超级管理员","checked_id":[59,68,69,70,76,77,1],"checked":false},
{"id":2,"title":"学生","checked_id":[59],"checked":false},
{"id":3,"title":"教师","checked_id":[59,1],"checked":false},
{"id":6,"title":"开发者","checked_id":[59,68,69,70,71,76,77,1],"checked":false}]

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
    path: '/authUserList',
    data: list,
}