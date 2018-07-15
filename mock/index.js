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
import userList from './userList'

let data = [].concat(authRuleList, navlist, login, echarts, table, groupList, getToken,order,approval,userList)

data.forEach(function(res){
    Mock.mock(res.path, /get|post|delete|patch/i, res.data)
})

export default Mock