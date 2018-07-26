<style lang="less">
    @import './proc.less';
</style>
<template>
    <div>
        <Row>            
            <Card>
                <p style="text-align:center;font-size:24px;color: #2db7f5;">
                    {{approval_admin_name}}流程设置
                    <span style="float:right;margin-right:100px;"> <Button type="primary" @click="save_proc_nodes">保存</Button></span>
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
                        
                        <Input v-model="proc_name" placeholder="请输入结点名称" clearable ></Input>


                        <Select v-model="role_id" placeholder="请选择角色" style="margin-top:10px;">
                            <Option v-for="(item,index) in user_groups" :key="item.id" :value="item.id">{{item.title}}</Option>                              
                            
                        </Select>
                            
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
            approval_admin_id: 0,
            approval_admin_name: '',
            user_groups: [],
            proc_nodes:[],
            new_proc_node: {
                'id': 0,        
                'name': '审批结点',
                'owner_type': 'AuthGroup',
                'owner_id': 0,
                'sequence': 0,
                'procedure_id': 0
            },
            role_id: 0 ,
            proc_name: "审批结点",
            proc_node_selected: -1, 
        }; //return
    },
    computed: {
        
    },
    watch:{
        role_id(curVal,oldVal){
            if(this.proc_nodes[this.proc_node_selected]){
                this.proc_nodes[this.proc_node_selected].owner_id = curVal;
            }
        },
        proc_name(curVal,oldVal){
            if(this.proc_nodes[this.proc_node_selected]){
                this.proc_nodes[this.proc_node_selected].name = curVal;
            }
        }
        
    },
    components:{
        // ApprovalCreateForm,ApprovalCreateFormNew
    },
    mounted () {
        this.init();        
          
    },    
    activated () {
        this.init();
    },
    //bug:???????????????????????
    // 组件内导航钩子，处理未保存退出的情况
    // beforeRouteLeave: function(to, from , next){
    //       next(false)
    //       this.$confirm('您还未保存简介，确定需要提出吗?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }).then(() => {
    //         // 选择确定
    //         next()
    //       })
    // },   
    methods:{
        init (){
            this.$axios.get("/user_group_list")
            .then(res =>{
                // console.log(res.data);
                this.user_groups = res.data || [];
            })
            .catch( error => {
                this.user_groups = [];
                console.log(error);
            });

            this.approval_admin_id = this.$route.params.approval_admin_id;
            this.approval_admin_name = this.$route.params.approval_admin_name;

            this.$axios
            .get("/procedure_nodes?approval_admin_id=" + this.approval_admin_id)
            .then(res => {
                this.proc_nodes = res.data || [];
            })
            .catch(error => {
                this.proc_nodes = [];
                console.log(error);
                this.$Message.error("该审批的结点数据获取失败，请检查服务器！");
                //bug: should close this tag????????
            });
           


        },
         
        show_node_info(evt){
            //add style for clicked item
            var el = evt.target.parentElement  
            var cusid_ele = document.getElementsByClassName('out-span');
            for (var i = 0; i < cusid_ele.length; ++i) {
                if( el == cusid_ele[i]){
                    cusid_ele[i].setAttribute("style","border-color: #87b4ee;color: #87b4ee;");
                    this.role_id = this.proc_nodes[parseInt(el.getAttribute("data-index"))].owner_id;
                    this.proc_name = this.proc_nodes[parseInt(el.getAttribute("data-index"))].name,
                    this.proc_node_selected = i;
                    // debugger
                    // alert(this.formValidate.role_id);
                }else{
                    cusid_ele[i].removeAttribute("style")
                }  
            }           
        },  
        del_node(evt){
            // alert(22);
            var el = evt.target.parentElement
            this.proc_nodes.splice(parseInt(el.getAttribute('data-index')),1)

        },
        add_new_item(){
            this.proc_nodes.push(JSON.parse(JSON.stringify(this.new_proc_node)));
        },        
        save_proc_nodes(){

            //根据数组proc_nodes中结点顺序重新设置sequence字段的值
            for (let i = 0; i < this.proc_nodes.length; i++) {                
                this.proc_nodes[i].sequence = i; 
                if(this.proc_nodes[i].owner_id == 0 ){
                    this.$Message.error("结点对应角色设置不完整！");
                    return
                }                               
            }
            //发送数据到服务器保存。
            this.$axios.post('/procedure_create', {
                approval_admin_id: this.approval_admin_id,
                proc_nodes: this.proc_nodes,
            })
            .then(res => {
                // console.log(response);
                // console.log(res);
                this.$Message.success(res.data.msg);
                this.$store.commit('clearCurrentTag', this);
                this.$router.go(-1);
            })
            .catch(error => {
                this.$Message.error('保存失败，请检查服务器设置！');
                console.log(error);
            });
        }               
    }
};
</script>
