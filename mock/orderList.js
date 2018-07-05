export default{
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
                'create_time': '2016-05-03',
                'age': '@natural(18, 60)',
                'address': '@city(true) ',
                'email': '@email()',
                'remark': '@cparagraph(1)',
                operation: 'edit,delete'
            },
            {
                'id': 2,
                'name': '@cname',
                'create_time': '2018-07-08',
                'age': '@natural(18, 60)',
                'address': '@city(true)',
                'email': '@email()',
                'remark': '@cparagraph(1)',
                operation: 'edit,delete'
            },
        ]
    }
}