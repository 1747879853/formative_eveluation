<template>
    <div :style="{width:tableWidth}" class='autoTbale'>
        <BUTTON @click="recordExpended">测试</BUTTON>
        <BUTTON @click="madeExpend">测试</BUTTON>
        <table class="table table-bordered" id='hl-tree-table'>
            <!-- <thead>
                <tr>
                    <th v-for="(column,index) in cloneColumns">
                        <label v-if="column.type === 'selection'">
                            <input type="checkbox" v-model="checks" @click="handleCheckAll">
                        </label>
                        <label v-else>
                            {{ renderHeader(column, index) }}
                            <span class="ivu-table-sort" v-if="column.sortable">
                                
                            </span>
                        </label>
                    </th>
                </tr>
            </thead> -->
            <tbody>
                <tr v-for="(item,index) in initItems" :key="item.id" v-show="show(item)" :class="{'child-tr':item.parent}">
                    <td v-for="(column,snum) in columns" :key="column.key" :style=tdStyle(column)>
                        <div v-if="column.type === 'action'">
                            <button class="ivu-btn ivu-btn-primary ivu-btn-small" @click="show_modal1();
                            id1=renderId(item);">添加子科目</button>
                            <Modal
                                v-model="modal1"
                                title="添加子花费科目"
                                @on-ok="ok1"
                                @on-cancel="cancel1">
                                <table>
                                <tr><td>花费科目名</td><td>
                                <Input v-model="c_name" placeholder="请输入花费科目名" clearable style="width: 300px"></Input></td></tr><tr>&nbsp;</tr>
                                </table>
                            </Modal>
                            <button class="ivu-btn ivu-btn-success ivu-btn-small" @click="modal3=true;id1=renderId(item);e_name=renderName(item);">修改</button>
                            <Modal
                                v-model="modal3"
                                title="修改子花费科目"
                                @on-ok="ok2"
                                @on-cancel="cancel2">
                                <table>
                                <tr><td>花费科目名</td><td>
                                <Input v-model="e_name" placeholder="请输入花费科目名" clearable style="width: 300px"></Input></td></tr><tr>&nbsp;</tr>
                                </table>
                            </Modal>
                            <button class="ivu-btn ivu-btn-error ivu-btn-small" @click="id1=renderId(item); deleteClick();">删除</button>
                        </div>
                        <label @click="toggle(index,item)" v-if="!column.type">
                            <span v-if='snum==iconRow()'>
                                <i v-html='item.spaceHtml'></i>
                                <i v-if="item.children&&item.children.length>0" class="ivu-icon" :class="{'ivu-icon-plus-circled':!item.expanded,'ivu-icon-minus-circled':item.expanded }"></i>
                                <i v-else class="ms-tree-space"></i>
                            </span> {{renderBody(item,column) }}
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Vue from 'vue';

export default {
    name: 'treeGrid',
    props: {
        columns: Array,
        items: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            initItems: [], //处理后数据数组
            cloneColumns: [], //处理后的表头数据
            checkGroup: [], //复选框数组
            checks: false, //全选
            screenWidth: document.body.clientWidth, //自适应宽
            tdsWidth: 0, //td总宽
            timer: false, //控制监听时长
            dataLength: 0, //树形数据长度
            modal1: false,
            modal3:false,
            c_name:"",
            e_name:"",
            id1:"",
            expandedItems:[],
            // data:0,
        }
    },
    computed: {
        tableWidth() {
            return this.tdsWidth > this.screenWidth && this.screenWidth > 0 ? this.screenWidth + 'px' : '100%'
        }, 
        // data1:function(){
        //     return this.id1
        //     debugger
        // },
    },
    watch: {
        // data:{
        //     handler: function(after, before) {
        //         debugger
        //     },
        // },
        screenWidth(val) {
            if (!this.timer) {
                this.screenWidth = val
                this.timer = true
                setTimeout(() => {
                    this.timer = false
                }, 400)
            }
        },
        items() {
            if (this.items) {
                this.dataLength = this.Length(this.items)
                this.initData(this.deepCopy(this.items), 1, null);
                this.checkGroup = this.renderCheck(this.items)
                if (this.checkGroup.length == this.dataLength) {
                    this.checks = true
                } else {
                    this.checks = false
                }
            }
        },
        columns: {
            handler() {
                this.cloneColumns = this.makeColumns();
            },
            deep: true
        },
        checkGroup(data) {
            this.checkAllGroupChange(data)
        },
    },
    mounted() {
        if (this.items) {
            this.dataLength = this.Length(this.items)
            this.initData(this.deepCopy(this.items), 1, null);
            this.cloneColumns = this.makeColumns();
            this.checkGroup = this.renderCheck(this.items)
            if (this.checkGroup.length == this.dataLength) {
                this.checks = true
            } else {
                this.checks = false
            }
        }
        // 绑定onresize事件 监听屏幕变化设置宽
        this.$nextTick(() => {
            this.screenWidth = document.body.clientWidth
        })
        window.onresize = () => {
            // debugger
            return (() => {
                window.screenWidth = document.body.clientWidth
                this.screenWidth = window.screenWidth
            })()
        }
        // // debugger
        // this.init();
      //   this.$nextTick(function () {
      //   // Code that will run only after the
      //   // entire view has been rendered
      //   debugger
      //       this.madeExpend();
      // })
    },
    methods: {
            // init(){
            //     debugger
            //     if (this.$route.params.flag == 1) {
            //         this.expandedItems = this.$route.params.expandedItems;
            //         this.madeExpend();
            //     }
            // },
            depthTraversal:function(arr,id,newarr){
                debugger
                if (arr!=null){  
                    for(let i=0;i<arr.length;i++){
                      if(arr[i].id==id){
                          arr[i].children.push(newarr);
                          return i;
                      }
                      let ret = this.depthTraversal(arr[i].children,id,newarr);
                      if (ret>=0) {
                          return i;
                      }
                    }
                }
                // debugger
            },
            depthTraversal2:function(arr,id,newarr){
                if (arr!=null){  
                    for(let i=0;i<arr.length;i++){
                      if(arr[i].id==id){
                          arr[i].authority = newarr.authority;
                          arr[i].name = newarr.name;
                          arr[i].condition = newarr.condition;
                          arr[i].status = newarr.status;
                          return i;
                      }
                      let ret = this.depthTraversal2(arr[i].children,id,newarr);
                      if (ret>=0) {
                          return i;
                      }
                    }
                }
            },
            depthTraversal4:function(arr,id){
                if (arr!=null){  
                    for(let i=0;i<arr.length;i++){
                      if(arr[i].id==id){
                          arr.splice(i, 1);
                          return i;
                      }
                      let ret = this.depthTraversal4(arr[i].children,id);
                      if (ret>=0) {
                          return i;
                      }
                    }
                }
            },
            depthTraversal3:function(arr,id){
                let found = false;
                let i;
                if (arr!=null){  
                    for(i=0;i<arr.length;i++){
                      if(arr[i].id==id){
                          arr.splice(i, 1);
                        return -1;
                      }
                        else{
                            let ret = this.depthTraversal4(arr[i].children,id);
                            if(ret>=0)
                                return ret;
                        }
                    
                    }    
                }
            },
            ok1 () {
                // this.recordExpended();
                // console.log(this.id1);
                // this.id1 就是父类id

                this.$axios.post('/costList', {
                            params: {
                                name: this.c_name,
                                parent_id: this.id1,
                            }
                        }).then(function(res) {
                            // console.log(res);
                            // // debugger
                            // //res添加的数据
                            // let ret = this.depthTraversal(this.items, this.id1, res.data);
                            // // debugger
                            this.depthTraversal(this.items, this.id1, res.data);
                            // console.log("status");
                            // console.log(this.items);
                            // Vue.set(this.items, ret, this.items[ret]);
                            // debugger
                            // console.log(this.items);
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('添加成功');
                        // this.recordExpended();
                        // console.log(this.expandedItems);
                        // Vue.nextTick()
                        //   .then(function () {
                        //     // DOM 更新了
                        //     debugger
                        //     console.log("xx");
                        //     // this.madeExpend();
                        // })
                
                // debugger
                // let argu = { 
                //         flag:1,
                //         expandedItems:this.expandedItems,
                //         };
                // this.$router.push({
                //     name: 'cost',
                //     //保存成功后转到工作总结目录
                //     params: argu
                // });
                // location.reload()
                // this.madeExpend();
                // this.expandedItems=[];
                // debugger
                // this.test();
            },
            cancel1 () {
                this.$Message.info('取消');
            },
            ok2 () {
                this.$axios.patch('/costList', {
                            params: {
                                id:this.id1,
                                name: this.e_name,
                            }
                        }).then(function(res) {
                            console.log(res);
                            let ret = this.depthTraversal2(this.items, this.id1, res.data);
                            Vue.set(this.items, ret, this.items[ret]);
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('修改成功');
                        // debugger
            },
            cancel2 () {
                this.$Message.info('取消');
            },
            show_modal1(){
                this.modal1=true; 
                this.c_name="";
            },
      // 有无多选框折叠位置优化
      iconRow() {
        for (var i = 0, len = this.columns.length; i < len; i++) {
          if (this.columns[i].type == 'selection') {
            return 1
          }
        }
        return 0
      },
        // 设置td宽度,td的align
        tdStyle(column) {
            var style = {}
            if (column.align) {
                style["text-align"] = column.align;
            }
            if (column.width) {
                style["min-width"] = column.width + 'px';
            }
            return style;
        },

        // 排序事件
        handleSort(index, type) {
            this.cloneColumns.forEach((col) => col._sortType = 'normal');
            if (this.cloneColumns[index]._sortType === type) {
                this.cloneColumns[index]._sortType = 'normal'
            } else {
                this.cloneColumns[index]._sortType = type
            }
            this.$emit('on-sort-change', this.cloneColumns[index]['key'], this.cloneColumns[index]['_sortType'])
        },
        // 点击某一行事件
        RowClick(data, event, index, text) {
            let result = this.makeData(data)
            this.$emit('on-row-click', result, event, index, text)
        },
        deleteClick() {
            
            this.$Modal.confirm({
                    title: '删除花费科目',
                    content: '<p>确定要删除此花费科目吗？</p>',
                    onOk: () => {
                        this.$axios.delete('/costList', {
                            data: {
                                params: {
                                    id: this.id1,
                                }
                            }
                        }).then(function(res) {
                            console.log(res);
                            let ret=this.depthTraversal3(this.items, this.id1);
                            if(ret>=0)
                                Vue.set(this.items, ret, this.items[ret]);
                        }.bind(this))
                        .catch(function(error) {
                            console.log(error)
                        });
                        this.$Message.info('删除成功');
                    },
                    onCancel: () => {
                        this.$Message.info('取消');
                    }
                });
            // debugger
        },
        // 点击事件 返回数据处理
        makeData(data) {
            const t = this.type(data);
            let o;
            if (t === 'array') {
                o = [];
            } else if (t === 'object') {
                o = {};
            } else {
                return data;
            }

            if (t === 'array') {
                for (let i = 0; i < data.length; i++) {
                    o.push(this.makeData(data[i]));
                }
            } else if (t === 'object') {
                for (let i in data) {
                    if (i != 'spaceHtml' && i != 'parent' && i != 'level' && i != 'expanded' && i != 'isShow' && i !=
                        'load') {
                        o[i] = this.makeData(data[i]);
                    }
                }
            }
            return o;
        },
        // 处理表头数据
        makeColumns() {
            let columns = this.deepCopy(this.columns);
            this.tdsWidth = 0
            columns.forEach((column, index) => {
                column._index = index;
                column._width = column.width ? column.width : '';
                column._sortType = 'normal';
                this.tdsWidth += column.width ? parseFloat(column.width) : 0;
            });
            return columns;
        },
        // 数据处理 增加自定义属性监听
        initData(items, level, parent) {
            this.initItems = []
            let spaceHtml = "";
            for (var i = 1; i < level; i++) {
                spaceHtml += "<i class='ms-tree-space'></i>"
            }
            items.forEach((item, index) => {
                item = Object.assign({}, item, {
                    "parent": parent,
                    "level": level,
                    "spaceHtml": spaceHtml
                });
                if ((typeof item.expanded) == "undefined") {
                    item = Object.assign({}, item, {
                        "expanded": false
                    });
                }
                if ((typeof item.show) == "undefined") {
                    item = Object.assign({}, item, {
                        "isShow": false
                    });
                }
                if ((typeof item.isChecked) == "undefined") {
                    item = Object.assign({}, item, {
                        "isChecked": false
                    });
                }
                item = Object.assign({}, item, {
                    "load": (item.expanded ? true : false)
                });
                //debugger
                this.initItems.push(item);
                if (item.children && item.expanded) {
                    this.initData(item.children, level + 1, item);
                }
            })
        },
        recordExpended(){
            this.initItems.forEach((item)=>{
                if (item.expanded == true) {
                    this.expandedItems.push(item)
                }
            })
            console.log(this.expandedItems);
        },
        madeExpend(){
            if (this.expandedItems.length>0) {
                this.expandedItems.forEach((item)=>{
                let index = 0;
                this.initItems.forEach((initItem)=>{
                    if(initItem.id == item.id){
                        this.toggle(index,initItem)
                    }else{
                        index=index+1;
                    }
                })
            })
            }
        },
        //  隐藏显示
        show(item) {
            return ((item.level == 1) || (item.parent && item.parent.expanded && item.isShow));
        },
        toggle(index, item) {
            // console.log(this.initItems)
            let level = item.level + 1;
            let spaceHtml = "";
            for (var i = 1; i < level; i++) {
                spaceHtml += "<i class='ms-tree-space'></i>"
            }
            if (item.children) {
                //关闭情况
                if (item.expanded) {
                    item.expanded = !item.expanded;
                    this.close(index, item);
                //展开情况
                } else {
                    item.expanded = !item.expanded;
                    if (item.load) {
                        this.open(index, item);
                    } else {
                        item.load = true;
                        item.children.forEach((child, childIndex) => {
                            this.initItems.splice((index + childIndex + 1), 0, child);
                            //设置监听属性
                            this.$set(this.initItems[index + childIndex + 1], 'parent', item);
                            this.$set(this.initItems[index + childIndex + 1], 'level', level);
                            this.$set(this.initItems[index + childIndex + 1], 'spaceHtml', spaceHtml);
                            this.$set(this.initItems[index + childIndex + 1], 'isShow', true);
                            this.$set(this.initItems[index + childIndex + 1], 'expanded', false);
                        })
                    }
                }
            }
            // console.log(this.initItems)
        },

        open(index, item) {
            if (item.children) {
                item.children.forEach((child, childIndex) => {
                    child.isShow = true;
                    if (child.children && child.expanded) {
                        this.open(index + childIndex + 1, child);
                    }
                })
            }
        },

        close(index, item) {
            if (item.children) {
                item.children.forEach((child, childIndex) => {
                    child.isShow = false;
                    child.expanded = false;
                    if (child.children) {
                        this.close(index + childIndex + 1, child);
                    }
                })
            }
        },
        //点击check勾选框,判断是否有children节点 如果有就一并勾选
        handleCheckClick(data, event, index){
            data.isChecked = !data.isChecked;
            var arr = data.children;
            if(arr){
                if(data.isChecked){
                    this.checkGroup.push(data.id);
                    for (let i=0; i<arr.length; i++){
                        this.checkGroup.push(arr[i].id)
                    }
                }else {
                    for (var i=0; i<this.checkGroup.length; i++){
                        if(this.checkGroup[i] == data.id){
                            this.checkGroup.splice(i,1)
                        }
                        for (var j=0; j<arr.length; j++){
                            if(this.checkGroup[i] == arr[j].id){
                                this.checkGroup.splice(i,1);
                            }
                        }
                    }
                }
            }
        },
        //checkbox 全选 选择事件
        handleCheckAll() {
            this.checks = !this.checks;
            if (this.checks) {
                this.checkGroup = this.getArray(this.checkGroup.concat(this.All(this.items)))
            } else {
                this.checkGroup = []
            }
            // this.$emit('on-selection-change', this.checkGroup)
        },
        // 数组去重
        getArray(a) {
            var hash = {},
                len = a.length,
                result = [];
            for (var i = 0; i < len; i++) {
                if (!hash[a[i]]) {
                    hash[a[i]] = true;
                    result.push(a[i]);
                }
            }
            return result;
        },
        checkAllGroupChange(data) {
            if (this.dataLength > 0 && data.length === this.dataLength) {
                this.checks = true;
            } else {
                this.checks = false;
            }
            this.$emit('on-selection-change', this.checkGroup)
        },
        All(data) {
            let arr = []
            data.forEach((item) => {
                arr.push(item.id)
                if (item.children && item.children.length > 0) {
                    arr = arr.concat(this.All(item.children));
                }
            })
            return arr
        },
        // 返回树形数据长度
        Length(data) {
            let length = data.length
            data.forEach((child) => {
                if (child.children) {
                    length += this.Length(child.children)
                }
            })
            return length;
        },
        // 返回表头
        renderHeader(column, $index) {
            if ('renderHeader' in this.columns[$index]) {
                return this.columns[$index].renderHeader(column, $index);
            } else {
                return column.title || '#';
            }
        },

        // 返回内容
        renderBody(row, column, index) {
            return row[column.key]
        },
        renderId(row, index) {
            return row["id"]
        },
        renderName(row, index) {
            return row["name"]
        },
        // 默认选中
        renderCheck(data) {
            let arr = []
            data.forEach((item) => {
                if (item._checked) {
                    arr.push(item.id)
                }
                if (item.children && item.children.length > 0) {
                    arr = arr.concat(this.renderCheck(item.children));
                }
            })
            return arr
        },
        // 深度拷贝函数
        deepCopy(data) {
            var t = this.type(data),
                o, i, ni;
            if (t === 'array') {
                o = [];
            } else if (t === 'object') {
                o = {};
            } else {
                return data;
            }
            if (t === 'array') {
                for (i = 0, ni = data.length; i < ni; i++) {
                    o.push(this.deepCopy(data[i]));
                }
                return o;
            } else if (t === 'object') {
                for (i in data) {
                    o[i] = this.deepCopy(data[i]);
                }
                return o;
            }

        },
        type(obj) {
            var toString = Object.prototype.toString;
            var map = {
                '[object Boolean]': 'boolean',
                '[object Number]': 'number',
                '[object String]': 'string',
                '[object Function]': 'function',
                '[object Array]': 'array',
                '[object Date]': 'date',
                '[object RegExp]': 'regExp',
                '[object Undefined]': 'undefined',
                '[object Null]': 'null', 
                '[object Object]': 'object'
            };
            return map[toString.call(obj)];
        }
    },
    beforeDestroy() {
        window.onresize = null
    }
}
</script>
<style>
.autoTbale {
    overflow: auto;
}

table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
}

.table-bordered {
    border: 1px solid #EBEBEB;
}

.table>tbody>tr>td,
.table>tbody>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
    border-top: 1px solid #e7eaec;
    line-height: 1.42857;
    padding: 8px;
    vertical-align: middle;
}

.table-bordered>tbody>tr>td,
.table-bordered>tbody>tr>th,
.table-bordered>tfoot>tr>td,
.table-bordered>tfoot>tr>th,
.table-bordered>thead>tr>td,
.table-bordered>thead>tr>th {
    border: 1px solid #e7e7e7;
}

.table>thead>tr>th {
    border-bottom: 1px solid #DDD;
}

.table-bordered>thead>tr>td,
.table-bordered>thead>tr>th {
    background-color: #F5F5F6;
}

#hl-tree-table>tbody>tr {
    background-color: #fbfbfb;
}

#hl-tree-table>tbody>.child-tr {
    background-color: #fff;
}

label {
    margin: 0 8px;
}

.ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 14px;
    height: 14px;
}

.ms-tree-space::before {
    content: ""
}

#hl-tree-table th>label {
    margin: 0;
}
</style>
