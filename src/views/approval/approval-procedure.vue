<style lang="less">
    @import './proc.less';
</style>
<template>
    <div>
        <Row>            
            <Card>
                <p style="text-align:center;font-size:24px;color: #2db7f5;">
                    {{}}流程设置
                    <span style="float:right;margin-right:100px;"> <Button type="primary" @click="save_and_use">保存并启用</Button></span>
                </p>                    
            </Card>                      
        </Row>
        <Row>
            <Col span="18">
                <Card>
                    <p slot="title">
                        <Icon type="android-funnel"></Icon>
                        审批流程结点
                    </p>
                    <div class="proc"  style="height: 100px;">
                        <div v-for="(item, index) in proc_nodes" class="proc-item">    
                            <span :key="index"  :data-index="index" class="out-span" >
                                <span @click="show_node_info">
                                <Icon type="person" ></Icon>
                                {{ item.name }}</span>
                                <Icon type="close" class="js-remove" @click="del_node"></Icon>
                            </span>
                            <Icon type="ios-arrow-thin-right" class="icon-arrow"></Icon>
                        </div>
                        <Button type="primary" shape="circle" icon="plus" @click="add_new_item"></Button>
                    </div>
                </Card>
            </Col>
            <Col span="6">
                <Card>
                    <p slot="title">
                        <Icon type="android-funnel"></Icon>
                        结点设置
                    </p>
                    <div style="height: 100px;">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">                            
                            <FormItem label="角色" prop="role">
                                <Select v-model="formValidate.role_id" placeholder="请选择角色">
                                    <Option v-for="(item,index) in user_groups" :key="item.id" value="item.id">{{item.name}}</Option>                              
                                    
                                </Select>
                            </FormItem>                   
                          
                        </Form>
                    </div>
                </Card>
            </Col>
        </Row>    
 

  
    </div>
</template>

<script>
export default {
    name: 'approval-procedure',
    data () {
        return {
            user_groups: [],
            proc_nodes:[{    
                'id': 1,        
                'name': '审核1',
                'owner_type': 'Role',
                'owner_id': '22',
                'sequence': 0,
                'procedure_id': 11
            },
            {    
                'id': 2,        
                'name': '审核2',
                'owner_type': 'Role',
                'owner_id': '33',
                'sequence': 1,
                'procedure_id': 11
            },
            {    
                'id': 3,        
                'name': '审核3',
                'owner_type': 'Role',
                'owner_id': '44',
                'sequence': 2,
                'procedure_id': 11
            }],
            cur_node:{
                'id': 0,        
                'name': '',
                'owner_type': '',
                'owner_id': '',
                'sequence': 0,
                'procedure_id': 0
            },
            formValidate: {
                role_id: 0 
            },
            ruleValidate: {
                role_id: [
                    { required: true, message: '角色不能为空', trigger: 'blur' }
                ]
               
            },

                       
        }; //return
    },
    computed: {
        
    },
    watch:{
        
    },
    components:{
        // ApprovalCreateForm,ApprovalCreateFormNew
    },
    mounted () {
        this.init();
        this.$axios.get("/user_group_list")
        .then(res =>{
            // console.log(res.data);
            this.user_groups = res.data;
        })
        .catch( error => {
            console.log(error);
        });
          
    },
    activated () {
        this.init();
    },
    
    methods:{  
        init (){
            // this.approval_id_s = this.$route.params.approval_id.toString();
            // this.approvalName = this.$route.params.approval_name;
            // this.approvalComment = this.$route.params.approval_comment;

            // if(this.approval_id_s=='-1'){
            //     return;
            // }
            // else{
            //     this.$axios
            //     .get("/procedure_used?approval_id=" + this.approval_id_s)
            //     .then(res => {
            //         // this.approval_field_data = res.data.approval_field_data;
            //         // this.approval_detail_field_data = res.data.approval_detail_field_data;
            //     })
            //     .catch(error => {
            //         console.log(error);
            //         this.$Message.error("没有该审批的表单数据！")
            //     });
            // }


        },  
        show_node_info(evt){
            //add style for clicked item
            var el = evt.target.parentElement  
            var cusid_ele = document.getElementsByClassName('out-span');
            for (var i = 0; i < cusid_ele.length; ++i) {
                if( el == cusid_ele[i]){
                    cusid_ele[i].setAttribute("style","border-color: #87b4ee;color: #87b4ee;")
                }else{
                    cusid_ele[i].removeAttribute("style")
                }  
            }
           
        },  
        del_node(){
            alert(22);

        },
        add_new_item(){

        },

        handleReset (name) {
            this.$refs[name].resetFields();
        },
        addNewField(){
            this.approval_field_data.push(JSON.parse(JSON.stringify(this.newFromValidate)));
        },

        addSel(index) {
            this.sel_arr.splice(index+1, 0, "新选项"); 
        },
        removeSel(index) {
            if(this.sel_arr.length > 1){
                this.sel_arr.splice(index , 1);
            }else{
                this.$Message.error('至少一个选项！');
            }
        },
        save_and_use(){
            let list= document.getElementById("editable").getElementsByTagName("li");
            for (let i = 0; i < list.length; i++) {                
                let se = parseInt(list[i].getAttribute("data-index"));
                this.approval_field_data[i].sequence = se;                                  
            }

            list= document.getElementById("editable-new").getElementsByTagName("li");
            for (let i = 0; i < list.length; i++) {                
                let se = parseInt(list[i].getAttribute("data-index"));
                this.approval_detail_field_data[i].sequence = se;                                  
            }

            //发送数据到服务器，然后建表并保存。
            this.$axios.post('/approval_field_save', {
                approval_id: this.approval_id_s,
                approval_field_data: this.approval_field_data,
                approval_detail_field_data: this.approval_detail_field_data
            })
            .then(res => {
                // console.log(response);
                // console.log(res);
                this.$Message.success(res.data.msg);
                // this.$Message.success("xxxx")              
            })
            .catch(error => {
                console.log(error);
            });
           
             
        }               
    }
};
</script>
