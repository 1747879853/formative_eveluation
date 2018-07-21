// var attendance_list = [
//     {    
//         'id': 1,
//         'dept': '生活部',
//         'employeename': '张三',
//         'employeenum': '1', 
//         'time': '2017-01-01 08:01:01'
//     },
//     {    
//         'id': 2,
//         'dept': '健康部',
//         'employeename': '李四',
//         'employeenum': '2',
//         'time': '2017-01-01 08:01:01'
//     },
//     {  
//         'id': 3,
//         'dept': '文化',
//         'employeename': '赵武' ,
//         'employeenum': ''3
//         'time': '2017-01-01 08:01:01'
//     },
//     {    
//         'id': 4,
//         'dept': '饮食',
//         'employeename': '刘文' ,
//         'employeenum': '4',
//         'time': '2017-01-01 08:01:01'
//     },
// ]

// var valueList = [
//                     {
//                         value: '全部',
//                         label: '全部'
//                     },
//                     {
//                         value: '张三',
//                         label: '张三'
//                     },
//                     {
//                         value: '张三2',
//                         label: '张三2'
//                     },
//                     {
//                         value: '张三3',
//                         label: '张三3'
//                     },
//                     {
//                         value: '张三4',
//                         label: '张三4'
//                     },
//                     {
//                         value: '张三5',
//                         label: '张三5'
//                     }]
// export default [
// {
//     path: '/attendanceList',
//     data: list
// },
// {
//     path: '/value-List',
//     data: valueList
// }
// ]
// // // mockTableData1()
// // //   {let data = [];
// // //   for (let i = 0; i < 10; i++) {
// // //   data.push({
// // //                         dept: '部门' + Math.floor(Math.random () * 100 + 1),
// // //                         employeename: '张三' + Math.floor(Math.random () * 100 + 1),
// // //                         employeenum: Math.floor(Math.random () * 3 + 1),
// // //                         time:new Date()
// // //                     })
// // //                 }
// // //                 return data;
// // // }

let arr;
let list = function (options) {
    let rtype = options.type.toLowerCase(); // 获取请求类型
    switch (rtype) {
        case 'get':
            arr = [
                    {
                        'id': 4,
                        'dept': '@cname',
                        'employeename': '@cname',
                        'employeenum': '@natural',
                        'time': '在职',
                        operation: 'edit,delete'
                    },
                    {
                        'id': 5,
                        'dept': '@cname',
                        'employeename': '@cname',
                        'employeenum': '@natural',
                        'time': '在职',
                        operation: 'edit,delete'
                    },
                    {
                        'id': 6,
                       'dept': '@cname',
                        'employeename': '@cname',
                        'employeenum': '@natural',
                        'time': '在职',
                        operation: 'edit,delete'
                    },
            ]
            break;
        default:
    }

    return arr;// 返回这个数组,也就是返回处理后的假数据
};

export default {
    path: '/attendenceList',
    data: list
}
