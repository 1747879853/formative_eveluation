<style lang="less">
    @import 'draggable-list.less';
</style> 
<template>
<div>
    <Row>            
        <Card>
            <div style="text-align:center;font-size:24px;color: #2db7f5;">
                教师班级课程管理
            </div>  当前学期：
            <Select v-model="option" @on-change="selected()" ref="element1" style="width:200px">
                <Option v-for="(item, index) in term" :key="index" :value="item">{{item}}</Option>
            </Select>                  
        </Card>                      
    </Row>
    <Row>
        <Col span="8">
            <Card>
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    教师&nbsp;&nbsp;&nbsp;
                </p>
                <div style="overflow-y:auto;height:500px;">
                    <ul id="editable-new" class="iview-admin-draggable-list">                            
                        <li v-for="(item, index) in users_data" :key="index" class="notwrap todolist-item" :data-index="index"> 
                        {{ item.name }}</li>
                    </ul>
                </div>
            </Card>
        </Col>
        <Col span="8">
            <Card>
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    班级&nbsp;&nbsp;&nbsp;
                </p>
                <div style="overflow-y:auto;height:500px;">
                <Tree ref="tree1" :data="data1" show-checkbox @on-check-change="check"></Tree>
                </div>
            </Card>
        </Col>
        <Col span="8">
            <Card >
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    可分配课程&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="save()">保存</Button>
                </p>
                <div v-for="(item, index) in course_list" :key="index">
                <p>{{item[0].classname}}：</p>
                    <div style="overflow-y:auto">
                    <Tree ref="tree" :data="item" show-checkbox @on-select-change="check111"></Tree>
                    </div>
                </div>
            </Card>
        </Col>
    </Row>
</div>
</template>
<script>
import Sortable from 'sortablejs';
    export default {
        data () {
            return {
                data1: [
                ],
                data2: [
                ],
                users_data: [
                ],
                course_list:[],
                modal:false,
                select:null,
                mid_data:[],
                option:'',
                term:[],
            }
        },
        mounted () { 
        this.$axios.get("/termList").then( res =>{
            this.term = res.data;
            this.termList();
        }).catch(error =>{
            console.log(error);
        });       

        let editable = document.getElementById('editable-new');
        let vm = this;
        var editableList = Sortable.create(editable, {            
            onChoose: function (evt) {
                var el = editableList.closest(evt.item); 
                vm.select=parseInt(el.getAttribute('data-index'));              
                //为选中的条目添加样式
                let list= document.getElementById("editable-new").getElementsByTagName("li");
                for (let i = 0; i < list.length; i++) {
                    if(list[i] == el){
                        evt.item.setAttribute("style","border-color: #87b4ee;");
                        var ch_id = vm.users_data[parseInt(el.getAttribute('data-index'))].checked_class_id;
                        for(let i=0;i<vm.data1.length;i++){
                            if(ch_id.length!=0){
                                for(let j=0;j<ch_id.length;j++){
                                    if(vm.data1[i].id==ch_id[j]){
                                        vm.data1[i].checked=true;
                                        break;
                                    }
                                    else{vm.data1[i].checked=false;
                                    }
                                }
                            }else{
                                vm.data1[i].checked=false;
                            }
                        } 
                        vm.mid_data = JSON.parse(JSON.stringify(vm.data1));
                        var ch_id1 = vm.users_data[parseInt(el.getAttribute('data-index'))].checked_course;
                        vm.course_list=[];
                        for(let k=0;k<ch_id1.length;k++){
                            var course_data=JSON.parse(JSON.stringify(vm.data2));
                            for(let i=0;i<course_data.length;i++){
                                if(ch_id1[k].checked_id.length!=0){
                                    for(let j=0;j<ch_id1[k].checked_id.length;j++){
                                        if(course_data[i].id==ch_id1[k].checked_id[j]){
                                            course_data[i].checked=true;
                                            course_data[i].classname=ch_id1[k].classname;
                                            break;
                                        }
                                        else{
                                            course_data[i].checked=false;
                                            course_data[i].classname=ch_id1[k].classname;
                                        }
                                    }
                                }else{
                                    course_data[i].checked=false;
                                    course_data[i].classname=ch_id1[k].classname;
                                }
                            }
                            vm.course_list.push(course_data);

                        }
                    }else{
                        list[i].removeAttribute("style");
                    }                    
                }
                
            },
            
        });        

    },
    methods:{       
        termList(){
            let last = new Date();
            last = parseInt(last.getFullYear())+1;
            let termlast = parseInt(this.term[this.term.length-1].substring(0,4));
            // console.log(first)
            let m = last - termlast;
            for(let i = 1;i<=m;i++){
                if(this.term[this.term.length-1].indexOf('春季学期')!=-1){
                    this.term.push(termlast+"秋季学期");                    
                }
                this.term.push(termlast+1+"春季学期");
                this.term.push(termlast+1+"秋季学期");
            }
            let month = new Date();
            month = parseInt(month.getMonth()+1);
            if(month>8){
                this.option=last-1+"秋季学期";
            }else{
                this.option=last-1+"春季学期";
            } 


            this.$axios.post("/tccList", {
                params: {
                    term:this.option,
                }
            }).then( res =>{
                this.users_data = res.data.a;
                this.data1 = res.data.b;
                this.data2 = res.data.c;
            }).catch(error =>{
                console.log(error);
            });


        },
        selected() {
            this.users_data=[];
            this.data1=[];
            this.data2=[];
            this.course_list=[];
            this.$axios.post("/tccList", {
                params: {
                    term:this.option,
                }
            }).then( res =>{
                this.users_data = res.data.a;
                this.data1 = res.data.b;
                this.data2 = res.data.c;                
            }).catch(error =>{
                console.log(error);
            });
        }, 
        showmodal(){
            this.modal=true;
            this.u_name="";
        },
        save (){
            if(this.select==null){
                this.$Message.info('请选中一个教师');
            }else{
                let checked_course=[];
                let m = {class_id:0,classname:'',checked_id:[]};
                let checked_tree = this.$refs.tree1.getCheckedNodes();
                let tree_id = [];
                for(let i=0;i<checked_tree.length;i++){
                    tree_id.push(checked_tree[i].id);
                }
                // console.log(tree_id)
                for(let i=0;i<checked_tree.length;i++){
                    let n=JSON.parse(JSON.stringify(m));
                    n.class_id=checked_tree[i].id;
                    n.classname=checked_tree[i].name;
                    for(let j=0;j<this.course_list.length;j++){
                        if(n.classname==this.course_list[j][0].classname){
                            console.log(this.course_list[j][0].classname)
                            for(let k=0;k<this.course_list[j].length;k++){
                                if(this.course_list[j][k].checked==true){
                                    n.checked_id.push(this.course_list[j][k].id);
                                }
                            }
                        }
                    }
                    checked_course.push(n);
                }
                // console.log(this.users_data[this.select].id)
                this.$axios.patch('/tccList', {
                    params: {
                        term: this.option,
                        id:this.users_data[this.select].id,
                        checked_course:checked_course,
                        checked_class_id:tree_id
                    }
                }).then(function(res) {
                    console.log(res);
                    this.users_data[this.select].checked_course = res.data.checked_course;
                    this.users_data[this.select].checked_class_id = res.data.checked_class_id;
                    this.$Message.info('保存成功');
                }.bind(this))
                .catch(function(error) {
                    console.log(error)
                });
                        
            }   
        },
        check111(selectedList){
            if(selectedList[selectedList.length-1].checked==true){
                selectedList[selectedList.length-1].checked=false;
            }
            else{
                selectedList[selectedList.length-1].checked=true;
            } 
            console.log(this.data1)           
        },
        check(){
            for(let i=0;i<this.data1.length;i++){
                if(this.data1[i].checked!=this.mid_data[i].checked){
                    if(this.data1[i].checked===true){
                        let m = JSON.parse(JSON.stringify(this.data2));
                        m[0].classname=this.data1[i].name;
                        this.course_list.push(m);
                    }else if(this.data1[i].checked===false){
                        for(let j=0;j<this.course_list.length;j++){
                            if(this.course_list[j][0].classname==this.data1[i].name){
                                this.course_list.splice(j,1);
                            }
                        }
                        
                    }
                }
            }
            this.mid_data=JSON.parse(JSON.stringify(this.data1));
        }
    }
}
</script>
