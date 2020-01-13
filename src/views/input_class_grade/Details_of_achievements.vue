<template>
	<div>
		<Card height="1200px">
			<Row>
				<Col span="3">
					<Select v-model="option_term"   placeholder="选择学期" @on-change="change_term">
			            <Option v-for="(item, index) in term" :key="index" :value="item.id">{{item.name}}</Option>
			        </Select> 
			    </Col>
			    <Col span="3">
			    &nbsp;
				</Col>
			    <Col span="17">
			        <RadioGroup v-model="button4" type="button" size="large">
			        	<div >
			        		<Radio  v-for=" item in radio_name" :label="item.name"></Radio>
			        	</div>
				        
				    </RadioGroup>
			    </Col>
			   	<Col span="1">
			   	<Button type="primary" @click="get_list()">
			   		确定
			   	</Button>
			   	</Col>
	    	</Row>
	    	<Row>
		    	<Col span="24">
		    		<Table :columns="columns8" :data="data7" size="small" ref="table"></Table>
		    	</Col>
	    	</Row>
	    	<Row>
		    	<Col span="24">
		    		<Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon> Export data</Button>
		    	</Col>
	    	</Row>
	        
		</Card>
	</div>
</template>
<script >
export default {
	methods:{ 
		get_list() {
			for (var i = 0; i < this.radio_name.length; i++) {
				if(this.radio_name[i].name == this.button4){
					this.course_id = this.radio_name[i].course_id
					this.class_room_id = this.radio_name[i].class_room_id
				}
			}
			this.$axios.get("/get_detail_list",{
				params:{
	            		term:this.term_id,
	            		course_id:this.course_id,
	            		class_room_id:this.class_room_id
	          		}
			}).then( res =>{
				this.data7 = res.data.a
			})
		},
		change_term(value) {
			this.term_id = value
			this.$axios.get("/get_teachers_course",{
				params:{
	            		term:value
	          		}
			}).then( res =>{
				this.radio_name = res.data.a
			})
			
		},
		exportData () {
                
                    this.$refs.table.exportCsv({
                        filename: '学生成绩表'
                    });
                }
		
	},
	data () {
      return {
      	class_room_id:'',
      	course_id:'',
      	term_id:'',
      	button4:'',
      	option_term:'',
      	term:[],
      	radio_name:[],
      	columns8: [
      				
                    {
                        "title": "姓名",
                        "key": "name",
                        
                    },
                    {
                        "title": "学号",
                        "key": "sno",
                    },
                    
                    {
                        "title": "班级",
                        "key": "class_room",
                    },
                    {
                        "title": "课程",
                        "key": "course",
                    },
                    {
                        "title": "平时成绩",
                        "key": "score",
                       
                    },
                ],
                data7: [ ]
      }
  	},
	mounted() {
	this.$axios.get("/get_detail_achieve",{
	}).then( res =>{
		for(let i =0;i<res.data.term.length;i++){
		      this.term.push(res.data.term[i])
		   }
	})
	},
	watch: {
  }
}
</script>