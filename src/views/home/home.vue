 <style lang="less">
    @import './components/styles/demo.less';
</style>
<template>
  <div>
    <Card :style="height">
      <div style="padding: 5px 5px 5px 5px;">
        <div style="height: 5px;"></div>
        <select-card @selectedGroup="statusSelectedGroup" @selected="statusSelected" :type="this.$t('t_status')" :groups="status" ></select-card>
      </div>
      <div style="padding: 5px 5px 5px 5px;">
        <div style="height: 5px;"></div>
        <my-tree-select :type="this.$t('t_region')" :regiondata="regiondata" @selectedGroup="selectTree"></my-tree-select>
      </div>
      <div :style="style" v-show="showMore">
        <select-card @selectedGroup="sensorTypeSelectedGroup" @selected="sensorTypeSelected" :type="this.$t('t_sensorType')" :groups="sensor_type_data"></select-card>
        <select-card @selectedGroup="wellTypeSelectedGroup" @selected="wellTypeSelected" :type="this.$t('t_wellType')" :groups="well_type_data"></select-card>
        <div style="padding: 5px 5px 5px 5px;">
          <Select v-model="well_name" filterable style="max-width: 200px" @on-change="well_name_click" :clearable="true">
            <Option v-for="item in well_name_data" :value="item.well_id" :key="item.well_id">{{ item.well_name }}</Option>
          </Select>
        </div>
      </div> 
      <br>
      <div class="example-code-more" @click="click">
          <Icon type="ios-arrow-down" v-show="!showMore"></Icon>
          <Icon type="ios-arrow-up" v-show="showMore"></Icon>
      </div>
    </Card>
    <Card>
      <div style="height: 5px;"></div>
        <div style="height: 35px;">
          <Button style="float:left;" @click="status_order_click">
            <span>{{ this.$t('t_status') }}</span>
            <Icon type="chevron-down" v-show="!showIsStart"></Icon>
            <Icon type="chevron-up" v-show="showIsStart"></Icon>
          </Button>
          <Button style="float:left;" @click="wellType_order_click">
            <span>{{ this.$t('t_wellType') }}</span>
            <Icon type="chevron-down" v-show="!showWellType"></Icon>
            <Icon type="chevron-up" v-show="showWellType"></Icon>
          </Button>
          <Button style="float:left;" @click="liquidYield_order_click">
            <span>{{ this.$t('t_liquidYield ') }}</span>
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
    </Card>
    <Card style="height: 50px">
      <Page ref="pages" :total="total" :page-size="page_size" size="small" @on-change="change_page" @on-page-size-change="change_size" show-elevator show-sizer style="float: right;" />
    </Card>
  </div>
</template>
<script>
import inforCard from "./components/wellInforCard.vue";
import selectCard from "./components/selectCard.vue";
import myTreeSelect from "./components/myTreeSelect.vue";
    export default {
      name: "home",
      components: {
        inforCard,
        selectCard,
        myTreeSelect,
      },
      data () {
          return {
            isExpand: true,
            showMore: true,
            u_height: 170,
            showIsStart: false,
            showWellType: false,
            showFP: false,
            // 1 开停机状态排序 2 油井类型排序 3 产液量排序
            case_station: '',
            descOrasc: '',
            regiondata: [],
            //本地化
            // status: ["开机状态","长时间停机状态","当日停机状态"],
            status: [{"id":3,"name":"开机状态"},{"id":4,"name":"当日停机状态"},{"id":5,"name":"长时间停机状态"}],
            sensor_type_data: [],
            well_type_data: [],
            wellinfor:[],
            //分页
            total: 100,
            current_page: 1,
            page_size: 10,
            //是否改变page_size
            isChangeSize: false,
            // 单选还是多选
            is_status_box: "",
            is_sensor_type_box: "",
            is_well_type_box: "",
            //选没选？
            is_region: "",
            //记录选择情况
            selectStation:{"status":"","regions":"","sensor_types":"","well_types":""},
            //选择状态,是否选择了
            status_select_status: false,
            is_well_name: '',
            well_name: '',
            well_name_data: []
          }
      },
      mounted(){
        this.initPage_1();
        this.get_wells_select(1);
        this.$axios.get("/well_names").then(res =>{
          this.well_name_data=res.data;
          for (var i = this.well_name_data.length - 1; i >= 0; i--) {
            this.well_name_data[i]["value"] = this.well_name_data[i]["well_id"];
            this.well_name_data[i]["label"] = this.well_name_data[i]["well_name"]
          }
        }).catch(error =>{
          console.log(error);
        });
      },
      methods: {
        // case_station 1 开停机状态排序 2 油井类型排序 3 产液量排序
        // descOrasc false 为 desc true 为 asc
        liquidYield_order_click(){
          this.showFP = !this.showFP;
          this.showWellType = false;
          this.showIsStart = false;
          this.case_station = 3;
          if (this.showFP) {
            this.descOrasc = "asc";
          }else{
            this.descOrasc = "desc";
          }
          this.init_page_components();
          this.get_wells_select(1);
        },
        wellType_order_click(){
          this.showWellType = !this.showWellType;
          this.showFP = false;
          this.showIsStart = false;
          this.case_station = 2;
          if (this.showWellType) {
            this.descOrasc = "asc";
          }else{
            this.descOrasc = "desc";
          }
          this.init_page_components();
          this.get_wells_select(1);
        },
        status_order_click(){
          this.showIsStart = !this.showIsStart;
          this.showFP = false;
          this.showWellType = false;
          this.case_station = 1;
          if (this.showIsStart) {
            this.descOrasc = "asc";
          }else{
            this.descOrasc = "desc";
          }
          this.init_page_components();
          this.get_wells_select(1);        
        },
        filterMethod (value, option) {
          if (value != "") {
            return option.indexOf(value.toUpperCase()) != -1;
          }
        },
        initPage_1(){
          // 使用=>可以不用绑定this
          this.$axios.get("/sensor_type_list").then( res =>{
              this.sensor_type_data = res.data;
          }).catch(error =>{
              console.log(error);
          });
          this.$axios.get("/well_type_list").then(res => {
            this.well_type_data = res.data;
          }).catch(error => {
            console.log(error);
          });
          this.$axios.get("/region_list").then(res => {
            this.regiondata = res.data;
          }).catch(error => {
            console.log(error);
          });
        },
        // 1
        get_wells_select(value){
          switch(value){
            case 1:
            // debugger
              this.$axios.get('/well_list_select',{
                params:{
                  current_page: this.current_page,
                  page_size: this.page_size,
                  status: this.selectStation["status"],
                  is_status_box: this.is_status_box,
                  regions: this.selectStation["regions"],
                  is_region: this.is_region,
                  is_sensor_type_box: this.is_sensor_type_box,
                  sensor_types: this.selectStation["sensor_types"],
                  is_well_type_box: this.is_well_type_box,
                  well_types: this.selectStation["well_types"],
                  is_well_name: this.is_well_name,
                  well_name: this.well_name,
                  case_station: this.case_station,
                  descOrasc: this.descOrasc,
                }
              }).then(res => {
                // debugger
                 this.wellinfor = res.data.wells;
                 this.total = res.data.length;
                 console.log(this.total); 
              }).catch(error => {
                console.log(error);
              });
              break;
            default:
              this.$axios.get('/well_list_select',{
                params:{
                  current_page: this.current_page,
                  page_size: this.page_size,
                }
              }).then(res => {
                 this.wellinfor = res.data.wells;
                 this.total = res.data.length;
                 console.log(this.total); 
              }).catch(error => {
                console.log(error);
              });
              break;
          }
          
        },
        change_page(item){
          // if (this.status_select_status) {
          //   this.current_page=item;
          //   this.get_wells_select(1);
          // }else{
          //   this.current_page=item;
          //   this.get_wells_select(0);            
          // }
            this.current_page=item;
            this.get_wells_select(1);

        },
        change_size(item){
          // 每次修改之后页码回到第一页
          this.page_size=item;

          if (this.status_select_status) {
          //   if (this.current_page == 1) {
          //     this.get_wells_select(1);
          //   }
          // }else{
          //   if (this.current_page == 1) {
          //     this.get_wells_select(0);
          //   }  
          this.get_wells_select(1)         
          }
        },
        //区块选择
        selectTree(data){
          if (data.length == 0) {
            this.is_region = false;
            this.selectStation["regions"]="";
            this.init_page_components();
            this.get_wells_select(1);
          }else{
            this.selectStation["regions"]=data;
            this.is_region = true;
            this.init_page_components();
            this.get_wells_select(1);            
          }
        },
        //分页组件重置
        init_page_components(){
            this.current_page = 1;
            this.page_size = 10;
            this.$nextTick(function(){
              this.$refs['pages'].currentPage = 1;
            });
        },
        well_name_click(){
          if (this.well_name != '') {
            this.is_well_name = true;
            this.init_page_components();
            this.get_wells_select(1);
          }else{
            this.is_well_name = '';
          }
          console.log(this.well_name);
        },
        // 开停机 单选
        statusSelected(data){
          if (data == "all") {
            // console.log("点击了all,什么也不做");
            this.status_select_status = false;
            // this.get_wells_select(0);
            this.get_wells_select(1);
          }else{
            var flag = 0;
            if (data.name == "长时间停机状态") {
              flag = -1;
            }else if(data.name == "当日停机状态"){
              flag = 1;
            }
            this.is_status_box = false;
            this.selectStation["status"]=flag;
            this.init_page_components();
            this.status_select_status = true;
            // console.log(flag);
            this.get_wells_select(1);
          }
        },
        // 开停机状态选择复选
        statusSelectedGroup(data){
          var flag = 0;
          // [{"id":3,"name":"开机状态"},{"id":4,"name":"当日停机状态"},{"id":5,"name":"长时间停机状态"}]
          var status = 0;
          for(var i=0;i<data.length;i++){
            if (data[i] == "all") {
              flag = 1;
              break;
            }else{
              status += data[i];
            }
          }
          switch (flag){
            case 1:
              this.init_page_components();
              this.status_select_status = false;
              // this.get_wells_select(0);
              this.get_wells_select(1);
              break;
            default:
              this.is_status_box = true;
              this.status_select_status = true;
              this.selectStation["status"] = status;
              this.init_page_components();
              this.get_wells_select(1);
              break;
          }
        },
        //传感器类型选择 单选
        sensorTypeSelected(data){
          if (data == "all") {
            this.init_page_components();
            this.get_wells_select(1);
            this.is_sensor_type_box = "";
          }else{
            this.is_sensor_type_box = false;
            this.selectStation["sensor_types"] = data.id;
            this.init_page_components();
            this.get_wells_select(1);
          }
        },
        //传感器类型选择 复选
        sensorTypeSelectedGroup(data){
          var sensor_type_data = [];
          for (var i = data.length - 1; i >= 0; i--) {
            if(data[i] == "all"){
              this.is_sensor_type_box = "";
              this.init_page_components();
              this.get_wells_select(1);
              sensor_type_data = [];
              break;
            }else{
              sensor_type_data.push(data[i]);
            }
          }
          if (sensor_type_data.length>0) {
            this.init_page_components();
            this.is_sensor_type_box = true;
            this.selectStation["sensor_types"] = sensor_type_data;
            this.get_wells_select(1);
          }
        },
        //单选
        wellTypeSelected(data){
          if (data == "all") {
            this.init_page_components();
            this.selectStation["well_types"] = "";
            this.is_well_type_box="";
            this.get_wells_select(1);
          }else{
            this.init_page_components();
            this.selectStation["well_types"] = data.id;
            this.is_well_type_box=false;
            this.get_wells_select(1);
          }
        },
        //油井类型选择，复选
        wellTypeSelectedGroup(data){
          // ["all", 1, 6]
          var well_type_data = [];
          for (var i = data.length - 1; i >= 0; i--) {
            if (data[i] == "all") {
              this.init_page_components();
              this.selectStation["well_types"] = "";
              this.is_well_type_box="";
              this.get_wells_select(1);
              break;
            }else{
              well_type_data.push(data[i]);
            }
          }
          if (well_type_data.length>0) {
            this.init_page_components();
            this.is_well_type_box = true;
            this.selectStation["well_types"] = well_type_data;
            this.get_wells_select(1);
          }
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







