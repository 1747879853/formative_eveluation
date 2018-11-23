<style lang="less">
    @import './components/styles/demo.less';
</style>
<template>
  <div>
    <Card :style="height">
      <div>
        <div style="height: 5px;"></div>
        请选择开停机状态：
        <CheckboxGroup v-model="isStart_Group">
            <Checkbox style="width: 100px;" label="starting">
              <span>开机状态</span>
            </Checkbox>
            <Checkbox style="width: 100px;" label="stoped">
              <span>停机状态</span>
            </Checkbox>
            <Checkbox style="width: 100px;" label="stoping">
              <span>当日停机状态</span>
            </Checkbox>
        </CheckboxGroup>
      </div>
      <div>
        <div style="height: 5px;"></div>
        请选择区块：
        <cascaderMulti style="width: 300px" v-model="end_code" :data="end_codes" placeholder="区块"></cascaderMulti>
      </div>
      <div :style="style" v-show="showMore">
        <div>
          <div style="height: 5px;"></div>
          请选择传感器类型：
          <CheckboxGroup v-model="sensor_type_Group">
              <Checkbox style="width: 100px;flex-warp: wrap;" v-for="sensor_type in sensor_type_data" :label="sensor_type" :key="sensor_type">
              </Checkbox>
          </CheckboxGroup>
        </div>
        <div>
          <div style="height: 5px;"></div>
          请选择油井类型：
          <CheckboxGroup v-model="well_type_Group">
              <Checkbox style="width: 100px;flex-warp: wrap;" v-for="well_type in well_type_data" :label="well_type" :key="well_type">
              </Checkbox>
          </CheckboxGroup>
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
        <Icon type="ios-arrow-down" v-show="!showIsStart"></Icon>
        <Icon type="ios-arrow-up" v-show="showIsStart"></Icon>
        <span>开停状态</span>
      </Button>
      <Button style="float:left;">
        <Icon type="ios-arrow-down" v-show="!showWellType"></Icon>
        <Icon type="ios-arrow-up" v-show="showWellType"></Icon>
        <span>油井类型</span>
      </Button>
      <Button style="float:left;">
        <Icon type="ios-arrow-down" v-show="!showFP"></Icon>
        <Icon type="ios-arrow-up" v-show="showFP"></Icon>
        <span>产液量</span>
      </Button>
      
      <Button type="primary" style="float:right;">重置</Button>
      <Button type="primary" style="float:right;">确定</Button>
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
import inforCard from "./components/wellInforCard.vue";
    export default {
      name: "home",
      components: {
        inforCard,
      },
      data () {
          return {
            isExpand: true,
            showMore: true,
            u_height: 150,
            showIsStart: false,
            showWellType: false,
            showFP: false,
            isStart_Group: [],
            end_code: [],
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
            sensor_type_Group: [],
            sensor_type_data: ["s1","s12","s13","s15","s16","s17","s18","s117","2s18","4s17","5s18","fs17","ds18","sf17","s1s8","sh17","sv18","s17f","s18h","s17s","s1e8"],
            well_type_Group: [],
            well_type_data: ["s1","s12","s13","s15","s16","s17","s18","as517","s1845","45s17","s4518","s1745","s18ry","s15s7","s5418","s1j67","sj6518","s1756","jtes18","s1e6j7","ejs18"],
            checkAllGroup:[],
            // {well_id:"",well_naem:"",isStart:"",sensor:"",flulidProduction:},
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


<!--  <template>
  <div class="hello">
        <div class="icondiv"></div>
        <Menu :active-name="selected" @on-select="menuselect" theme="light" ref="child" style="width:200px":open-names="openname" >
            <template  v-for="(item, index) in listdata"> 
                <template v-if="item.child&&item.child.length>0">
                    <Submenu :name="item.name">
                    <template slot="title">
                        <Icon :class="item.icon"></Icon>
                        {{item.name}}
                    </template>
                    <template v-for="sub in item.child">
                        <MenuItem :name="sub.href">{{sub.name}}</MenuItem>
                    </template>
                        </Submenu>
                </template>
                <template v-else>
                <MenuItem :name="item.href" >
                    <div :class="item.icon"></div>
                    <div class="layout-text">{{item.name}}</div>
                </MenuItem>
              </template>
            </template>
        </Menu>
  </div>
</template>
<script>
export default {
      name: 'menulist',
      data () {
        return {
            listdata:[
                {
                    'name':'公告',
                    'icon':['ixitong','cipp'],
                    'href':'#/menu1',
                },
                {
                    'name':'解惑',
                    'icon':['ianswer','cipp'],
                    'href':'#/menu2',
                },
                {
                    'name':'设置',
                    'icon':['im-extension','cipp'],
                    'child':[
                        {
                            'name':'审核',
                            'href':'#/submenu1',
                        },
                        {
                            'name':'托管',
                            'href':'#/submenu2',
                        },
                    ]
                }
            ],
            selected:"#/submenu1",
            openname:[],
        }
    },
      methods: {
            menuselect (a) {
                this.$router.push({path:a.split('#')[1]});
            },
        watchRoute(){
            if(this.$refs.child&&this.$route.name!="submenu1"&&this.$route.name!="submenu2"){
                this.openname = [];
                    this.$refs.child.$children[2].opened = false;
            }else{
                this.openname = ['设置'];
            }
            this.$nextTick(()=> {
                    this.$refs.child.updateOpened();
                });
        }
      },
      watch:{
            $route(){
                this.watchRoute();
            }
      },
      mounted(){
          this.watchRoute();
      }
}
</script> -->
