import Mock from 'mockjs'

let arr;
let arr1;
let list = function (options) {
    let rtype = options.type.toLowerCase(); // 获取请求类型
    switch (rtype) {
        case 'get':
            arr = [
                {    
                    'id': 1,
                    'dept': '生活部',
                    'employeename': '张三',
                    'employeenum': '1', 
                    'time': '2017-01-01 08:01:01'
                },
                {    
                    'id': 2,
                    'dept': '健康部',
                    'employeename': '李四',
                    'employeenum': '2',
                    'time': '2017-01-01 08:01:01'
                },
                {  
                    'id': 3,
                    'dept': '文化',
                    'employeename': '赵武' ,
                    'employeenum': '3',
                    'time': '2017-01-01 08:01:01'
                },
                {    
                    'id': 4,
                    'dept': '饮食',
                    'employeename': '刘文' ,
                    'employeenum': '4',
                    'time': '2017-01-01 08:01:01'
                },
                 {    
                    'id': 5,
                    'dept': '生活部',
                    'employeename': '张三1',
                    'employeenum': '5', 
                    'time': '2017-01-01 08:01:01'
                },
                 {    
                    'id': 6,
                    'dept': '生活部',
                    'employeename': '张三2',
                    'employeenum': '6', 
                    'time': '2017-01-01 08:01:01'
                },
                 {    
                    'id': 7,
                    'dept': '生活部',
                    'employeename': '张三3',
                    'employeenum': '7', 
                    'time': '2017-01-01 08:01:01'
                },
                 {    
                    'id': 8,
                    'dept': '生活部',
                    'employeename': '张三4',
                    'employeenum': '8', 
                    'time': '2017-01-01 08:01:01'
                },
                 {    
                    'id': 9,
                    'dept': '生活部',
                    'employeename': '张三5',
                    'employeenum': '9', 
                    'time': '2017-01-01 08:01:01'
                },
                 {    
                    'id': 10,
                    'dept': '生活部',
                    'employeename': '张三6',
                    'employeenum': '10', 
                    'time': '2017-01-01 08:01:01'
                }, {    
                    'id': 11,
                    'dept': '生活部',
                    'employeename': '张三7',
                    'employeenum': '11', 
                    'time': '2017-01-01 08:01:01'
                },
            ]
                // params = JSON.parse(options.body).params;
                // for(let i=0;i<arr.length;i++){
                //     if(params.employeename==arr[i].employeename){
                //         arr1={
                //             id:arr[i].id,
                //             dept:arr[i].dept,
                //             employeename:arr[i].employeename,
                //             time:arr[i].time,
                //         }
                //         return arr1;
                //     }
                // }
            return arr;
            break;
        default:
    }

    return arr;// 返回这个数组,也就是返回处理后的假数据
};

export default {
    path: '/attendanceList',
    data: list
}
