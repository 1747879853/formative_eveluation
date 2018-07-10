/*
create table approvals

申请表的字段
id 
name:       string, 名称
en_name:    string, 对ruby来说就是model名称  
/////not used:  group_ids:  string, 授权的用户组的id，以逗号分隔的字符串
/////not used:   user_ids:  string, 授权的用户的id，以逗号分隔的字符串
comment:    string, 该申请的简介说明
created_time: timestamp, 创建时间，也即启用时间
stoped_time:  timestamp, 停用时间，如正在使用则为空
status: integer，1 正在使用， 0 停用
*/
var data = [
	{    
	    'id': 1,
	    'name': '采购申请',
	    'en_name': 'PurchaseApproval',
	    // 'group_ids': '1,4,6',
	    // 'user_ids': '3,5,7,8',
	    'comment': '这是一个采购申请',
	    'created_time': '2017-01-01 08:01:01',
	    'stoped_time': null,
	    'status': 1
	},
	{    
	    'id': 2,
	    'name': '请假申请',
	    'en_name': 'LeaveApproval',
	    'group_ids': '11,8,6',
	    'user_ids': '13,50,71,18',
	    'comment': '这是一个请假申请',
	    'created_time': '2017-05-01 08:10:10',
	    'stoped_time': null,
	    'status': 1     
	},
	{    
	    'id': 3,
	    'name': '付款申请' ,
	    'en_name': 'PaymentApproval',
	    // 'group_ids': '5,9,10',
	    // 'user_ids': '22,15,16,21',
	    'comment': '这是一个付款申请',
	    'created_time': '2017-06-01 08:20:20',
	    'stoped_time': null,
	    'status': 1    
	},
	{    
	    'id': 4,
	    'name': 'xx申请' ,
	    'en_name': 'XxYyZz',
	    // 'group_ids': '5,9,10',
	    // 'user_ids': '22,15,16,21',
	    'comment': '这是一个xx申请',
	    'created_time': '2017-06-01 08:08:08',
	    'stoped_time': '2017-10-01 08:08:08',
	    'status': 0   
	}
]

/*
create table approval_fields

申请表字段表的字段
id 
name:       string, 名称,eg：'申请事由'
en_name:     string, eg： reason
type:       string, 类型, eg：单行输入框|多选框|单选框|日期等
info:       string,, 提示文字
sequence:  integer, 显示顺序，从小到大，从上到下显示
options:   string,  eg：'选项1,选项2,选项3', 如果前面类型是多选框或单选框时，否则为空
datetypeoptions:  string,  '年-月-日 时:分,年-月-日' ,如果前面类型是日期时，否则为空
*/
var data1 = [
	{    
	    'id': 1,
	    'approval_id': 1,
	    'name': '申请事由',
	    'en_name': 'reason',
	    'type': '单行输入框',
	    'info': '输入申请事由',
	    'sequence': 1,
	    'options': '',
	    'datetypeoptions': '',
	},
	{    
	    'id': 2,
	    'approval_id': 1,
	    'name': '期望交付日期',
	    'en_name': 'expire',
	    'type': '日期',
	    'info': '输入期望交付日期',
	    'sequence': 2,
	    'options': '',
	    'datetypeoptions': '年-月-日 时:分,年-月-日',     
	},	
]

export default [
	{
	    path: '/approval_field_list',
	    data: data1
	},
	{
	    path: '/approval_list',
	    data: data
	}
]