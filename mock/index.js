import authRuleList from './authRuleList'
import authGroupList from './authGroupList'
import authUserList from './authUserList'
import attendanceList from './attendanceList'
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
import organization from './organization'
import orgaLeader from './orgaLeader'
import costList from './costList'
import workList from './workList'
import vehicleList from './vehicleList'
import courseList from './courseList'

let data = [].concat(authUserList,authRuleList,authGroupList, navlist, login, echarts, table, groupList, getToken,order,approval,organization,userList,costList,workList,orgaLeader,attendanceList,vehicleList,courseList)



data.forEach(function(res){
    Mock.mock(res.path, /get|post|delete|patch|put/i, res.data)
})

export default Mock