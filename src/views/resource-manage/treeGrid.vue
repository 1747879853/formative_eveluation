<template>
<div>
    <Row>            
        <Card>
            <p slot="title" style="font-size:20px;height: 33px;">
                <Icon type="android-funnel"></Icon>
                评价指标列表&nbsp;&nbsp;&nbsp;
                <Button @click="show_modal()" type="primary">添加评价指标</Button>
                <Modal
                    v-model="f_modal"
                    :title="f_title"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <table>
                    <tr><td>评价指标名</td><td>
                    <Input v-model="f_name" placeholder="请输入评价指标名" clearable style="width: 300px"></Input></td></tr>
                    <tr>&nbsp;</tr>
                    <tr><td>评价指标类型</td><td>                    
                    <Select v-model="f_types" ref="element1" style="width:200px">
                        <Option value="score">score</Option>
                        <Option value="grade">grade</Option>
                        <Option value="text-score">text-score</Option>
                        <Option value="classroom_question">classroom_question</Option>
                    </Select></td></tr>
                    <tr>&nbsp;</tr>
                    <tr><td>评价指标分类</td><td>                    
                    <Select v-model="f_in_class" ref="element1" style="width:200px">
                        <Option value="1">课内指标</Option>
                        <Option value="0">课外指标</Option>
                    </Select></td></tr>
                    <tr>&nbsp;</tr><tr><td>描述</td><td>
                    <Input v-model="f_description" placeholder="请输入评价指标描述" clearable style="width: 300px"></Input></td></tr>
                    <tr>&nbsp;</tr>
                    </table>
                </Modal>
                <Modal
                    v-model="f_modal_modify"
                    :title="f_title"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <table>
                    <tr><td>评价指标名</td><td>
                    <Input v-model="f_name" placeholder="请输入评价指标名" clearable style="width: 300px"></Input></td></tr>                    
                    </table>
                </Modal>
            </p>
            <div :style="{width:tableWidth}" class='autoTbale'>
                <table class="table table-bordered" id='hl-tree-table'>
                    <thead>
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
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in initItems" :key="item.id" v-if="item.status!='2'" v-show="show(item)" :class="{'child-tr':item.parent}">
                            <td v-for="(column,snum) in columns" :key="column.key" :style=tdStyle(column)>
                                <div v-if="column.type === 'action'">
                                    <button v-if="item.parent_id==0" class="ivu-btn ivu-btn-primary ivu-btn-small" @click="show_modal(item, index);">添加子指标</button>
                                    <button class="ivu-btn ivu-btn-success ivu-btn-small" @click="show_modal_modify(item, index);">修改</button>
                                    <button class="ivu-btn ivu-btn-error ivu-btn-small" @click="deleteClick(item, index);">删除</button>
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
        </Card>                      
    </Row>
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
        },
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
            f_modal: false,
            f_modal_modify: false,
            f_modal_action: 0,
            f_title: '添加评价指标',
            f_name: "",
            f_types:'',
            f_in_class:'',
            f_description:'',
            f_authority: "",
            f_status: "",
            f_condition: "",
            current_id: 0,
            current_item: null,
            current_index: -1,
            option:'',
            // statusData:[{id:1,name:'激活'},{id:2,name:'停用'}],
        }
    },
    computed: {
        tableWidth() {
            return this.tdsWidth > this.screenWidth && this.screenWidth > 0 ? this.screenWidth + 'px' : '100%'
        }
    },
    watch: {
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
            return (() => {
                window.screenWidth = document.body.clientWidth
                this.screenWidth = window.screenWidth
            })()
        }
    },
    methods: {
        // selected() {
        //     if (!(this.statusData[this.option] == undefined)) {
        //         this.f_status = this.statusData[this.option].id;
        //     }
        // },
        show_modal(item, index, flag){
            if (item==undefined){
                this.f_title = "添加评价指标";
                this.current_id = 0;
                this.f_modal_action = 1;
                this.f_name = "";
                this.f_description = "";
                this.f_in_class = "";
                this.f_types = "";
            }else if (flag == undefined){
                this.f_title = "添加子指标";
                this.current_id = this.renderId(item);
                this.f_modal_action = 2;
                this.f_name = "";
                this.f_description = "";
                this.f_in_class = "";
                this.f_types = "";
            }
            else {
                let parent_id = this.renderParentId(item);
                if(parent_id==0){
                    this.f_title = "修改评价指标";
                }else{
                    this.f_title = "修改子指标";
                }                
                this.current_id = this.renderId(item);
                this.f_modal_action = 3;
                this.f_name = this.renderName(item);
                this.f_description = this.renderDescription(item);
                this.f_in_class = this.renderInClass(item);
                this.f_types = this.renderTypes(item);
            }
            this.current_item = item;
            this.current_index = index;
            this.f_modal = true; 
        },
        show_modal_modify(item, index){
            
            let parent_id = this.renderParentId(item);
            if(parent_id==0){
                this.f_title = "修改评价指标";
            }else{
                this.f_title = "修改子指标";
            }                
            this.current_id = this.renderId(item);
            this.f_modal_action = 3;
            this.f_name = this.renderName(item);
            this.f_description = this.renderDescription(item);
            this.f_in_class = this.renderInClass(item);
            this.f_types = this.renderTypes(item);
            this.current_item = item;
            this.current_index = index;
            this.f_modal_modify = true; 
        },
        ok () {

            switch (this.f_modal_action) {
                case 1:
                    this.$axios.post('/evaluationList', {
                        params: {
                            name: this.f_name,
                            // eno: this.f_eno,
                            types: this.f_types,
                            description: this.f_description,
                            in_class: this.f_in_class,
                            status: 1,
                            parent_id: 0,
                            // term: this.terms,
                        }
                    }).then(function(res) {
                        let item = res.data;
                        let level = 1;
                        let parent = null;
                        let spaceHtml = "";
                        for (var i = 1; i < level; i++) {
                            spaceHtml += "<i class='ms-tree-space'></i>"
                        }
                        item = Object.assign({}, item, {
                            "parent": parent,
                            "level": level,
                            "spaceHtml": spaceHtml,
                            "expanded": false,
                            "isShow": false,
                            "isChecked": false,
                            "load": false
                        });
                        //debugger
                        this.initItems.push(item);
                        this.$Message.info('添加成功');
                    }.bind(this))
                    .catch(function(error) {
                        console.log(error)
                    });                    
                    break;
                case 2:
                    this.$axios.post('/evaluationList', {
                        params: {
                            name: this.f_name,
                            // eno: this.f_eno,
                            types: this.f_types,
                            description: this.f_description,
                            in_class: this.f_in_class,
                            status: 1,
                            parent_id: this.current_id,
                            // term: this.terms,
                        }
                    }).then(function(res) {
                        // let origin_item = res.data;
                        // let level = this.current_item.level + 1;
                        // let parent = this.current_item;
                        // let spaceHtml = "";
                        // for (var i = 1; i < level; i++) {
                        //     spaceHtml += "<i class='ms-tree-space'></i>"
                        // }
                        // let item = Object.assign({}, origin_item, {
                        //     "parent": parent,
                        //     "level": level,
                        //     "spaceHtml": spaceHtml,
                        //     "expanded": false,
                        //     "isShow": true,
                        //     "isChecked": false,
                        //     "load": false
                        // });
                        // parent.children.push(origin_item);
                        // if (parent.load){
                        //     let len = this.ChildrenLength(parent);
                        //     this.initItems.splice((this.current_index + len), 0, item);
                        // }
                        // if (!parent.expanded){
                        //     this.toggle(this.current_index, this.current_item);
                        // }
                        // this.$Message.info('添加成功');
                        this.initItems[this.current_index].status = '2';
                        let c = this.initItems[this.current_index].children;
                        for (var i =  0; i <c.length; i++) {
                            c[i].status = '2';
                        }
                        let item = res.data;
                        let level = 1;
                        let parent = null;
                        let spaceHtml = "";
                        for (var i = 1; i < level; i++) {
                            spaceHtml += "<i class='ms-tree-space'></i>"
                        }
                        item = Object.assign({}, item, {
                            "parent": parent,
                            "level": level,
                            "spaceHtml": spaceHtml,
                            "expanded": false,
                            "isShow": false,
                            "isChecked": false,
                            "load": false
                        });
                        //debugger
                        this.initItems.push(item);
                        this.$Message.info('添加成功');
                    }.bind(this))
                    .catch(function(error) {
                        console.log(error)
                    });                  
                    break;
                case 3:
                    this.$axios.patch('/evaluationList', {
                        params: {
                            id: this.current_id,
                            name: this.f_name,
                            // eno: this.f_eno,
                            types: this.f_types,
                            description: this.f_description,
                            in_class: this.f_in_class,
                        }
                    }).then(function(res) {
                        this.initItems[this.current_index].name = res.data.name;
                        this.initItems.splice(0,0);
                        this.$Message.info('修改成功');
                    }.bind(this))
                    .catch(function(error) {
                        console.log(error)
                    });                    
                    break;
                default:
                    break;
            }
        },
        cancel () {
            this.$Message.info('取消');
        },
        // 返回子节点长度
        ChildrenLength(item) {
            let length = item.children.length;
            item.children.forEach((child) => {
                length += this.ChildrenLength(child);
            })
            return length;
        },
        depthDelete(index) {
            let item = this.initItems[index];
            if (item.children && item.load) {
                // for (var i=item.children.length-1; i>=0; i--){
                //     this.depthDelete(item.children[i], index + i + 1);
                // }
                for (var i=0; i<item.children.length; i++)
                    this.depthDelete(index + 1);
                // item.children.forEach((child) => {
                //     this.depthDelete(child, index + 1);
                // })
            }

            this.initItems.splice(index, 1);

            if (item == this.current_item) {
                let parent = item.parent;
                if (parent){
                    parent.children = parent.children.filter(function(child) { 
                        return item.id !== child.id;
                    })
                }
            }
            console.log(index);
        },
        // 表courses_evaluations,evaluations,tea_homeworks,weights中的与此评价指标相关的数据都将删除
        deleteClick(item, index) { 
            this.$Modal.confirm({
                title: '删除评价指标',
                content: '<p><span style="color: red">与此评价指标相关的数据都将被删除!</span><br>确定要删除此评价指标吗？</p>',
                onOk: () => {

                    this.current_item = item;
                    this.current_index = index;
                    this.current_id = this.renderId(item);
                    this.$axios.delete('/evaluationList', {
                        data: {
                            params: {
                                id: this.current_id,
                                status: 0,
                            }
                        }
                    }).then(function(res) {
                        // this.initItems[this.current_index].status = '停用';
                        let c = this.initItems[this.current_index].children;
                        for (var i =  0; i <c.length; i++) {
                            c[i].isShow = false;
                        }
                        this.initItems.splice(this.current_index, 1)
                        this.$Message.info('删除成功');
                    }.bind(this))
                    .catch(function(error) {
                        console.log(error)
                    });
                    
                },
                onCancel: () => {
                    this.$Message.info('取消');
                }
            });
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
        //  隐藏显示
        show(item) {
            return ((item.level == 1) || (item.parent && item.parent.expanded && item.isShow));
        },
        toggle(index, item) {
            let level = item.level + 1;
            let spaceHtml = "";
            for (var i = 1; i < level; i++) {
                spaceHtml += "<i class='ms-tree-space'></i>"
            }
            if (item.children) {
                if (item.expanded) {
                    item.expanded = !item.expanded;
                    this.close(index, item);
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
        // renderEno(row, index) {
        //     return row["eno"]
        // },
        renderTypes(row, index) {
            return row["types"]
        },
        renderInClass(row, index){
            if (row["in_class"]=='课内指标') {
                return '1'
            } else if(row["in_class"]=='课外指标'){
                return '0'
            }
        },
        renderDescription(row, index) {
            return row["description"]
        },
        renderParentId(row, index) {
            return row["parent_id"]
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
