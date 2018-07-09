<template>
    <div style="width:100%;height:100%;" id="service_request_con"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'serviceRequests',
    mounted () {
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                top: '3%',
                left: '1.2%',
                right: '1%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '公司车辆出',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#2d8cf0'
                    }},
                    data: [12, 13, 10, 13, 9, 23, 21]
                },
                {
                    name: '公司车辆入',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#10A6FF'
                    }},
                    data: [25, 35, 27, 23, 29, 33, 31]
                },
                {
                    name: '来访车辆出',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#0C17A6'
                    }},
                    data: [39, 28, 35, 26, 31, 47, 38]
                },
                {
                    name: '来访车辆入',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#4608A6'
                    }},
                    data: [30, 32, 31, 34, 30, 30, 32]
                }
            ]
        };
        const serviceRequestCharts = echarts.init(document.getElementById('service_request_con'));
        serviceRequestCharts.setOption(option);

        window.addEventListener('resize', function () {
            serviceRequestCharts.resize();
        });
    }
};
</script>