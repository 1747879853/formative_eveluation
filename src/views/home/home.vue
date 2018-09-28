<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="count.newOrders"
                            iconType="android-person-add"
                            color="#2d8cf0"
                            intro-text="当月新增订单"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.finishedWorkOrders"
                            iconType="ios-eye"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="当月生产交付工单"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.qsPassRate"
                            :decimals="1"
                            iconType="upload"
                            color="#ffd572"
                            intro-text="当月质检合格率"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.failureRate"
                            :decimals="2"
                            iconType="shuffle"
                            color="#f25e43"
                            intro-text="当月设备故障率"
                        ></infor-card>
                    </Col>
                </Row>
                <Row :gutter="10">
                   
                  <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
                   <Card>
                       <div id="allmap" style="widht:800px;height:700px"></div>
                        </Card>
                   </Col>
                    <!-- <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-map"></Icon>
                                工单生产进度
                            </p>
                            <div class="data-source-row">
                                <visite-volume></visite-volume>
                            </div>
                        </Card>
                    </Col>
                    <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="ios-pulse-strong"></Icon>
                                部门出勤情况
                            </p>
                            <div class="data-source-row">
                                <data-source-pie></data-source-pie>
                            </div>
                        </Card>
                    </Col> -->
                </Row>
            </Col>
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="8">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <img class="avator-img" :src="avatorPath" />
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name">Admin</b>
                                            <p>super admin</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                                <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
                            </Row>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                                <Col span="16" class="padding-left-8">北京</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-checkbox-outline"></Icon>
                                待办事项
                            </p>
                            <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                                <Icon type="plus-round"></Icon>
                            </a>
                            <Modal
                                v-model="showAddNewTodo"
                                title="添加新的待办事项"
                                @on-ok="addNew"
                                @on-cancel="cancelAdd">
                                <Row type="flex" justify="center">
                                    <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
                                </Row>
                                <Row slot="footer">
                                    <Button type="text" @click="cancelAdd">取消</Button>
                                    <Button type="primary" @click="addNew">确定</Button>
                                </Row>
                            </Modal>
                            <div class="to-do-list-con">
                                <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                                    <to-do-list-item :content="item.title"></to-do-list-item>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="8">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-wifi"></Icon>
                        车间生产情况
                    </p>
                    <div class="data-source-row">
                        <img src="../../images/chejian.jpg" />
                        <!-- <video src="" /> -->
                        <!-- <user-flow></user-flow> -->
                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="8">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        车辆出入统计
                    </p>
                    <div class="line-chart-con">
                        <service-requests></service-requests>
                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="8">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        工地情况
                    </p>
                    <div class="map-con">
                        <map-data-table :cityData="cityData" height="201" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
                        <!-- <Col span="14" class="map-incon">
                            <Row type="flex" justify="center" align="middle">
                                <home-map :city-data="cityData"></home-map>
                            </Row>
                        </Col> -->
                    </div>
                </Card>
            </Col>
        </Row>
        <!-- <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    上周每日服务调用量(万)
                </p>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row> -->
    </div>
</template>

<script>
import cityData from "./map-data/get-city-value.js";
import homeMap from "./components/map.vue";
import dataSourcePie from "./components/dataSourcePie.vue";
import visiteVolume from "./components/visiteVolume.vue";
import serviceRequests from "./components/serviceRequests.vue";
import userFlow from "./components/userFlow.vue";
import countUp from "./components/countUp.vue";
import inforCard from "./components/inforCard.vue";
import mapDataTable from "./components/mapDataTable.vue";
import toDoListItem from "./components/toDoListItem.vue";
import inMap from "inMap";

export default {
  name: "home",
  components: {
    homeMap,
    dataSourcePie,
    visiteVolume,
    serviceRequests,
    userFlow,
    countUp,
    inforCard,
    mapDataTable,
    toDoListItem
  },
  data() {
    return {
      toDoList: [
        {
          title: "完成工单一的设计"
        },
        {
          title: "出差了解工地情况"
        }
      ],
      count: {
        newOrders: 4,
        finishedWorkOrders: 23,
        qsPassRate: 98.3,
        failureRate: 0.345
      },
      cityData: cityData,
      showAddNewTodo: false,
      newToDoItemValue: ""
    };
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath;
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    addNewToDoItem() {
      this.showAddNewTodo = true;
    },
    addNew() {
      if (this.newToDoItemValue.length !== 0) {
        this.toDoList.unshift({
          title: this.newToDoItemValue
        });
        setTimeout(() => {
          this.newToDoItemValue = "";
        }, 200);
        this.showAddNewTodo = false;
      } else {
        this.$Message.error("请输入待办事项内容");
      }
    },
    cancelAdd() {
      this.showAddNewTodo = false;
      this.newToDoItemValue = "";
    },
    initMap() {
      /**
 *在全局定义.auto样式
 <style>
 .auto { padding:5px 15px; border:0; background:#fff; }
 </style>

 
 */
    
   this.$axios.get('/location_lasts').then(res=>{
     var  data =res.data.data;
       if (!data){
           data = []
       }
  
//     var data =[
//   {
//     "shifts": "334;334;337;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;339;",
//     "w_time": "2018-09-18 22:44:22",
//     "r_time": "2018-09-14 17:20:00",
//     "altitude": "3.2",
//     "record_time": "2018-09-19 18:30:43",
//     "write_time": "2018-09-19 18:30:47",
//     "bd_lng": 118.17299700000001,
//     "bd_lat": 37.570204333333336,
//     "geometry": {
//       "type": "Point",
//       "coordinates": [
//         118.17299700000001,
//         37.570204333333336
//       ]
//     },
//     "location": "山东省东营市利津县G2516(东吕高速)"
//   },
//   {
//     "shifts": null,
//     "w_time": null,
//     "r_time": null,
//     "altitude": "5.0",
//     "record_time": "2018-09-17 22:40:43",
//     "write_time": "2018-09-18 22:39:20",
//     "bd_lng": 118.17305316666668,
//     "bd_lat": 37.570134833333334,
//     "geometry": {
//       "type": "Point",
//       "coordinates": [
//         118.17305316666668,
//         37.570134833333334
//       ]
//     },
//     "location": "山东省东营市利津县G2516(东吕高速)"
//   }
// ];
      var inmap = new inMap.Map({
        id: "allmap",
         skin: "Blueness",
        center: [105.403119, 38.028658],
        zoom: {
          value: 5,
          show: true,
          max: 18,
          min: 5
        }
      });
      var overlay = new inMap.PointOverlay({
        tooltip: {
          show: true,
         
          formatter: function(params) {
             
            return (
              "<div style='background-color:white'>" +
              "<div>" +
              "<span>设备编号：</span><span>" +
              params.basket_id +
              "</span>" +
              " </div>" +
              "<div>" +
              "<span>当前位置：</span><span>" +
              params.location +
              "</span>" +
              " </div>" +
              " <div>" +
              " <span>当前位移：</span><span>" +
              params.shift+
              "</span>" +
              "</div>" +
               "<div>" +
              "<span>当前海拔：</span><span>" +
              params.altitude +
              "</span>" +
              " </div>" +
              "<div>" +
              "<span>最近更新：</span><span>" +
              params.w_time +
              "</span>" +
              " </div>" +
              "</div>"
            );
          },
          offsets: {
            top: 15,
            left: -150,
            right:150

          },
          customClass: "auto"
        },
        style: {
          normal: {
            backgroundColor: "green", // 填充颜色
            shadowColor: "rgba(255, 255, 255, 1)", // 投影颜色
            shadowBlur: 35, // 投影模糊级数
            globalCompositeOperation: "lighter", // 颜色叠加方式
            size: 6 // 半径
          },
          mouseOver: {
            backgroundColor: "rgba(200, 200, 200, 1)",
            borderColor: "rgba(255,255,255,1)",
            borderWidth: 1
          },
          selected: {
            borderWidth: 1,
            backgroundColor: "rgba(184,0,0,1)",
            borderColor: "rgba(255,255,255,1)"
          }
        },
        data: data
      });
      inmap.add(overlay); })
    }
    
  }
};
</script>
