<style lang="less">
    @import './components/styles/demo.less';
</style>
<template>
  <div>
    <Card :style="height">
      <div>
        请选择开停机状态：
        <CheckboxGroup v-model="sensor_type_Group">
            <Checkbox style="width: 100px;" label="sensor_type">
              <span>开机状态</span>
            </Checkbox>
            <Checkbox style="width: 100px;" label="sensor_type">
              <span>停机状态</span>
            </Checkbox>
            <Checkbox style="width: 100px;" label="sensor_type">
              <span>当日停机状态</span>
            </Checkbox>
        </CheckboxGroup>
      </div>
      <div>
        请选择区块：
        <cascaderMulti style="width: 300px" v-model="end_code" :data="end_codes" placeholder="区块"></cascaderMulti>
      </div>
      <div :style="style">
        <div>
          请选择传感器类型：
          <CheckboxGroup v-model="sensor_type_Group">
              <Checkbox style="width: 100px;flex-warp: wrap;" v-for="sensor_type in sensor_type_data" :label="sensor_type" :key="sensor_type">
                <span>{{sensor_type}}</span>
              </Checkbox>
          </CheckboxGroup>
        </div>
        </span><span v-for="sensor_type in sensor_type_Group">{{sensor_type}}</span>
        <div>
          请选择油井类型：
          <CheckboxGroup v-model="well_type_Group">
              <Checkbox style="width: 100px;flex-warp: wrap;" v-for="well_type in well_type_data" :label="well_type" :key="well_type">
                <span>{{well_type}}</span>
              </Checkbox>
          </CheckboxGroup>
        </div>
        </span><span v-for="sensor_type in sensor_type_Group">{{sensor_type}}</span>
      </div> 
      <br>
      <div class="example-code-more" @click="click">
          <Icon type="ios-arrow-down" v-show="!showMore"></Icon>
          <Icon type="ios-arrow-up" v-show="showMore"></Icon>
      </div>
    </Card>
    <Button type="primary" style="float:right;">重置</Button>
    <Button type="primary" style="float:right;">确定</Button>
  </div>
</template>
<script>
    export default {
        data () {
            return {
              isExpand: true,
              showMore: true,
              // e_height: 120,
              u_height: 150,
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
