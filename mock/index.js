import authRuleList from './authRuleList'
import Mock from 'mockjs'
import navlist from './navlist'
import login from './login'
import echarts from './echarts'
import table from './table'
import groupList from './groupList'
import getToken from './getToken'
import order from './orderList'
import approval from './approval'
import organization from './organization'

let data = [].concat(authRuleList, navlist, login, echarts, table, groupList, getToken,order,approval,organization)

data.forEach(function(res){
    Mock.mock(res.path, /get|post|delete|patch/i, res.data)
})

export default Mock