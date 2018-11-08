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
                    {{$t('t_region_well_base')}}&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="save()">{{$t('t_save')}}</Button>
                </p>
                <div style="overflow-y:auto;height:500px;">
                <div style="overflow-y:auto;height:500px;">
                    <CheckboxGroup v-model="wellList">
                    <ul id="editable-new" class="iview-admin-draggable-list">                      
                        <li v-for="(item, index) in well_data" :key="index" class="notwrap todolist-item" :data-index="index" @click="click_li(item)">
                        <Checkbox :label="item.well_id">{{ item.well_name }}</Checkbox></li>
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
                well_data: [              
                ],
                region_id:'',
                wellList: [
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

        this.$axios.get("/wellList").then( res =>{
            vm.well_data = res.data;
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
                        this.$axios.get('/region_wellBases', {
                                params: {
                                    id:this.region_id,
                                }
                            }).then(function(res) {
                                if (res.data.length>0) {
                                    this.wellList = [];
                                    for(var i = 0;i<res.data.length;i++){
                                        this.wellList.push(res.data[i].well_id);
                                    }
                                }else{
                                    this.wellList = [];
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
                if(this.wellList.length<1){
                    this.$Message.info(this.$t('t_check_atleast_one_well'));
                }else{
                    this.$axios.post('/region_wellBases', {
                                    params: {
                                        wellList:this.wellList,
                                        region_id:this.region_id
                                    }
                                }).then(function(res) {
                                    if (parseInt(res.data) == this.wellList.length) {
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
                if (this.containV(this.wellList,item.well_id)) {
                    this.wellList.splice(this.returnIndex(this.wellList,item.well_id),1);
                }else{
                    this.wellList.push(item.well_id);
                }
            }else{
                this.$Message.error(this.$t('t_check_region_firstly'));
                this.wellList = [];
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
