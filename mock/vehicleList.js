import Mock from 'mockjs'

let arr;

let list = function(options){
 	let rtype = options.type.toLowerCase();
 	switch(rtype){
 		case'get':
 		arr=[
 		{
 			id:'642',
 			vid:'鲁H76Q88',
 			cag:'IN',
 			cagt:'2018-04-01 05:40',
 			type:'1',
 			pic:'图片',
 		},
 		{
 			id:'643',
 			vid:'鲁H76Q88',
 			cag:'IN',
 			cagt:'2018-04-01 05:40',
 			type:'1',
 			pic:'图片',
 		},
 		{
 			id:'644',
 			vid:'鲁H76Q88',
 			cag:'IN',
 			cagt:'2018-04-01 05:40',
 			type:'1',
 			pic:'图片',
 		},
 		{
 			id:'645',
 			vid:'鲁H76Q88',
 			cag:'IN',
 			cagt:'2018-04-01 05:40',
 			type:'1',
 			pic:'图片',
 		},
 		{
 			id:'646',
 			vid:'鲁H76Q88',
 			cag:'IN',
 			cagt:'2018-04-01 05:40',
 			type:'1',
 			pic:'图片',
 		},
 		{
 			id:'647',
 			vid:'鲁H76Q88',
 			cag:'IN',
 			cagt:'2018-04-01 05:40',
 			type:'1',
 			pic:'图片',
 		},
 		{
 			id:'648',
 			vid:'鲁H76Q88',
 			cag:'IN',
 			cagt:'2018-04-01 05:40',
 			type:'1',
 			pic:'图片',
 		},
 		{
 			id:'649',
 			vid:'鲁H76Q88',
 			cag:'IN',
 			cagt:'2018-04-01 05:40',
 			type:'1',
 			pic:'图片',
 		},
 		{
 			id:'650',
 			vid:'鲁H76Q88',
 			cag:'IN',
 			cagt:'2018-04-01 05:40',
 			type:'1',
 			pic:'图片',
 		},
 		{
 			id:'651',
 			vid:'鲁H76Q88',
 			cag:'IN',
 			cagt:'2018-04-01 05:40',
 			type:'1',
 			pic:'图片',
 		},
 		{
 			id:'652',
 			vid:'鲁H76Q88',
 			cag:'IN',
 			cagt:'2018-04-01 05:40',
 			type:'1',
 			pic:'图片',
 		},
 		]
 		return arr;
 		break;
        default:
 	}
 	return arr;
 };

 export default{
 	path: '/vehicleList',
 	data: list,
 }