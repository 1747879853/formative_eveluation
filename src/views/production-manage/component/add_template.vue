<template>
	<div>
        <Row>            
            <Card>
                <div style="text-align:center;font-size:24px;color: #2db7f5;">
                    模板
                    <span style="float:right;margin-right:100px;"> <Button type="primary" @click="save_and_use">保存</Button></span>
                </div>
                <table style="margin:auto;">
                    <tr>
                        <td>图库</td>
                        <td>
                            <div class="demo-upload-list" v-for="item in uploadList">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                multiple
                                :headers="headers"
                                type="drag"
                                action="//127.0.0.1:3000/api/v1/images"
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="ios-camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="View Image" v-model="visible">
                                <img :src="'http://127.0.0.1:3000/_attachment/' + imgName" v-if="visible" style="width: 100%">
                            </Modal>
                        </td>
                    </tr>
                <tr>&nbsp;</tr>
                <tr>
                    <td>数量</td>
                    <td>
                        <Input v-model="material_number" placeholder="请输入数量(件)" clearable style="width: 300px"></Input> 
                    </td>&nbsp;
                    <td>模板名称</td>
                    <td>
                        <Input v-model="material_name" placeholder="请输入模板名称" clearable style="width: 300px"></Input>
                    </td>
                </tr>
                <tr>&nbsp;</tr>
                <tr>
                    <td>备注</td>
                    <td>
                        <Input v-model="material_comment" placeholder="请输入备注" clearable style="width: 300px"></Input>
                    </td>&nbsp;
                </tr>
                <tr>&nbsp;</tr>
                </table>                    
            </Card>
            <Card>
                <Table :columns="bomsColumns" :data="boms" style="width: 100%;"></Table>
            </Card>
            <Card>
                <span style="float:center;margin-left:100px;font-size:20px;color: #2db7f5;"> 物料清单</span>
                <div style="text-align: left;font-size:15px;">
                <div style="margin-left:100px;">
                    <span style="font-size:24px;float:right;margin-right:100px;"> <Button type="primary" @click="add">添加</Button></span>
                    &nbsp;&nbsp;&nbsp;
                    <table>
                        <tr>
                            <td>名称：</td>
                            <td><Input v-model="bom_name" placeholder="请输入名称" clearable style="width: 250px"></Input></td>&nbsp;
                            <td>材料规格：</td>
                            <td><Input v-model="spec" placeholder="请输入材料规格" clearable style="width: 250px"></Input></td>&nbsp;
                        </tr>
                        <tr>&nbsp;</tr>
                        <tr>
                            <td>长度：</td>
                            <td><Input v-model="bom_length" placeholder="请输入长度(mm)" clearable style="width: 250px"></Input></td>&nbsp;
                            <td>宽度(mm)：</td>
                            <td><Input v-model="bom_width" placeholder="请输入宽度(mm)" clearable style="width: 250px"></Input></td>&nbsp;
                        </tr>
                        <tr>&nbsp;</tr>
                        <tr>
                            <td>数量：</td>
                            <td><Input v-model="bom_number" placeholder="请输入数量(件)" clearable style="width: 250px"></Input></td>&nbsp;
                            <td>总数量：</td>
                            <td><Input v-model="total" placeholder="请输入总数量/套" clearable style="width: 250px"></Input></td>&nbsp;
                        </tr>
                        <tr>&nbsp;</tr>
                        <tr>
                            <td>备注：</td>
                            <td><Input v-model="bom_comment" placeholder="请输入备注" clearable style="width: 400px"></Input></td>&nbsp;
                        </tr>                     
                    </table> 
                </div>           
                </div>
            </Card>
        </Row>
	</div>
</template>
<script>
    export default {
    	name: 'add_template',
        data () {
            return {
                    imgName: '',
                    headers: {
                        'Authorization' : this.$store.state.token
                    },
                    visible: false,
                    uploadList: [],
                    bomsColumns: [
                        {
                            type: "index",
                            title: "序号",
                            width: 60
                        },
                        {
                            title:'名称',
                            key: "bom_name",
                            align: "center"
                        },
                        {
                            title:'材料规格',
                            key: "spec",
                            align: "center"
                        },
                        {
                            title:'长度(mm)',
                            key: "bom_length",
                            align: "center"

                        },
                        {
                            title:'宽度(mm)',
                            key: "bom_width",
                            align: "center"

                        },
                        {
                            title:'数量(件)',
                            key: "bom_number",
                            align: "center"

                        },
                        {
                            title:'总数量/套',
                            key: "total",
                            align: "center"

                        },
                        {
                            title:'备注',
                            key: "bom_comment",
                            align: "center"

                        },
                        {
                            title: "操作",
                            key: "action",
                            align: "center",
                            render: (h, params) => {
                                return h('div', [ 
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.deleteClick(params.index);
                                              }
                                        }
                                    }, '删除')
                                ]);
                            }
                        }
                    ],
                    boms:[],
                    image_name: '',
                    material_number: '',
                    material_comment: '',
                    material_name: '',
                    graph_no: '',

                    bom_comment: '',
                    total: '',
                    bom_number: '',
                    bom_width: '',
                    bom_length: '',
                    spec: '',
                    bom_name: '',
                    status:false,


                }
            },
        methods: {
            add(){
                //如果没选或者填，提出警告
                if((this.bom_name === '')||(this.bom_number === '')){
                    this.$Message.error("内容填写不全！");
                }else{
                    this.boms.push({
                        bom_name:this.bom_name,
                        spec:this.spec,
                        bom_length:this.bom_length,
                        bom_width:this.bom_width,
                        bom_number:this.bom_number,
                        total:this.total,
                        bom_comment:this.bom_comment,
                    })
                }
                // 添加后清空
                this.bom_name='';
                this.spec='';
                this.bom_length='';
                this.bom_width='';
                this.bom_number='';
                this.total='';
                this.bom_comment='';
            },
            save_and_use(){
                if (this.material_name == '') {
                    this.$Message.error("内容填写不全！")
                }else{
                    let images = this.$refs.upload.fileList;
                    for (var i = 0; i < images.length; i++) {
                        if (i === 0) {
                            this.image_name = images[i].name
                        }else {
                            this.image_name += ","+images[i].name
                        }
                    }
                    // this.$route.params.work_order_id
                    // debugger
                    var _this = this;
                    this.$axios
                      .post("/template",{
                        params:{
                            work_order_id: this.$route.params.work_order_id,
                            graph_no: _this.image_name,
                            number: _this.material_number,
                            name: _this.material_name,
                            comment: _this.material_comment,
                            boms: _this.boms
                        }})
                      .then(res => {
                        // debugger
                        if (res.data.iscommit == 1) {
                           _this.$Message.info("添加成功！");
                           // window.history.go(-1)
                           let argu = { order_id:  _this.$route.params.order_id };
                           // debugger
                           this.$router.push({
                                name: 'order-info',
                                params: argu
                            }); 
                        }
                      })
                      .catch(error => {
                        console.log(error);
                      });
                }
            },
            deleteClick(index) 
            {
               this.$Modal.confirm({
                    title: '删除',
                    content: '<p>确定要删除此项吗？</p>',
                    onOk: () => {
                        this.boms.splice(index,1);
                        this.$Message.info('删除成功');
                },
                   onCancel: () => { this.$Message.info('取消'); }});
            },
            handleView (name) {
                // debugger
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // debugger
                const fileList = this.$refs.upload.fileList;
                var _this = this;
                this.$axios
                  .delete("/images",{
                    params:{
                        image_name: file.name
                    }})
                  .then(res => {
                    // debugger
                    _this.status = res.data.status;
                    if (_this.status) {
                        _this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                    }else{
                        _this.$Message.error('删除失败');
                    } 
                    // console.log(res);
                  })
                  .catch(error => {
                    console.log(error);
                  });
            },
            handleSuccess (res, file) {
                file.url =  'http://127.0.0.1:3000/_attachment/' + res.file_name
                file.name = res.file_name;
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件： ' + file.name + '格式不正确.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件大小超出范围',
                    desc: '文件： ' + file.name + '存储量超出2M'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                // debugger
                if (!check) {
                    this.$Notice.warning({
                        title: '不能超过5张图片'
                    });
                }
                return check;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>


