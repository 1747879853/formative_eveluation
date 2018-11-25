<template>
    <div style="border-bottom: 1px dotted #e8e8e8;padding: 5px 5px 5px 5px;">
      <div style="height: 5px;"></div>
      <h3>{{ this.$t('t_please') }} {{ type }}：</h3>
      <div >
        <div v-show="isBox">
            <CheckboxGroup v-model="selected_groups">
              <Checkbox style="width: 100px;" label="all">
                <span>{{ this.$t('t_all') }}</span>
              </Checkbox>
              <Checkbox style="width: 100px;flex-warp: wrap;" v-for="item in groups_show" :label="item" :key="item">
              </Checkbox>
              <Button type="primary" size="small" style="position:absolute;right:18%;" @click="sureClick">{{ this.$t('t_sure') }}</Button>
              <Button type="primary" size="small" style="position:absolute;right:10%;" @click="recover()">{{ this.$t('t_cancel') }}</Button>
            </CheckboxGroup>
        </div>
        <div v-show="!isBox">
            <Button size="small" type="text" style="flex-warp: wrap;" @click="getItem('all')">{{ this.$t('t_all') }}</Button>
            <Button size="small" type="text" style="flex-warp: wrap;" v-for="item in groups_show" :key="item" @click="getItem(item)">{{ item }}</Button>
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
        getItem(item){
            this.$emit('selected',item);
        },
        sureClick(){
            this.$emit('selectedGroup',this.selected_groups);
        },
        recover(){
            if (this.isBox) {
                if (this.isMore) {
                    this.show_more=true;
                }
                this.groups_show=this.groups.slice(0,9);
                this.isBox=false;  
                this.selected_groups=[];              
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
            // debugger
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
        }
    },
    mounted() {
        this.init_groups_show();
    },
    watch: {
    },
    computed: {
        icon_show_more(){
            if (this.show_more) {
                return true;
            }else{
                return false;
            }
        }
    },
};
</script>



