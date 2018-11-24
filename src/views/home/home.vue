 <style lang="less">
    @import './components/styles/demo.less';
</style>
<template>
  <div>
    <Card :style="height">
      <div style="padding: 5px 5px 5px 5px;">
        <div style="height: 5px;"></div>
        <select-card @selectedGroup="statusSelectedGroup" @selected="statusSelected" type="开停机状态" :groups="status" ></select-card>
      </div>
      <div style="border-bottom: 1px dotted #e8e8e8;padding: 5px 5px 5px 5px;">
        <div style="height: 5px;"></div>
        <h3>请选择区块：</h3>
        <cascaderMulti style="width: 300px" v-model="end_code" :data="end_codes" trigger="hover" placeholder="区块"></cascaderMulti>
      </div>
      <div :style="style" v-show="showMore">
        <select-card @selectedGroup="sensorTypeSelectedGroup" @selected="sensorTypeSelected" type="传感器类型" :groups="sensor_type_data"></select-card>
        <select-card @selectedGroup="wellTypeSelectedGroup" @selected="wellTypeSelected" type="油井类型" :groups="well_type_data"></select-card>
        <div style="padding: 5px 5px 5px 5px;">
          <Input v-model="well_name_v" placeholder="请输入井名..." style="width: 150px"></Input>
          <Button type="primary" @click="well_name_click">确定</Button>
        </div>
      </div> 
      <br>
      <div class="example-code-more" @click="click">
          <Icon type="ios-arrow-down" v-show="!showMore"></Icon>
          <Icon type="ios-arrow-up" v-show="showMore"></Icon>
      </div>
    </Card>
    <div style="height: 5px;"></div>
    <div style="height: 35px;">
      <Button style="float:left;">
        <span>开停状态</span>
        <Icon type="chevron-down" v-show="!showIsStart"></Icon>
        <Icon type="chevron-up" v-show="showIsStart"></Icon>
      </Button>
      <Button style="float:left;">
        <span>油井类型</span>
        <Icon type="chevron-down" v-show="!showWellType"></Icon>
        <Icon type="chevron-up" v-show="showWellType"></Icon>
      </Button>
      <Button style="float:left;">
        <span>产液量</span>
        <Icon type="chevron-down" v-show="!showFP"></Icon>
        <Icon type="chevron-up" v-show="showFP"></Icon>
      </Button>
    </div>
    <Row :gutter="5">
        <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}" v-for="item in wellinfor" :key=item.well_id>
            <infor-card
                :wellName=item.well_name
                :isStart=item.isStart
                :sensor=item.sensor
                :flulidProduction=item.flulidProduction
            ></infor-card>
        </Col>
    </Row>
  </div>
</template>
<script>
import inforCard from "./components/wellInforCard.vue"
import selectCard from "./components/selectCard.vue";
    export default {
      name: "home",
      components: {
        inforCard,
        selectCard,
      },
      data () {
          return {
            isExpand: true,
            showMore: true,
            u_height: 170,
            showIsStart: false,
            showWellType: false,
            showFP: false,
            isStart_Group: [],
            end_code: [],
            well_name_v: '',
            end_codes: [
              {
                value: 1000,
                label: "区块",
                multiple: true,
                children: [{
                  label: "区块",
                  value: 1100,
                  children: [],
                  multiple: true //可忽略项，当为true时该项为多选
                },{
                  label: "区块",
                  value: 1100,
                  children: [],
                  multiple: true //可忽略项，当为true时该项为多选
                },
                {
                  label: "区块",
                  value: 1100,
                  children: [],
                  multiple: true //可忽略项，当为true时该项为多选
                }]
              }
            ],
            status: ["开机状态","停机状态","当日停机状态"],
            sensor_type_Group: [],
            sensor_type_data: ["s1","s12","s13","s15","s16","s17","s18","s117","2s18","4s17","5s18","fs17","ds18","sf17","s1s8","sh17","sv18","s17f","s18h","s17s","s1e8"],
            well_type_Group: [],
            well_type_data: ["s1","s12","s13","s15","s16","s17","s18","as517","s1845","45s17","s4518","s1745","s18ry","s15s7","s5418","s1j67","sj6518","s1756","jtes18","s1e6j7","ejs18"],
            checkAllGroup:[],
            wellinfor:[
              {well_id:"well-1",well_name:"well-1",isStart:1,sensor:['传感器1','传感器1','传感器1','传感器1'],flulidProduction:150},
              {well_id:"well-12",well_name:"well-12",isStart:0,sensor:['传感器1','传感器1','传感器1','传感器1'],flulidProduction:200},
              {well_id:"well-13",well_name:"well-13",isStart:1,sensor:['传感器1','传感器1','传感器1','传感器1'],flulidProduction:300},
              {well_id:"well-14",well_name:"well-14",isStart:-1,sensor:['传感器1','传感器1','传感器1','传感器1'],flulidProduction:300},
              {well_id:"well-15",well_name:"well-15",isStart:-1,sensor:['传感器1','传感器1','传感器1','传感器1'],flulidProduction:300},
              {well_id:"well-16",well_name:"well-16",isStart:-1,sensor:['传感器1','传感器1','传感器1','传感器1'],flulidProduction:300},
            ],
          }
      },
      methods: {
        well_name_click(){
          console.log(this.well_name_v);
        },
        // 单选
        statusSelected(data){
          console.log(data);
        },
        //
        wellTypeSelected(data){
          console.log(data);
        },
        //
        sensorTypeSelected(data){
          console.log(data);
        },
        // 开停机状态选择
        statusSelectedGroup(data){
          console.log(data);
        },
        //传感器状态选择
        sensorTypeSelectedGroup(data){
          console.log(data);
        },
        //油井类型选择
        wellTypeSelectedGroup(data){
          console.log(data);
        },
        click(){
          this.showMore = !this.showMore;
          this.isExpand = !this.isExpand;
        }
      },
      computed: {
          height () {
              let style = {};
              if (this.isExpand) {
                  // style.height = `${this.e_height}px`;
              } else {
                  style.height = `${this.u_height}px`;
              }
              return style;
          },
          style () {
              let style = {
                  opacity: 1
              };
              if (!this.isExpand) {
                  style.opacity = 0;
              }
              return style;
          },
      },
    }
</script>

