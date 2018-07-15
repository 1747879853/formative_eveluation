

export default [
    {
        path: '/userList',
        data: {
            head: [
                {
                    key: 'name',
                    name: '用户名'
                },
                {
                    key: 'user_name',
                    name: '姓名'
                },
                {
                    key: 'user_tel',
                    name: '手机'
                },
                {
                    key: 'status',
                    name: '状态'
                },
            ],
            body: [
                {
                    'id': 1,
                    'name': '@cname',
                    'user_name': '@cname',
                    'user_tel': '@natural',
                    'status': '@ctitle(2,3)',
                    operation: 'edit,delete'
                },
                {
                    'id': 2,
                    'name': '@cname',
                    'user_name': '@cname',
                    'user_tel': '@natural',
                    'status': '@ctitle(2,3)',
                    operation: 'edit,delete'
                },
                {
                    'id': 3,
                   'name': '@cname',
                    'user_name': '@cname',
                    'user_tel': '@natural',
                    'status': '@ctitle(2,3)',
                    operation: 'edit,delete'
                },
            ]
        }
    },
    
]
