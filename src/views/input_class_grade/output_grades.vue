<template>
	<div>
		<Card height="1200px">
			<Row>
				<Col span="3">
					<Select v-model="option_term"   placeholder="选择学期">
			            <Option v-for="(item, index) in term" :key="index" :value="item.id">{{item.name}}</Option>
			        </Select> 
			    </Col>
			    <Col span="7">
			        <Select v-model="option_courses"  placeholder="选择课程" multiple>
			        	<Option v-for="item in courseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			        </Select> 
			        
			    </Col>
			    <Col span="7">
			        <Select v-model="option_class_rooms"   placeholder="选择班级" multiple>
			        	<Option v-for="item in classRoomList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			        </Select> 
			       
			    </Col>
			    <Col span="7">
			        <Select v-model="option_teachers"   placeholder="选择教师" multiple>            
			             <Option v-for="item in teacherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			        </Select> 
			        
			    </Col>
			    
		    	
	    	</Row>
	    	<Row>
				<Col span="3">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			    </Col>
			    <Col span="7">
			       	<Checkbox v-model="course_all">课程全选</Checkbox>
			        
			    </Col>
			    <Col span="7">
			        <Checkbox v-model="class_room_all">班级全选</Checkbox>
			        
			    </Col>
			    <Col span="6">
			      	<Checkbox v-model="teacher_all">教师全选</Checkbox>
			        
			    </Col>
			    <Col span="1">
			        <Button type="primary" @click="output_grades()">查看</Button>
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
		output_grades() {
			
			this.data7 = []
			//console.log(this.option_class_rooms)
			if(this.course_all==false){
				this.final_courses = this.option_courses
			}
			 if(this.class_room_all==false){
				this.final_class_rooms = this.option_class_rooms
			}
			 if(this.teacher_all==false){
				this.final_teachers = this.option_teachers
			}
			if(this.option_term=="" || (this.option_class_rooms.length==0&&this.class_room_all==false) || (this.option_teachers.length==0&&this.teacher_all==false) || (this.option_courses.length==0&&this.course_all==false)){
				this.$Message.info("课程、学期、教师、班级不能为空！")
			}else{
				console.log(this.option_teachers)
				console.log(this.option_courses)
				console.log(this.option_class_rooms)
				console.log(this.final_teachers)
				console.log(this.final_courses)
				console.log(this.final_class_rooms)
				this.$axios.get("/output_grades",{
					params:{
	            		term:this.option_term,
	            		course:this.final_courses,
	            		teacher:this.final_teachers,
	            		class_room:this.final_class_rooms
	          		}
				}).then( res =>{
					console.log(res.data)
					
        
                    for(let i =0;i<res.data.k.length;i++){
                    	this.data7.push({
	                    	"name": res.data.k[i].students_name,
	                    	"grade": res.data.k[i].grade,
	                    	"student_id": res.data.k[i].students_num,
	                    	"evaluation": res.data.k[i].evaluations,
	                    	"course": res.data.k[i].course_name,
	                    	"teacher": res.data.k[i].teachers_name,
	                    	"describe": res.data.k[i].description,
	                    	"class_room": res.data.k[i].class_rooms_name
                    	})
                    }
                    
                    console.log("sdsdsdfsd")
				}).catch(error =>{
				    console.log(error);
				})
			}
		},
		exportData () {
                
                    this.$refs.table.exportCsv({
                        filename: '学生成绩表'
                    });
                }
	},
	data () {
      return {
      	teacherList: [],
      	classRoomList:[],
      	courseList:[],
      	term:[],
      	option_term:"",
      	option_courses:[],
      	option_class_rooms:[],
      	option_teachers:[],
      	final_courses:[],
      	final_teachers:[],
      	final_class_rooms:[],
      	teacher_all:false,
      	course_all:false,
      	class_room_all:false,
      	columns8: [
      				{
                        "title": "成绩",
                        "key": "grade",
                       
                    },
                    {
                        "title": "姓名",
                        "key": "name",
                        
                    },
                    {
                        "title": "学号",
                        "key": "student_id",
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
                        "title": "教师",
                        "key": "teacher",
                        
                        
                    },
                    {
                        "title": "指标",
                        "key": "evaluation",
                       
                        
                    },
                    {
                        "title": "指标描述",
                        "key": "describe",
                        
                        
                    }
                ],
                data7: [ ]


      }
  	},
	mounted() {
		this.teacherList =[]
		this.classRoomList=[]
		this.courseList =[]
		this.term = []
		this.$axios.get("/get_teacher_course_list",{
		}).then( res =>{
		   for(let i = 0;i< res.data.a.length;i++){
		      this.teacherList.push({value:res.data.a[i].name,label:res.data.a[i].name})
		   }
		   for(let i = 0;i<res.data.c.length;i++){
		    this.classRoomList.push({value:res.data.c[i].name,label:res.data.c[i].name})
		   }
		   for(let i =0;i<res.data.b.length;i++){
		      this.courseList.push({value:res.data.b[i].name,label:res.data.b[i].name})
		   }
		   for(let i =0;i<res.data.d.length;i++){
		      this.term.push(res.data.d[i])
		   }
		          console.log(res.data)
		          console.log(this.term)
		}).catch(error =>{
		    console.log(error);
		})
	},
	watch: {
    'teacher_all'() {
    	if(this.teacher_all==true){
    		for(let i =0;i<this.teacherList.length;i++){
    			this.final_teachers.push(this.teacherList[i].value)
    		}
    		
    	}else{
    		this.final_teachers = []
    	}
    },
    'course_all'() {
    	

     	if(this.course_all==true){
     		
     		for(let i = 0;i<this.courseList.length;i++)
     		{
     			this.final_courses.push(this.courseList[i].value)
     			console.log(this.courseList[i].name)
     			
     		}
     		console.log("sssdasdasd"+this.final_courses)
     		
     	}else {
     		this.final_courses = []
     	}
     	console.log(this.final_courses)
    },
    'class_room_all'() {
    	if(this.class_room_all==true){
    		for(let i =0;i < this.classRoomList.length;i++){
    			this.final_class_rooms.push(this.classRoomList[i].value)
    		}
    		
    	}else{
    		this.final_class_rooms = []
    	}
    }
  }
}
</script>