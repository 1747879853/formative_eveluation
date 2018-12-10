<template>
    <div style="border-bottom: 1px dotted #e8e8e8;padding: 5px 5px 5px 5px;">
        <!--<h3>{{ this.$t('t_please') }} {{ type }}：</h3>-->
        <div>
            <!--<div style="float:left;width:7%;border:1px;">{{ type }}：</div>-->
            <Button size="small" type="text" style="float:left;width:6%;border:1px;">{{ type }}：</Button>
            <div style="float:left;width:25%;border:1px;">
                <treeselect v-model="region_groups" :multiple="true" :options="regiondatas" :max-height="500" style="width: 150px;" :placeholder="this.$t('t_please')" @input="select">
                </treeselect>
            </div>
            <br/>
            <br/>
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
        select(node, instanceId){
            this.$emit('selectedGroup',this.region_groups);
        },
        addLabel(item){
            item.label = item.title;
        },
        //递归写法，去掉没有孩子的item.children
        cicle(item){
            if (typeof(item.length) != "undefined") {
                for(let i=0;i<item.length;i++){
                    if (item[i].children.length != 0) {
                        this.cicle(item[i].children);
                        this.addLabel(item[i]);
                    }else{
                        delete item[i]["children"];
                        this.addLabel(item[i]);
                    }
                }
                return item;
            }
        },

    },
    data() {
        return {
            region_groups:[],
        }
    },
    computed:{
        //这里有一个问题，当父区块下只有一个区块时，选择后，value是父区块,
        //问题解决，当选择父区块时，返回旗下所有子区块数据
        regiondatas(){
            if (this.regiondata.length>0) {
                return this.cicle(this.regiondata);
            }else{
                return [];
            }
        }
    },
};
</script>



