<style lang="less">
    @import 'draggable-list.less';
</style> 
<template>
<div>
    <Row>            
        <Card>
            <div style="text-align:center;font-size:24px;color: #2db7f5;">
                {{$t('t_region_user_manage')}}
            </div>                    
        </Card>                      
    </Row>
    <Row>
        <Col span="12">
            <Card>
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    {{$t('t_region')}}&nbsp;&nbsp;&nbsp;
                </p>
                <Tree id="data_regions" :render="renderContent" ref="tree" :data="data_regions"></Tree>
            </Card>
        </Col>
        <Col span="12">
            <Card >
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    {{$t('t_user')}}&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="save()">{{$t('t_save')}}</Button>
                </p>
                <div style="overflow-y:auto;height:500px;">
                <div style="overflow-y:auto;height:500px;">
                    <CheckboxGroup v-model="userList">
                    <ul id="editable-new" class="iview-admin-draggable-list">                      
                        <li v-for="(item, index) in users_data" :key="index" class="notwrap todolist-item" :data-index="index" @click="click_li(item)">
                        <Checkbox :label="item.id">{{ item.user_name }}</Checkbox></li>
                    </ul>
                    </CheckboxGroup>
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
                data_regions: [
                ],
                users_data: [              
                ],
                region_id:'',
                userList: [
                ],
            }
        },
        mounted () { 
        let vm = this;
        this.$axios.get("/region_list").then( res =>{
            vm.data_regions = res.data;
        }).catch(error =>{
            console.log(error);
        });

        this.$axios.get("/userList").then( res =>{
            vm.users_data = res.data;
        }).catch(error =>{
            console.log(error);
        });     

    },
    methods:{  
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%',
                },
                on: {
                    click: (h) => { 
                        this.region_id = data.id;
                        this.$axios.get('/region_userlist', {
                                params: {
                                    id:this.region_id,
                                }
                            }).then(function(res) {
                                if (res.data.length>0) {
                                    this.userList = [];
                                    for(var i = 0;i<res.data.length;i++){
                                        this.userList.push(res.data[i].user_id)
                                    }
                                }else{
                                    this.userList = [];
                                }
                            }.bind(this))
                            .catch(function(error) {
                                console.log(error)
                            });                              
                    }            
                }
            }, 
            [
                h('Button',[
                    h('span', data.title)
                ],),
            ]
            );
        },
        save (){
            if((typeof this.region_id) == "number"){
                if(this.userList.length<1){
                    this.$Message.info(this.$t('t_check_atleast_one_user'));
                }else{
                    this.$axios.post('/region_userlist', {
                                    params: {
                                        userList:this.userList,
                                        region_id:this.region_id
                                    }
                                }).then(function(res) {
                                    if (res.data == this.userList.length) {
                                        this.$Message.info(this.$t('t_save_successful'));
                                    }else{
                                        this.$Message.error(this.$t('t_save_failed'));
                                    }
                                    
                                }.bind(this))
                                .catch(function(error) {
                                    console.log(error)
                                });                              
                } 
            }else{
                this.$Message.error(this.$t('t_check_region_firstly'));
            }
        },
        click_li(item){
            if((typeof this.region_id) == "number"){
                if (this.containV(this.userList,item.id)) {
                    this.userList.splice(this.returnIndex(this.userList,item.id),1);
                }else{
                    this.userList.push(item.id);
                }
            }else{
                this.$Message.error(this.$t('t_check_region_firstly'));
                this.userList = [];
            }
        },
        containV(array,v){
            for(var i=0;i<array.length;i++){
                if (array[i] == v) {
                    return true;
                } 
            }
            return false;
        },
        returnIndex(array,v){
            for(var i=0;i<array.length;i++){
                if (array[i] == v) {
                    return i;
                }
            }
        }

    }
}
</script>
