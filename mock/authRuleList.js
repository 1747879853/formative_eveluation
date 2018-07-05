export default {
    path: '/authRuleList',
    data: [
        {
            key: '1',
            name: 'Admin/Index/index',
            title: '后台首页',
            condition: '',
            status: 1,
            leaf: 0,
            children: [
                {
                    key: '2',
                    name: 'Admin/Index/welcome',
                    title: '欢迎页面',
                    condition: '',
                    status: 1,
                    leaf: 1
                }
            ]
        },
        {
            key: '3',
            name: 'Manufacturing/Index/index',
            title: '生产首页',
            condition: '',
            status: 1,
            leaf: 0,
            children: [
                {
                    key: '4',
                    name: 'Manufacturing/Index/bom',
                    title: '物料清单',
                    condition: '',
                    status: 1,
                    leaf: 1
                }
            ]
        }
    ]
}