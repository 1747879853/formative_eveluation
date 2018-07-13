export default {
	treelist: [{
	  	id: 1,
	    name: "董事长",  
	    ProSort: 1,  
	    pid: '',
	    isEdit: false,
	    children: [{
			name: "总经理",
			pid: 1,
			remark: '',
			isEdit: false,
			children: [
				{
						name: "副总经理",
						pid: 1,
						remark: '',
						isEdit: false,
						children: [
									{
								name: "办公室主任",
								pid: 1,
								remark: '',
								isEdit: false,
								children: []
							},
							{
								name: "工程部经理",
								pid: 1,
								remark: '',
								isEdit: false,
								children: []
							},
						]
					},
				{
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