<template>
    <div style="border-bottom: 1px dotted #e8e8e8;padding: 5px 5px 5px 5px;">
        <h3>{{ this.$t('t_please') }} {{ type }}：</h3>
        <div>
            <Row>
                <Col span="12">
                    <treeselect v-model="region_groups" :multiple="true" :options="regiondata" style="width: 300px;"/>
                </Col>
                <Col span="12">
                    <Button type="primary" size="small" style="right:15px;position:absolute;cursor:pointer;" @click="sureClick">{{ this.$t('t_sure') }}</Button>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect';
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
export default {
    name: 'myTreeSelect',
    components: {
        Treeselect,
    },
    props: {
        type: String,
        regiondata: Array,
    },
    methods: {
        sureClick(){
            this.$emit('selectedGroup',this.region_groups);
        },
    },
    data() {
        return {
            region_groups:[],
        }
    },
};
</script>



