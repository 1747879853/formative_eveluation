


var data2 =[ 
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
                                    {name: '面板',spec: '6mm钢板',length: 1900,width: 2000,number: 2,total: 16,comment: ''},
                                    {name: '流水槽面板4',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                                    {name: '流水槽面板3',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                                    {name: '面板',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                                    {name: '流水槽面板1',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                                    {name: '流水槽面板2',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                            ]
                        }, 
                        {
                            graph_no: '图号DS-936-01,图号DS-936-02,图号DS-936-03,图号DS-936-05',
                            name: '4.2m*2m平板',
                            number: 8,
                            comment: '边框孔冲Φ22*30孔',
                            children: [
                                        {name: '面板',spec: '6mm钢板',length: 1900,width: 2000,number: 2,total: 16,comment: ''},
                                        {name: '流水槽面板4',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'}
                                        ,{name: '流水槽面板3',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                                        {name: '面板',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                                        {name: '流水槽面板1',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                                        {name: '流水槽面板2',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'}
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
                        {name: '面板',spec: '6mm钢板',length: 1900,width: 2000,number: 2,total: 16,comment: ''},
                        {name: '流水槽面板4',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '流水槽面板3',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '面板',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '流水槽面板1',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '流水槽面板2',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'}]
                
            }, 
            {
                graph_no: '图号DS-936-01,图号DS-936-02,图号DS-936-03,图号DS-936-05',
                name: '4.2m*2m平板',
                number: 8,
                comment: '边框孔冲Φ22*30孔',
                children: [
                        {name: '面板',spec: '6mm钢板',length: 1900,width: 2000,number: 2,total: 16,comment: ''},
                        {name: '流水槽面板4',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '流水槽面板3',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '面板',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '流水槽面板1',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '流水槽面板2',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'}]
        
            }

        ]
    }
]


var work_order_detail = [
    {
        work_order_id: 'work_order_record_id2',
        children: [
            [{
                graph_no: ['图号DS-936-01','图号DS-936-02','图号DS-936-03','图号DS-936-05'],
                name: '4.2m*2m平板',
                number: 8,
                comment: '边框孔冲Φ22*30孔',
                children: [
                        {name: '面板',spec: '6mm钢板',length: 1900,width: 2000,number: 2,total: 16,comment: ''},
                        {name: '流水槽面板4',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '流水槽面板3',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '面板',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '流水槽面板1',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                        {name: '流水槽面板2',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                ]
            }], 
            [{
                graph_no: ['图号DS-936-07','图号DS-936-09','图号DS-936-07','图号DS-936-04'],
                name: '7.2m*8m平板',
                number: 8,
                comment: '边框孔冲Φ22*90孔',
                children: [
                            {name: '面板',spec: '6mm钢板',length: 1900,width: 2000,number: 2,total: 16,comment: ''},
                            {name: '流水槽面板4',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                            {name: '流水槽面板3',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                            {name: '面板',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                            {name: '流水槽面板1',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'},
                            {name: '流水槽面板2',spec: '7mm钢板',length: 555,width: 333,number: 2,total: 11,comment: 'aaaaa'}
                ]
            }]
        ]
    }
   
]

export default[
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
                'order_id':'@natural',
                'customer':'@ctitle(2,3)',
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
                'order_id':'@natural',
                'customer':'@ctitle(5,10)',
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
                'order_id':'@natural',
                'customer':'@ctitle(5,10)',
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
}
]