var data = {
    'login': '@boolean',
    'captcha': "@image('100x40', '#FFFFFF', '@word')",
    'message': '这里是登录提交后错误提示信息@increment',
    'uid': '@id',
    'name': '@cname',
    'token': '@guid'
}
var chejian = {

}




// var workshop_workorder_detail = {
//     id: 1,
//     name: '1#chejian',
//     workorder:
//     [{
//         work_order_id: 'work_order_record_id1',
//         name: '中铁19局京雄铁路',
//         user: '王新',
//         type: '实体墩(9*3.6m-7.2*3m)墩身平板 模板焊接单（50:1）',
//         number: 1,
//         children: [
//             {
//                 graph_no: ['图号DS-936-01','图号DS-936-02','图号DS-936-03','图号DS-936-05'],
//                 name: '4.2m*2m平板',
//                 number: 8,
//                 comment: '边框孔冲Φ22*30孔',
//                 children: [
//                         [{name: '面板',spec: '6mm钢板',length: 1900,width: 2000,number: 2,total: 16,comment: ''},{name: '流水槽面板4',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板3',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
//                         {name: '面板',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板1',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板2',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'}],
//                 ]
//             }, 
//             {
//                 graph_no: '图号DS-936-01,图号DS-936-02,图号DS-936-03,图号DS-936-05',
//                 name: '4.2m*2m平板',
//                 number: 8,
//                 comment: '边框孔冲Φ22*30孔',
//                 children: [
//                             [{name: '面板',spec: '6mm钢板',length: 1900,width: 2000,number: 2,total: 16,comment: ''},{name: '流水槽面板4',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板3',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'}],
//                             [{name: '面板',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板1',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板2',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'}]
//                 ]
//             }
//         ]
//     }],
//     [{
//         work_order_id: 'work_order_record_id2',
//         name: '中铁19局京雄铁路11',
//         user: '王新11',
//         type: '实体墩(9*3.6m-7.2*3m)墩身平板 模板焊接单（50:1）',
//         number: 2,
//         children: [
//             [{
//                 graph_no: '图号DS-936-01,图号DS-936-02,图号DS-936-03,图号DS-936-05',
//                 name: '4.2m*2m平板',
//                 number: 8,
//                 comment: '边框孔冲Φ22*30孔',
//                 children: [
//                         [{name: '面板',spec: '6mm钢板',length: 1900,width: 2000,number: 2,total: 16,comment: ''},{name: '流水槽面板4',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板3',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
//                         {name: '面板',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板1',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板2',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'}],
//                 ]
//             }], 
//             [{
//                 graph_no: '图号DS-936-01,图号DS-936-02,图号DS-936-03,图号DS-936-05',
//                 name: '4.2m*2m平板',
//                 number: 8,
//                 comment: '边框孔冲Φ22*30孔',
//                 children: [
//                             [{name: '面板',spec: '6mm钢板',length: 1900,width: 2000,number: 2,total: 16,comment: ''},{name: '流水槽面板4',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板3',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
//                             {name: '面板',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板1',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},{name: '流水槽面板2',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'}]
//                 ]
//             }]

//         ]
//     }]

//    }

var data3=[
        {
            'id': 1,
            'name' : '生产经理'
        },
        {
            'id': 2,
            'name' : '财务'
        },
        {
            'id': 3,
            'name' : '出纳'
        },
        {
            'id': 4,
            'name' : '销售'
        },
]
var data4=[
        {
            'id': '@id',
            'name' : '@cname'
        },
        {
            'id': '@id',
            'name' : '@cname'
        },
        {
            'id': '@id',
            'name' : '@cname'
        },
        {
            'id': '@id',
            'name' : '@cname'
        }
        ]




var apply_list={

}

var apply_detail={
    
}

export default [
{
    path: '/login',
    data: data
},

{
    path: '/user_group_list',
    data: data3

},
{
    
    path: '/user_list',
    data: data4
}
]