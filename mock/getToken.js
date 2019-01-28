var data = {"jwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDg3NjM0OTAsInN1YiI6M30.4hU-m2WYXE-RUB3wWo7tn4hrfyQ21lDHN5oZVExbEeE","auth_rules":["Admin/index","input_class_grade/index","student_grade/index","system-manage/index","system-manage/authority","system-manage/authority-groups","system-manage/user-authority-groups","system-manage/menu-manage","resource-manage/index","resource-manage/class","resource-manage/class-student","resource-manage/course","resource-manage/evaluation","resource-manage/class-course","resource-manage/course-evaluation","resource-manage/teacher-course","resource-manage/teacher-class-course","users-manage/index","users-manage/teacher","users-manage/student","users-manage/organization"]}

export default [{
    path: '/user_token',
    data: data
}]