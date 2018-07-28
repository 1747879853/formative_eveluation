


var data2 = [
    {
        work_order_id: 'work_order_record_id1',
        name: '中铁19局京雄铁路',
        user: '王新',
        type: '实体墩(9*3.6m-7.2*3m)墩身平板 模板焊接单（50:1）',
        number: 6,
        children: [
            {
                graph_no: '图号DS-936-01,图号DS-936-02,图号DS-936-03,图号DS-936-05',
                name: '4.2m*2m平板',
                number: 8,
                comment: '边框孔冲Φ22*30孔',
                children: [
                    { name: '面板', spec: '6mm钢板', length: 1900, width: 2000, number: 2, total: 16, comment: '' },
                    { name: '流水槽面板4', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板3', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '面板', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板1', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板2', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                ]
            },
            {
                graph_no: '图号DS-936-01,图号DS-936-02,图号DS-936-03,图号DS-936-05',
                name: '4.2m*2m平板',
                number: 8,
                comment: '边框孔冲Φ22*30孔',
                children: [
                    { name: '面板', spec: '6mm钢板', length: 1900, width: 2000, number: 2, total: 16, comment: '' },
                    { name: '流水槽面板4', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' }
                    , { name: '流水槽面板3', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '面板', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板1', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板2', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' }
                ]
            }
        ]
    },
    {
        work_order_id: 'work_order_record_id2',
        name: '中铁19局京雄铁路11',
        user: '王新11',
        type: '实体墩(9*3.6m-7.2*3m)墩身平板 模板焊接单（50:1）',
        number: 8,
        children: [
            {
                graph_no: '图号DS-936-01,图号DS-936-02,图号DS-936-03,图号DS-936-05',
                name: '4.2m*2m平板',
                number: 8,
                comment: '边框孔冲Φ22*30孔',
                children: [
                    { name: '面板', spec: '6mm钢板', length: 1900, width: 2000, number: 2, total: 16, comment: '' },
                    { name: '流水槽面板4', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板3', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '面板', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板1', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板2', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' }]

            },
            {
                graph_no: '图号DS-936-01,图号DS-936-02,图号DS-936-03,图号DS-936-05',
                name: '4.2m*2m平板',
                number: 8,
                comment: '边框孔冲Φ22*30孔',
                children: [
                    { name: '面板', spec: '6mm钢板', length: 1900, width: 2000, number: 2, total: 16, comment: '' },
                    { name: '流水槽面板4', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板3', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '面板', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板1', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板2', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' }]

            }

        ]
    }
]


var work_order_detail = [
    {
        work_order_id: 'work_order_record_id2',
        children: [
            [{
                graph_no: ['图号DS-936-01', '图号DS-936-02', '图号DS-936-03', '图号DS-936-05'],
                name: '4.2m*2m平板',
                number: 8,
                comment: '边框孔冲Φ22*30孔',
                children: [
                    { name: '面板', spec: '6mm钢板', length: 1900, width: 2000, number: 2, total: 16, comment: '' },
                    { name: '流水槽面板4', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板3', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '面板', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板1', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板2', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                ]
            }],
            [{
                graph_no: ['图号DS-936-07', '图号DS-936-09', '图号DS-936-07'],
                name: '7.2m*8m平板',
                number: 8,
                comment: '边框孔冲Φ22*90孔',
                children: [
                    { name: '面板', spec: '6mm钢板', length: 1900, width: 2000, number: 2, total: 16, comment: '' },
                    { name: '流水槽面板4', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板3', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '面板', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板1', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板2', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' }
                ]
            }]
        ]
    }

]

var workshop_order_detail = [
    {
        name: '1#chejian',
        work_order_id: 'work_order_record_id2',
        children: [
            [{
                graph_no: ['图号DS-936-01', '图号DS-936-02', '图号DS-936-03', '图号DS-936-05'],
                name: '4.2m*2m平板',
                number: 8,
                comment: '边框孔冲Φ22*30孔',
                children: [
                    { name: '面板', spec: '6mm钢板', length: 1900, width: 2000, number: 2, total: 16, comment: '' },
                    { name: '流水槽面板4', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板3', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '面板', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板1', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板2', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                ]
            }],
            [{
                graph_no: ['图号DS-936-07', '图号DS-936-09', '图号DS-936-07', '图号DS-936-04'],
                name: '7.2m*8m平板',
                number: 8,
                comment: '边框孔冲Φ22*90孔',
                children: [
                    { name: '面板', spec: '6mm钢板', length: 1900, width: 2000, number: 2, total: 16, comment: '' },
                    { name: '流水槽面板4', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板3', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '面板', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板1', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' },
                    { name: '流水槽面板2', spec: '7mm钢板', length: 555, width: 333, number: 2, total: 11, comment: 'aaaaa' }
                ]
            }]
        ]
    }

]


var workteam_materials = {
    id: 1,
    name: '1#banzu',
    materials:
        [
            {
                graph_no: ['图号DS-936-01', '图号DS-936-02', '图号DS-936-03', '图号DS-936-05'],
                name: '4.2m*8m平板',
                number: 4,
                number_finished: 2,
                quality_qty: 1,
                comment: '边框孔冲Φ22*30孔',

            },
            {
                graph_no: ['图号DS-936-02', '图号DS-936-03', '图号DS-936-03', '图号DS-936-05'],
                name: '4.2m*2m',
                number: 6,
                number_finished: 5,
                quality_qty: 3,
                comment: '边框Φ22*90孔',

            }
        ]
}

var team_boms =
{
    name: '4.2m*8m平板',
    number: 2,
    boms: [
        { name: '面板', spec: '6mm钢板', length: 1900, width: 2000, total: 16, get_qty: 9, apply_qty: 1, comment: '' },
        { name: '流水槽面板4', spec: '7mm钢板', length: 555, width: 333,  total: 11, get_qty: 9, apply_qty: 0, comment: 'aaaaa' },
        { name: '流水槽面板3', spec: '7mm钢板', length: 555, width: 333,  total: 11, get_qty: 9, apply_qty: 0, comment: 'aaaaa' },
        { name: '面板2', spec: '7mm钢板', length: 555, width: 333, total: 11, get_qty: 9, apply_qty: 5, comment: 'aaaaa' },
        { name: '流水槽面板1', spec: '7mm钢板', length: 555, width: 333,  total: 11, get_qty: 7, apply_qty: 3, comment: 'aaaaa' },
        { name: '流水槽面板2', spec: '7mm钢板', length: 555, width: 333, total: 11, get_qty: 8, apply_qty: 4, comment: 'aaaaa' },

    ]
}
var workshop_directors = {
    "data": [
        {
            'id': '@id',
            'name': '@cname'
        },
        {
            'id': '@id',
            'name': '@cname'
        },
        {
            'id': '@id',
            'name': '@cname'
        },
        {
            'id': '@id',
            'name': '@cname'
        },

    ]
}

var workshop_packaging = {
    "data": [
        {
            'id': '@id',
            'name': '@cname'
        },
        {
            'id': '@id',
            'name': '@cname'
        },
        {
            'id': '@id',
            'name': '@cname'
        },
        {
            'id': '@id',
            'name': '@cname'
        },

    ]
}

var workteams = {
    "data": [
        {
            'id': '@id',
            'name': '班组1'
        },
        {
            'id': '@id',
            'name': '班组2'
        },
        {
            'id': '@id',
            'name': '班组3'
        },
        {
            'id': '@id',
            'name': '班组4'
        },

    ]
}


var workshop_workorders = {
    id: 1,
    name: '1#chejian',
    workorders:
        [{
            work_order_id: 'work_order_record_id1',
            name: '中铁19局京雄铁路',
            user: '王新',
            type: '实体墩(9*3.6m-7.2*3m)墩身平板 模板焊接单（50:1）',
            number: 5,
        },
        {
            work_order_id: 'work_order_record_id2',
            name: '中铁19局京雄铁路2',
            user: '王新2',
            type: '实体墩(10*3.6m-7.2*3m)墩身平板 模板焊接单（50:2）',
            number: 6,
        }],
}

var requisition_list =[
    {
        id: '20180711001',
        user_name: 'Jack',
        apply_date: '2018-07-11 11:25',
        approval_status: '通过',
        type: "4.2m*8m平板",
        number:5,
        send_status:"已发料"
    },
    {
        id: '20180711002',
        user_name: 'Lucy',
        apply_date: '2018-07-11 10:25',
        approval_status: '通过',
        type: "8m*10.5m平板",
        number:6,
        send_status:"未发料"
    },
]
var apply_materials =
{
    name: '4.2m*8m平板',
    number: 2,
    boms: [
        { name: '面板', spec: '6mm钢板', length: 1900, width: 2000, total: 16, get_qty: 9, apply_qty: 1, comment: '' },
        { name: '流水槽面板4', spec: '7mm钢板', length: 555, width: 333,  total: 11, get_qty: 9, apply_qty: 7, comment: 'aaaaa' },
        { name: '流水槽面板3', spec: '7mm钢板', length: 555, width: 333,  total: 11, get_qty: 9, apply_qty: 6, comment: 'aaaaa' },
        { name: '面板2', spec: '7mm钢板', length: 555, width: 333, total: 11, get_qty: 9, apply_qty: 5, comment: 'aaaaa' },
        { name: '流水槽面板1', spec: '7mm钢板', length: 555, width: 333,  total: 11, get_qty: 7, apply_qty: 3, comment: 'aaaaa' },
        { name: '流水槽面板2', spec: '7mm钢板', length: 555, width: 333, total: 11, get_qty: 8, apply_qty: 4, comment: 'aaaaa' },

    ]
}
// var processData1 ={
//     order_id:"XS20180714001",
//     type:'高铁',
//     number: 2,
//     children:[
//         {
//             work_order_id: 'work_order_record_id1',
//             name: '中铁19局京雄铁路',
//             user: '王新',
//             type: '实体墩(9*3.6m-7.2*3m)墩身平板 模板焊接单（50:1）',
//             number: 5,
//             children:[
//                 {
//                     workshop_id: "下料",
//                     number: 5,
//                     children:[
//                         {
//                             name:'4.2m*8m平板',
//                             number:5,
//                             finish_number:3
//                         },
//                         {
//                             name:'4m*9m平板',
//                             number:6,
//                             finish_number:4
//                         },

//                     ]
//                 },
//                 {
//                     workshop_id: "组拼",
//                     number: 5,
//                     children:[
//                         {
//                             name:'4.2m*8m平板',
//                             number:5,
//                             finish_number:7
//                         },
//                         {
//                             name:'4m*9m平板',
//                             number:8,
//                             finish_number:2
//                         },

//                     ]

//                 }
//             ]
//         }
       

//     ]
// }





var progressData ={
    order_id:"XS20180714001",
    type:'高铁',
    number: 2,
    children:[
        {
            work_order_id: 'work_order_record_id1',
            name: '中铁19局京雄铁路',
            user: '王新',
            type: '实体墩(9*3.6m-7.2*3m)墩身平板 模板焊接单（50:1）',
            number: 6,
            xialiao: "4.2m*8m平板:3/5;4m*9m平板:2/8",
            zupin:  "5.2m*8m平板:3/6,4m*9m平板:5/7",
        },
        {
            work_order_id: 'work_order_record_id2',
            name: '中铁18局京雄铁路',
            user: '王新',
            type: '实体墩(9*3.6m-7.2*3m)墩身平板 模板焊接单（100:1）',
            number: 7,
            xialiao: "4.2m*8m平板:3/7,4m*9m平板:2/7",
            zupin:  "4.2m*8m平板:3/7,4m*9m平板:5/7",
        },
    ]
}

export default [ 
    {
        path: '/orderListData',
        data: {
            head: [
                {
                    key: 'name',
                    name: '名称'
                },
                {
                    key: 'create_time',
                    name: '下单时间'
                },
                {
                    key: 'age',
                    name: '年龄'
                },
                {
                    key: 'address',
                    name: '地址'
                },
                {
                    key: 'email',
                    name: '邮件'
                },
                {
                    key: 'remark',
                    name: '备注'
                }
            ],
            body: [
                {
                    'id': 1,
                    'name': '@cname',
                    'order_id': '@natural',
                    'customer': '@ctitle(2,3)',
                    'create_time': '2018-05-03',
                    'age': '@natural(18, 60)',
                    'address': '@city(true) ',
                    'email': '@email()',
                    'remark': '@cparagraph(1)',
                    operation: 'edit,delete'
                },
                {
                    'id': 2,
                    'name': '@cname',
                    'order_id': '@natural',
                    'customer': '@ctitle(5,10)',
                    'create_time': '2018-07-08',
                    'age': '@natural(18, 60)',
                    'address': '@city(true)',
                    'email': '@email()',
                    'remark': '@cparagraph(1)',
                    operation: 'edit,delete'
                },
                {
                    'id': 3,
                    'name': '@cname',
                    'order_id': '@natural',
                    'customer': '@ctitle(5,10)',
                    'create_time': '2018-05-03',
                    'age': '@natural(18, 60)',
                    'address': '@city(true) ',
                    'email': '@email()',
                    'remark': '@cparagraph(1)',
                    operation: 'edit,delete'
                },
            ]
        }
    },
    {
        path: '/work_order_data',
        data: data2

    },
    {
        path: '/work_order_detail',
        data: work_order_detail
    },
    {
        path: '/workshop_directors',
        data: workshop_directors
    },
    {
        path: '/workshop_packaging',
        data: workshop_packaging
    },
    {
        path: '/workteams',
        data: workteams
    },
    {
        path: '/workshop_workorders',
        data: workshop_workorders

    },
    {
        path: '/workshop_order_detail',
        data: workshop_order_detail
    },
    {
        path: '/team_boms',
        data: team_boms
    },
    {

        path: '/workteam_materials',
        data: workteam_materials
    },
    {
        path:'/requisition_list',
        data:requisition_list
    },
    {
        path:'/apply_materials',
        data:apply_materials
    },
    {
        path:'/progressData',
        data:progressData
    }
]