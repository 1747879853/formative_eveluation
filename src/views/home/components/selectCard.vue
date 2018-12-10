<template>
    <div style="border-bottom: 1px dotted #e8e8e8;padding: 5px 5px 5px 5px;">
      <div style="height: 5px;"></div>
      <!--<h3>{{ this.$t('t_please') }} {{ type }}：</h3>-->
      <div >
        <div v-show="isBox">
            <CheckboxGroup v-model="selected_groups" v-if="sensorTypeShow">
              <Checkbox style="width: 150px;" label="all">
                <span>{{ this.$t('t_all') }}</span>
              </Checkbox>
              <Checkbox style="width: 150px;flex-warp: wrap;" v-for="item in groups_show" :label="item.id" :key="item.id">{{ item.name }}
              </Checkbox>
              <Button type="primary" size="small" style="position:absolute;right:18%;" @click="sureClick">{{ this.$t('t_sure') }}</Button>
              <Button type="primary" size="small" style="position:absolute;right:10%;" @click="recover()">{{ this.$t('t_cancel') }}</Button>
            </CheckboxGroup>
            <CheckboxGroup v-model="selected_groups" v-if="wellShow">
              <Checkbox style="width: 150px;" label="all">
                <span>{{ this.$t('t_all') }}</span>
              </Checkbox>
              <Checkbox style="width: 150px;flex-warp: wrap;" v-for="item in groups_show" :label="item.id" :key="item.id">{{ item.name }}
              </Checkbox>
              <Button type="primary" size="small" style="position:absolute;right:18%;" @click="sureClick">{{ this.$t('t_sure') }}</Button>
              <Button type="primary" size="small" style="position:absolute;right:10%;" @click="recover()">{{ this.$t('t_cancel') }}</Button>
            </CheckboxGroup>
            <CheckboxGroup v-model="selected_groups" v-if="statusShow">
              <Checkbox style="width: 150px;" label="all">
                <span>{{ this.$t('t_all') }}</span>
              </Checkbox>
              <Checkbox style="width: 150px;flex-warp: wrap;" v-for="item in groups_show" :label="item.id" :key="item.id">{{ item.name }}
              </Checkbox>
              <Button type="primary" size="small" style="position:absolute;right:18%;" @click="sureClick">{{ this.$t('t_sure') }}</Button>
              <Button type="primary" size="small" style="position:absolute;right:10%;" @click="recover()">{{ this.$t('t_cancel') }}</Button>
            </CheckboxGroup>
        </div>
        <div v-show="!isBox">
            <Button size="small" type="text" style="flex-warp: wrap;position:absolute;left:1%;">{{ type }}：</Button>
            <Button size="small" type="text" style="flex-warp: wrap;"></Button>
            <Button size="small" type="text" style="flex-warp: wrap;"></Button>
            <Button size="small" type="text" style="flex-warp: wrap;"></Button>
            <Button size="small" type="text" style="flex-warp: wrap;"></Button>
            <Button size="small" type="text" style="flex-warp: wrap;" @click="getItem('all')">{{ this.$t('t_all') }}</Button>
            <Button v-if="sensorTypeShow" size="small" type="text" style="flex-warp: wrap;" v-for="item in groups_show" :key="item.id" @click="getItem(item)">{{ item.name }}</Button>
            <Button v-if="wellShow" size="small" type="text" style="flex-warp: wrap;" v-for="item in groups_show" :key="item.id" @click="getItem(item)">{{ item.name }}</Button>
            <Button v-if="statusShow" size="small" type="text" style="flex-warp: wrap;" v-for="item in groups_show" :key="item.name" @click="getItem(item)">{{ item.name }}</Button>
            <span v-show="isMore||show_more" style="color: #ff9900;right:100px;position:absolute;cursor:pointer;" @click="expend_click()">
                {{ this.$t('t_expendMore') }}
                <Icon type="chevron-down" v-show="icon_show_more"></Icon>
                <Icon type="chevron-up" v-show="!icon_show_more"></Icon>
            </span>
            <span style="color: #2d8cf0;right:15px;position:absolute;cursor:pointer;" @click="isCheckbox()">{{ this.$t('t_checkbox') }}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'selectCard',
    props: {
        type: String,
        groups: Array,
    },
    methods: {
        typecheck(){
            if (this.type == this.$t('t_sensorType')) {
                this.sensorTypeShow = true;
            }else if(this.type == this.$t('t_wellType')){
                this.wellShow = true;
            }else if(this.type == this.$t('t_status')){
                this.statusShow = true;
            }
        },
        getItem(item){
            this.$emit('selected',item);
        },
        sureClick(){
            this.$emit('selectedGroup',this.selected_groups,this.groups_show);
            if (this.isBox) {
                if (this.isMore) {
                    this.show_more=true;
                }
                this.groups_show=this.groups.slice(0,9);
                this.isBox=false;             
            }
        },
        recover(){
            if (this.isBox) {
                if (this.isMore) {
                    this.show_more=true;
                }
                this.groups_show=this.groups.slice(0,9);
                this.isBox=false;  
                this.selected_groups=[];
                // debugger
                this.$emit('cancle',this.type);
            }
        },
        isCheckbox(){
            // this.show_more=false;
            this.groups_show=this.groups;
            this.isBox=true;
        },
        expend_click(){
            if (this.show_more) {
                this.show_more=false;
                this.groups_show=this.groups;
            }else{
                this.show_more=true;
                this.groups_show=this.groups.slice(0,9);
            }
        },
        init_groups_show(){
            if (this.groups.length>9) {
                this.isMore=true;
                this.show_more=true;
                this.groups_show=this.groups.slice(0,9);
            }else{
                this.groups_show=this.groups;
            }
        },
    },
    data() {
        return {
            //可供选择数据是不是多余九个
            isMore:false,
            show_more:false,
            isBox:false,
            selected_groups:["all"],
            groups_show:[],
            //不同类型显示
            statusShow: false,
            sensorTypeShow: false,
            wellShow: false,
        }
    },
    mounted() {
        this.init_groups_show();
        this.typecheck();
    },
    watch: {
        groups: {  
    　　　　handler(newValue, oldValue) {   
                this.init_groups_show();
    　　　　},  
    　　　　deep: true  
    　　}  
    },
    computed: {
        icon_show_more(){
            // if (this.show_more) {
            //     return true;
            // }else{
            //     return false;
            // }
            return this.show_more;
        }
    },
};
</script>



