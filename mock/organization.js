export default {
	maxexpandId: 6,
	treelist: [{
	  	id: 1,
	    name: "董事长",  
	    ProSort: 1,  
	    pid: '',
	    isEdit: false,
	    children: [{
	    	id:2,
			name: "总经理",
			pid: 1,
			remark: '',
			isEdit: false,
			children: [
				{
						id:3,
						name: "副总经理",
						pid: 1,
						remark: '',
						isEdit: false,
						children: [
									{
								id:5,
								name: "办公室主任",
								pid: 1,
								remark: '',
								isEdit: false,
								children: []
							},
							{
								id:6,
								name: "工程部经理",
								pid: 1,
								remark: '',
								isEdit: false,
								children: []
							},
						]
					},
				{
				id:4,
				name: "副总经理",
				pid: 1,
				remark: '',
				isEdit: false,
				children: []
		},	
			]
		}
		]
	}
	]
} 