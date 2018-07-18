/*
create table approvals
has_many: approval_fields
审批表的字段
id 
name:       string, 名称
en_name:    string, 对ruby来说就是model名称,该名称由服务器端在保存客户端提交的审批时填入
/////not used:  group_ids:  string, 授权的用户组的id，以逗号分隔的字符串
/////not used:   user_ids:  string, 授权的用户的id，以逗号分隔的字符串
comment:    string, 该审批的简介说明
created_time: timestamp, 创建时间，也即启用时间
stoped_time:  timestamp, 停用时间，如正在使用则为空
status: integer，1 正在使用， 0 停用
*/
var approval_list = [
	{    
	    'id': 1,
	    'name': '采购',
	    'en_name': 'PurchaseApproval', 
	    // 'group_ids': '1,4,6',
	    // 'user_ids': '3,5,7,8',
	    'comment': '这是一个采购审批',
	    'created_time': '2017-01-01 08:01:01',
	    'stoped_time': null,
	    'status': 1
	},
	{    
	    'id': 2,
	    'name': '请假',
	    'en_name': 'LeaveApproval',
	    'group_ids': '11,8,6',
	    'user_ids': '13,50,71,18',
	    'comment': '这是一个请假审批',
	    'created_time': '2017-05-01 08:10:10',
	    'stoped_time': null,
	    'status': 1     
	},
	{    
	    'id': 3,
	    'name': '付款' ,
	    'en_name': 'PaymentApproval',
	    // 'group_ids': '5,9,10',
	    // 'user_ids': '22,15,16,21',
	    'comment': '这是一个付款审批',
	    'created_time': '2017-06-01 08:20:20',
	    'stoped_time': null,
	    'status': 1    
	},
	{    
	    'id': 4,
	    'name': 'xx审批' ,
	    'en_name': 'XxYyZz',
	    // 'group_ids': '5,9,10',
	    // 'user_ids': '22,15,16,21',
	    'comment': '这是一个xx审批',
	    'created_time': '2017-06-01 08:08:08',
	    'stoped_time': '2017-10-01 08:08:08',
	    'status': 0   
	}
]

/*
create table approval_fields
belong_to : approvals
申请表字段表的字段
id 
approval_id,  approvals表的id
name:       string, 名称,eg：'申请事由'
en_name:     string, eg： reason，该名称由服务器端在保存客户端提交的申请并创建申请表时填入
control:       string, 类型, eg：单行输入框|多选框|单选框|日期等
info:       string,, 提示文字
sequence:  integer, 显示顺序，从小到大，从上到下显示,设计完成后提交时写入服务器数据库
selectoptions:   string,  eg：'选项1,选项2,选项3', 如果前面类型是多选框或单选框时，否则为空

dateformat:  string,  '年-月-日 时:分  或  年-月-日' ,如果前面类型是日期时，否则为空
*/
//data1中一个{}代表approval_fields表中的一条记录，代表代表approvals表中'approval_id': 1的这个申请的一个字段，整个data1代表approvals表中'approval_id': 1的这个申请的所有字段集合。

/*
create table approval_detail_fields
belong_to : approvals
申请表详单表的字段，该表字段和approval_fields表一样，这里用2个表分别表示主表和详表的字段只是为了好辨别（当然用一个表也可以）
*/

var approval_field_list = {
	'approval_field_data':
		[
		{    
		    'id': 1,
		    'approval_id': 1,
		    'name': '申请事由',
		    'en_name': 'reason',
		    'control': '单行输入框',
		    'info': '输入申请事由',
		    'sequence': 1,    //
		    
		    'selectoptions': '',  //设计时添加的选择项，将来自动生成form时也要使用
		    

		    //'dateoptions': '年-月-日 时:分,年-月-日',  //本来想和选择项一样，后来由于时间格式就2种，所以不用了
		    'dateformat':'年-月-日 时:分'  //管理员设计时，如果control为日期时，选择的日期的格式。否则为空。
		},
		{    
		    'id': 2,
		    'approval_id': 1,
		    'name': '期望交付日期',
		    'en_name': 'expire',
		    'control': '日期',
		    'info': '输入期望交付日期',
		    'sequence': 2,

		    'selectoptions': '',

		    //'dateoptions': '年-月-日 时:分,年-月-日',
		    'dateformat':'年-月-日'
		         
		},
		{    
		    'id': 3,
		    'approval_id': 1,
		    'name': '字段3',
		    'en_name': 'fieldthree',
		    'control': '单选框',
		    'info': 'please select...',
		    'sequence': 3,

		    'selectoptions': '选项11,选项22,选项33,选项44',

		    //'dateoptions': '年-月-日 时:分,年-月-日',
		    'dateformat':''
		         
		},
		{    
		    'id': 4,
		    'approval_id': 1,
		    'name': '字段4',
		    'en_name': 'fieldfour',
		    'control': '多选框',
		    'info': 'this is a multi selction',
		    'sequence': 4,

		    'selectoptions': 'multi1,multi2,multi3,multi4',

		    //'dateoptions': '年-月-日 时:分,年-月-日',
		    'dateformat':''
		         
		},
		{    
		    'id': 5,
		    'approval_id': 1,
		    'name': '字段5',
		    'en_name': 'fieldfive',
		    'control': '多行输入框',
		    'info': 'multi line input',
		    'sequence': 5,

		    'selectoptions': '',

		    //'dateoptions': '年-月-日 时:分,年-月-日',
		    'dateformat':''
		         
		}	
		],
	'approval_detail_field_data':
		[
		{    
		    'id': 1,
		    'approval_id': 1,
		    'name': '申请事由',
		    'en_name': 'reason',
		    'control': '单行输入框',
		    'info': '输入申请事由',
		    'sequence': 1,    //
		    
		    'selectoptions': '',  //设计时添加的选择项，将来自动生成form时也要使用
		    

		    //'dateoptions': '年-月-日 时:分,年-月-日',  //本来想和选择项一样，后来由于时间格式就2种，所以不用了
		    'dateformat':'年-月-日 时:分'  //管理员设计时，如果control为日期时，选择的日期的格式。否则为空。
		},
		{    
		    'id': 2,
		    'approval_id': 1,
		    'name': '期望交付日期',
		    'en_name': 'expire',
		    'control': '日期',
		    'info': '输入期望交付日期',
		    'sequence': 2,

		    'selectoptions': '',

		    //'dateoptions': '年-月-日 时:分,年-月-日',
		    'dateformat':'年-月-日'
		         
		},
		{    
		    'id': 3,
		    'approval_id': 1,
		    'name': '字段3',
		    'en_name': 'fieldthree',
		    'control': '单选框',
		    'info': 'please select...',
		    'sequence': 3,

		    'selectoptions': '选项11,选项22,选项33,选项44',

		    //'dateoptions': '年-月-日 时:分,年-月-日',
		    'dateformat':''
		         
		},
		{    
		    'id': 4,
		    'approval_id': 1,
		    'name': '字段4',
		    'en_name': 'fieldfour',
		    'control': '多选框',
		    'info': 'this is a multi selction',
		    'sequence': 4,

		    'selectoptions': 'multi1,multi2,multi3,multi4',

		    //'dateoptions': '年-月-日 时:分,年-月-日',
		    'dateformat':''
		         
		},
		{    
		    'id': 5,
		    'approval_id': 1,
		    'name': '字段5',
		    'en_name': 'fieldfive',
		    'control': '多行输入框',
		    'info': 'multi line input',
		    'sequence': 5,

		    'selectoptions': '',

		    //'dateoptions': '年-月-日 时:分,年-月-日',
		    'dateformat':''
		         
		}	
		]
}

/*
create table procedures 
该表中存放着所有设计过的流程，只有一个是正在使用的，也就是status=1的流程。
belongs_to: approvals
has_many: procedure_nodes
流程表的字段
id 
comment:    string, 该流程的简介说明
created_time: timestamp, 创建时间，也即启用时间
stoped_time:  timestamp, 停用时间，如正在使用则为空
status: integer，1 正在使用， 0 停用
approval_id: 所属的审批的id
*/

var procedure_used = [
	{    
	    'id': 11,	    
	    'created_time': '2017-01-01 08:01:01',
	    'stoped_time': null,
	    'status': 1,
	    'approval_id': 1
	},
	// {    
	//     'id': 1,
	    
	//     'created_time': '2017-05-01 08:10:10',
	//     'stoped_time': '2017-05-05 08:10:10',
	//     'status': 0,
	//     'approval_id': 1     
	// },
	// {    
	//     'id': 1,
	    
	//     'created_time': '2017-06-01 08:20:20',
	//     'stoped_time': '2017-07-01 08:20:20',
	//     'status': 1,
	// 	   'approval_id': 1    
	// },	
]

/*
create table procedure_nodes 
该表中存放着所有设计过的流程的所有，包括停用的流程。
belongs_to: procedures
流程表的字段
id 
name:    string, 该节点的名称，显示时候用
t.references :owner, polymorphic: true ，这里对应某个角色

sequence: integer，序号，代表节点的审批顺序，从小到大
procedure_id: 所属的流程的id
*/
var procedure_nodes = [
	{    
	    'id': 1,	    
	    'name': '审核1',
	    'owner_type': 'Role',
	    'owner_id': 22,
	    'sequence': 0,
	    'procedure_id': 11
	},
	{    
	    'id': 2,	    
	    'name': '审核2',
	    'owner_type': 'Role',
	    'owner_id': 33,
	    'sequence': 1,
	    'procedure_id': 11
	},
	{    
	    'id': 3,	    
	    'name': '审核3',
	    'owner_type': 'Role',
	    'owner_id': 44,
	    'sequence': 2,
	    'procedure_id': 11
	},
		
]


var save_success={
	'msg': '保存成功！'
}
export default [
	{
		//返回某个审批项目的主表字段信息和详表字段信息（如果有详表的话，没有为空）
	    path: '/approval_field_list?approval_id=1',  //这里只模拟了id是1的情况，其他的情况没有模拟，所以当id不是1的时候客户端会出现404错误。
	    data: approval_field_list
	},
	{
	    path: '/approval_list',  //返回公司所有的审批项目
	    data: approval_list
	},
	{
		//接收三个参数 approval_id: 如果是新建表单则为空''，否则是修改的审批的id
                //approval_field_data:主表表单字段信息
                //approval_detail_field_data: 详表字段信息，如果没有则为[]
		path: '/approval_create',
		data: save_success
	},
	{
	    path: '/procedure_used?approval_id=1',  //返回该审批的所有流程（这个没用）
	    data: procedure_used
	},
	{
	    path: '/procedure_nodes?approval_id=1',  //返回正在使用的该审批的流程节点
	    data: procedure_nodes
	},
	{
		/*接收2个参数 approval_id: 审批表approvals的id，proc_nodes: 结点数据(数据格式见本文件var procedure_nodes)，该结点数据中owner_type默认是"Role",其他只有owner_id,name,sequence这3个数据需要保存，其他数据忽略。
		保存时过程：依据approval_id查流程表procedures，如果没有记录，则新创建记录。如果有记录，则将原记录的status设置为0，表示停用，然后再新创建记录。然后将procedure_nodes数据写入procedure_nodes表。
		*/
		path: '/procedure_node_save',
		data: save_success
	}
]