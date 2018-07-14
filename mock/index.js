import authRuleList from './authRuleList'
import authGroupList from './authGroupList'
import authUserList from './authUserList'
import Mock from 'mockjs'
import navlist from './navlist'
import login from './login'
import echarts from './echarts'
import table from './table'
import groupList from './groupList'
import getToken from './getToken'
import order from './orderList'
import approval from './approval'

let data = [].concat(authUserList,authRuleList,authGroupList, navlist, login, echarts, table, groupList, getToken,order,approval)

data.forEach(function(res){
    Mock.mock(res.path, /get|post|delete|patch|put/i, res.data)
})

export default Mock