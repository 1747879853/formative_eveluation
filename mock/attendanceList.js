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
