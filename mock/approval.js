//create table approval_groups
//fields: id name
var data = [
	{    
	    'id': 1,
	    'name': '人事'    
	},
	{    
	    'id': 2,
	    'name': '财务'    
	},
	{    
	    'id': 3,
	    'name': '刑政'    
	}
]

//create table approvals
//fields: id name model_name approval_group_id comment
var data1 = [
	{    
	    'id': 1,
	    'name': '采购申请',
	    'en_name': 'PurchaseApproval',
	    'approval_group_id': 1,
	    'comment': "aaaa"
	},
	{    
	    'id': 2,
	    'name': '请假申请',
	    'en_name': 'LeaveApproval',
	    'approval_group_id': 2,
	    'comment': "bbbb"     
	},
	{    
	    'id': 3,
	    'name': '付款申请' ,
	    'en_name': 'PaymentApproval',
	    'approval_group_id': 3,
	    'comment': "cccc"    
	}
]

export default [
	{
	    path: '/approval_group_list',
	    data: data
	},
	{
	    path: '/approval_list',
	    data: data1
	}
]