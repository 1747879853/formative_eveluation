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
import teacherList from './teacherList'
import organization from './organization'
import orgaLeader from './orgaLeader'
import costList from './costList'
import workList from './workList'
import vehicleList from './vehicleList'
import courseList from './courseList'
import classList from './classList'
import studentList from './studentList'
import studentgradeList from './studentgradeList'
import evaluationList from './evaluationList'
import classcourseList from './classcourseList'
import courseevalList from './courseevalList'
import inputclassgrade from './inputclassgrade'
import teachercourseList from './teachercourseList'
import teacherclasscourse from './teacherclasscourse'
import classStu from './classStu'

let data = [].concat(classStu,authUserList,authRuleList,authGroupList, navlist, login, echarts, table, groupList, getToken,order,approval,organization,teacherList,costList,workList,orgaLeader,attendanceList,vehicleList,courseList,classList,studentList,studentgradeList,evaluationList,classcourseList,courseevalList,inputclassgrade,teachercourseList,teacherclasscourse)



data.forEach(function(res){
    Mock.mock(res.path, /get|post|delete|patch|put/i, res.data)
})

export default Mock