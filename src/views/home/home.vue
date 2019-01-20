 <style lang="less">
    @import './components/styles/demo.less';
</style>
<template>
<Card>
    <p style="text-align: center;font-size: 50px;">欢迎来到学生课堂成绩管理系统</p>
</Card>
</template>
<script>
import inforCard from './components/wellInforCard.vue';
import selectCard from './components/selectCard.vue';
import myTreeSelect from './components/myTreeSelect.vue';
import myTag from './components/myTag.vue';
export default {
    name: 'home',
    components: {
        inforCard,
        selectCard,
        myTreeSelect,
        myTag
    },
    data () {
        return {
            isExpand: true,
            showMore: true,
            u_height: 100,
            showIsStart: false,
            showWellType: false,
            showFP: false,
            // 1 开停机状态排序 2 油井类型排序 3 产液量排序
            case_station: '',
            descOrasc: '',
            regiondata: [],
            // 本地化
            // status: ["开机状态","长时间停机状态","当日停机状态"],
            status: [{'id': 3, 'name': '开机状态'}, {'id': 4, 'name': '当日停机状态'}, {'id': 5, 'name': '长时间停机状态'}],
            sensor_type_data: [],
            well_type_data: [],
            wellinfor: [],
            // 分页
            total: 100,
            current_page: 1,
            page_size: 10,
            // 是否改变page_size
            isChangeSize: false,
            // 单选还是多选
            is_status_box: '',
            is_sensor_type_box: '',
            is_well_type_box: '',
            // 选没选？
            is_region: '',
            // 记录选择情况
            selectStation: {'status': '', 'regions': '', 'sensor_types': '', 'well_types': ''},
            // 选择状态,是否选择了
            status_select_status: '',
            is_well_name: '',
            well_name: '',
            well_name_data: [],
            // 筛选条件总集合
            isStatusBox: '',
            statusData: [],
            isSensorBox: '',
            sensorData: [],
            isTypeBox: '',
            typeData: [],
            isName: '',
            nameData: ''
        };
    },
    mounted () {
        this.initPage_1();
        this.get_wells_select(1);
        this.$axios.get('/well_names').then(res => {
            this.well_name_data = res.data;
            for (var i = this.well_name_data.length - 1; i >= 0; i--) {
                this.well_name_data[i]['value'] = this.well_name_data[i]['well_id'];
                this.well_name_data[i]['label'] = this.well_name_data[i]['well_name'];
            }
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        cancle (type) {
            if (type == this.$t("t_wellType")) {
              this.isTypeBox = "";
              this.typeData = [];
            }else if(type == this.$t("t_sensorType")){
              this.isSensorBox = "";
              this.sensorData = [];
            }else if(type == this.$t("t_status")){
              this.isStatusBox = "";
              this.statusData = [];
            }
        },
        // case_station 1 开停机状态排序 2 油井类型排序 3 产液量排序
        // descOrasc false 为 desc true 为 asc
        liquidYield_order_click () {
            this.showFP = !this.showFP;
            this.showWellType = false;
            this.showIsStart = false;
            this.case_station = 3;
            if (this.showFP) {
                this.descOrasc = 'asc';
            } else {
                this.descOrasc = 'desc';
            }
            this.init_page_components();
            this.get_wells_select(1);
        },
        wellType_order_click () {
            this.showWellType = !this.showWellType;
            this.showFP = false;
            this.showIsStart = false;
            this.case_station = 2;
            if (this.showWellType) {
                this.descOrasc = 'asc';
            } else {
                this.descOrasc = 'desc';
            }
            this.init_page_components();
            this.get_wells_select(1);
        },
        status_order_click () {
            this.showIsStart = !this.showIsStart;
            this.showFP = false;
            this.showWellType = false;
            this.case_station = 1;
            if (this.showIsStart) {
                this.descOrasc = 'desc';
            } else {
                this.descOrasc = 'asc';
            }
            this.init_page_components();
            this.get_wells_select(1);
        },
        filterMethod (value, option) {
            if (value != '') {
                return option.indexOf(value.toUpperCase()) != -1;
            }
        },
        initPage_1 () {
            // 使用=>可以不用绑定this
            this.$axios.get('/sensor_well_region_list').then(res => {
                this.sensor_type_data = res.data.datatypes;
                this.well_type_data = res.data.welltypes;
                this.regiondata = res.data.regions;
            }).catch(error => {
                console.log(error);
            });
        },
        // 1
        get_wells_select (value) {
            switch (value) {
                case 1:
                    // debugger
                    this.$axios.get('/well_list_select', {
                        params: {
                            current_page: this.current_page,
                            page_size: this.page_size,
                            status: this.selectStation['status'],
                            is_status_box: this.is_status_box,
                            regions: this.selectStation['regions'],
                            is_region: this.is_region,
                            is_sensor_type_box: this.is_sensor_type_box,
                            sensor_types: this.selectStation['sensor_types'],
                            is_well_type_box: this.is_well_type_box,
                            well_types: this.selectStation['well_types'],
                            is_well_name: this.is_well_name,
                            well_name: this.well_name,
                            case_station: this.case_station,
                            descOrasc: this.descOrasc
                        }
                    }).then(res => {
                        // debugger
                        this.wellinfor = [];
                        this.wellinfor = res.data.wells;
                        this.total = res.data.length;
                        console.log(this.total);
                    }).catch(error => {
                        console.log(error);
                    });
                    break;
                default:
                    this.$axios.get('/well_list_select', {
                        params: {
                            current_page: this.current_page,
                            page_size: this.page_size
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
        change_page (item) {
            // if (this.status_select_status) {
            //   this.current_page=item;
            //   this.get_wells_select(1);
            // }else{
            //   this.current_page=item;
            //   this.get_wells_select(0);
            // }
            this.current_page = item;
            this.get_wells_select(1);
        },
        change_size (item) {
            // 每次修改之后页码回到第一页
          debugger
            this.page_size = item;

            // if (this.status_select_status) {
                //   if (this.current_page == 1) {
                //     this.get_wells_select(1);
                //   }
                // }else{
                //   if (this.current_page == 1) {
                //     this.get_wells_select(0);
                //   }
                this.get_wells_select(1);
            // }
        },
        // 区块选择
        selectTree (data) {
            if (data.length == 0) {
                this.is_region = false;
                this.selectStation['regions'] = '';
                this.init_page_components();
                this.get_wells_select(1);
            } else {
                this.selectStation['regions'] = data;
                this.is_region = true;
                this.init_page_components();
                this.get_wells_select(1);
            }
        },
        // 分页组件重置
        init_page_components () {
            this.current_page = 1;
            this.page_size = 10;
            this.$nextTick(function () {
                this.$refs['pages'].currentPage = 1;
            });
        },
        well_name_click () {
            if ((this.well_name != '')&(typeof(this.well_name) != "undefined")) {
                this.is_well_name = true;
                this.isName = 'true';
                this.nameData = this.well_name;
                this.init_page_components();
                this.get_wells_select(1);
            } else {
                this.isName = '';
                this.nameData = '';
                this.is_well_name = '';
            }
            console.log(this.well_name);
        },
        // 开停机 单选
        statusSelected (data) {
            if (data == 'all') {
            // console.log("点击了all,什么也不做");
                this.status_select_status = '';
                this.is_status_box = '';
                this.selectStation['status'] = '';
                this.isStatus = '';
                this.isStatusBox = '';
                this.statusData = [];
                // this.get_wells_select(0);
                this.get_wells_select(1);
            } else {
                var flag = 0;
                if (data.name == '长时间停机状态') {
                    flag = -1;
                } else if (data.name == '当日停机状态') {
                    flag = 1;
                }
                this.isStatus = 'true';
                this.isStatusBox = 'false';
                this.statusData = [];
                this.statusData[0] = data.name;
                this.is_status_box = false;
                this.selectStation['status'] = flag;
                this.init_page_components();
                this.status_select_status = true;
                // console.log(flag);
                this.get_wells_select(1);
            }
        },
        // 开停机状态选择复选
        statusSelectedGroup (data) {
            var flag = 0;
            // [{"id":3,"name":"开机状态"},{"id":4,"name":"当日停机状态"},{"id":5,"name":"长时间停机状态"}]
            var status = 0;
            var list = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i] == 'all') {
                    flag = 1;
                    break;
                } else {
                    status += data[i];
                    if (data[i] == 3) {
                        list.push('开机状态');
                    } else if (data[i] == 4) {
                        list.push('当日停机状态');
                    } else if (data[i] == 5) {
                        list.push('长时间停机状态');
                    }
                }
            }
            switch (flag) {
                case 1:
                    this.isStatus = '';
                    this.isStatusBox = '';
                    this.statusData = [];
                    this.init_page_components();
                    this.status_select_status = false;
                    // this.get_wells_select(0);
                    this.get_wells_select(1);
                    break;
                default:
                    this.isStatus = 'true';
                    this.isStatusBox = 'true';
                    this.statusData = list;
                    this.is_status_box = true;
                    this.status_select_status = true;
                    this.selectStation['status'] = status;
                    this.init_page_components();
                    this.get_wells_select(1);
                    break;
            }
        },
        // 传感器类型选择 单选
        sensorTypeSelected (data) {
            if (data == 'all') {
                this.selectStation['sensor_types'] = '';
                this.is_sensor_type_box = '';
                this.isSensorBox = '';
                this.sensorData = [];
                this.init_page_components();
                this.get_wells_select(1);
            } else {
                this.is_sensor_type_box = false;
                this.selectStation['sensor_types'] = data.id;
                this.isSensorBox = 'false';
                this.sensorData = [data.name];
                this.init_page_components();
                this.get_wells_select(1);
            }
        },
        // 传感器类型选择 复选
        sensorTypeSelectedGroup (data, data1) {
            var sensor_type_data = [];
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i] == 'all') {
                    this.is_sensor_type_box = '';
                    this.init_page_components();
                    this.get_wells_select(1);
                    sensor_type_data = [];
                    this.isSensorBox = '';
                    this.sensorData = [];
                    break;
                } else {
                    sensor_type_data.push(data[i]);
                }
            }
            if (sensor_type_data.length > 0) {
                this.init_page_components();
                this.is_sensor_type_box = true;
                this.selectStation['sensor_types'] = sensor_type_data;
                this.isSensorBox = 'true';
                var list = [];
                for (var i = 0; i < data1.length; i++) {
                    for (var j = 0; j < sensor_type_data.length; j++) {
                        if (sensor_type_data[j] == data1[i].id) {
                            list.push(data1[i].name);
                            break;
                        }
                    }
                }
                this.sensorData = list;
                this.get_wells_select(1);
            }
        },
        // 单选
        wellTypeSelected (data) {
            if (data == 'all') {
                this.init_page_components();
                this.selectStation['well_types'] = '';
                this.is_well_type_box = '';
                this.isTypeBox = '';
                this.typeData = [];
                this.get_wells_select(1);
            } else {
                this.init_page_components();
                this.selectStation['well_types'] = data.id;
                this.is_well_type_box = false;
                this.isTypeBox = 'false';
                this.typeData = [data.name];
                this.get_wells_select(1);
            }
        },
        // 油井类型选择，复选
        wellTypeSelectedGroup (data, data1) {
            // ["all", 1, 6]
            var well_type_data = [];
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i] == 'all') {
                    this.init_page_components();
                    this.selectStation['well_types'] = '';
                    this.is_well_type_box = '';
                    this.isTypeBox = '';
                    this.typeData = [];
                    this.get_wells_select(1);
                    break;
                } else {
                    well_type_data.push(data[i]);
                }
            }
            if (well_type_data.length > 0) {
                this.init_page_components();
                this.is_well_type_box = true;
                this.selectStation['well_types'] = well_type_data;
                this.isTypeBox = 'true';
                var list = [];
                for (var i = 0; i < data1.length; i++) {
                    for (var j = 0; j < well_type_data.length; j++) {
                        if (well_type_data[j] == data1[i].id) {
                            list.push(data1[i].name);
                            break;
                        }
                    }
                }

                this.typeData = list;
                this.get_wells_select(1);
            }
        },
        click () {
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
        }
    }
};
</script>







