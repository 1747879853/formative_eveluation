<style lang="less">
    @import '../../styles/common.less';
    @import 'draggable-list-old.less';
</style>
<template>
    <div class="access">
        <Row>
            表单设置<br>
            审批名称最多50字
            <Input v-model="approvalName" placeholder="Enter something..." style="width: 300px"></Input>

            审批说明最多100字
            <Input v-model="approvalComment" placeholder="Enter something..." style="width: 300px"></Input>
        </Row>
        <Row>
            表单设计<br>
            <Card>
                <Row>
                    <Col span="12">
                        <Card dis-hover>
                            <p slot="title">
                                <Icon type="ios-list"></Icon>
                               控件库(拖拽到右侧添加)
                            </p>
                            <div style="height: 720px;">
                                <ul id="todoList" class="iview-admin-draggable-list">
                                    <li v-for="(item, index) in todoArray" :key="index" class="notwrap todolist-item" :data-index="index">
                                        {{ item.content }}
                                        <Button type="primary" shape="circle" size="small" icon="close" class="btn-not-seen" @click="del_this_li"></Button>
                                    </li>
                                </ul>
                            </div>
                        </Card>                        
                    </Col>
                    <Col span="12" class="padding-left-10">
                        <Row>
                        <Card dis-hover>
                            <p slot="title">
                                <Icon type="ios-list-outline"></Icon>
                                申请表单清单
                            </p>
                            <div style="height: 360px;">
                                <ul id="doList" class="btn-seen iview-admin-draggable-list"></ul>
                            </div>
                        </Card>
                        </Row>
                        <Row>
                            <Card dis-hover>
                            <p slot="title">
                                <Icon type="ios-list-outline"></Icon>
                                明细清单
                            </p>
                            <div style="height: 360px;">
                                <ul id="detailList" class="btn-seen iview-admin-draggable-list"></ul>
                            </div>
                        </Card>

                        </Row>
                    </Col>
                </Row>
            </Card>
        </Row>  
    </div>
</template>

<script>
import Sortable from 'sortablejs';
export default {
    name: 'new-approval-tmpl',
    data () {
        return {
            approvalName: '',
            approvalComment: '',
            todoArray: [
                {
                    content: '完成iview-admin基本开发'
                },
                {
                    content: '对iview-admin进行性能优化'
                },
                {
                    content: '对iview-admin的细节进行优化'
                },
                {
                    content: '完成iview-admin开发'
                },
                {
                    content: '解决发现的bug'
                },
                {
                    content: '添加更多组件'
                },
                {
                    content: '封装更多图表'
                },
                {
                    content: '增加更多人性化功能'
                }
            ],
            doArray: [],
        };
    },
    mounted() {
        document.body.ondrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        let vm = this;
        let todoList = document.getElementById('todoList');
        Sortable.create(todoList, {
            group: {
                name: 'list',
                pull: 'clone',
                put: false

            },

            sort: false,
            animation: 120,
            ghostClass: 'placeholder-style',
            fallbackClass: 'iview-admin-cloned-item',
            onRemove (event) {
                vm.doArray.splice(event.newIndex, 0, vm.todoArray[event.item.getAttribute('data-index')]);
            },
            onClone: function (/**Event*/evt) {
                // var origEl = evt.item;
                // var cloneEl = evt.clone;
                // cloneEl.innerHTML = cloneEl.innerHTML + "<button v-on:click='testbtn'>Add 1</button>"
                // 
            },
            // onAdd: function (/**Event*/evt) {
            //     var itemEl = evt.item;  // dragged HTMLElement
            //     evt.from;  // previous list
            //     // + indexes from onEnd
            //     debugger
            //     itemEl.innerHTML = itemEl.innerHTML + "<button v-on:click='testbtn'>Add 1</button>"
            // },
            // setData: function (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) {
            //     dataTransfer.setData('Text', dragEl.textContent+"<button v-on:click='testbtn'>Add 1</button>"); // `dataTransfer` object of HTML5 DragEvent
            //     // debugger
            // }
        });
        let doList = document.getElementById('doList');
        Sortable.create(doList, {
            group: {
                name: 'list',
                pull: false,
                put: true
            },
            
            onAdd: function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement
                evt.from;  // previous list
                //the next line is ok,but click not work
                // itemEl.innerHTML = itemEl.innerHTML + "<button v-on:click='testbtn'>Add 1</button>"
                // debugger
                // itemEl.childNodes[1].addEventListener('click', this.del_this_li);
            },
            onEnd: function (/**Event*/evt) {
                evt.oldIndex;  // element's old index within parent
                evt.newIndex;  // element's new index within parent
                debugger
            },
            onUpdate: function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement
                // + indexes from onEnd
                debugger
            },
            onDrop: function(evt){
                var itemEl = evt.item;
                debugger

            },
            scroll: true,
            sort: true,
            filter: '.iview-admin-draggable-delete',
            animation: 120,
            fallbackClass: 'iview-admin-cloned-item',
            onRemove (event) {
                vm.doArray.splice(event.oldIndex, 1);
            },
            onChoose: function (/**Event*/evt) {
                // alert(evt.oldIndex);  // element index within parent
            }
        });
        let detailList = document.getElementById('detailList');
        Sortable.create(detailList, {
            group: {
                name: 'list',
                pull: false,
                put: true
            },
            scroll: true,
            sort: true,
            filter: '.iview-admin-draggable-delete',
            animation: 120,
            fallbackClass: 'iview-admin-cloned-item',
            onRemove (event) {
                vm.doArray.splice(event.oldIndex, 1);
            }
        });
    },
    methods: {
        del_this_li(event){
            // this.parent
            // debugger
            // alert(111);
            // event.target.parentNode.remove(event.target)
            event.target.parentNode.parentNode.removeChild(event.target.parentNode)
        }
        
        
    }
};
</script>

<style>

</style>
