<style lang="less">
    @import '../../styles/common.less';
    @import '../my-components/file-upload/upload.less';
</style>

<!-- 此文件不用了，当时写的时候，总是出错，没找出原因??????????有空找找 -->
<template>
    <div>
        <Row>

            <Col span="8" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="upload"></Icon>
                        导入学生信息excel模板
                    </p>
                    <div class="height-120px">
                        <Row type="flex" justify="center" align="middle" class="height-100">
                            <Upload
                                ref="upload"
                                :format="['xls', 'xlsx']"
                                :on-format-error="handleFormatError"
                                :on-success="handleSuccess"
                                :on-remove="handleRemove"
                                :headers="headers"                                
                                :before-upload="handleBeforeUpload"
                                :default-file-list="defaultList"
                                action="//127.0.0.1:3000/api/v1/upload_student_template">
                                <span>选择文件上传（*.xls,*.xlsx）&nbsp;&nbsp;</span>
                                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                            </Upload>
                        </Row>
                    </div>
                </Card>
            </Col>
        </Row>
       
    </div>
</template>

<script>
export default {
    name: 'upload-student-template',
    data () {
        return {
            defaultList: [],
            headers: {
                        'Authorization' : this.$store.state.token
                    }
        };
    },
    methods: {
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请选择正确格式文件。'
            });
        },

        handleProgress (event, file) {
            this.$Notice.info({
                title: '文件正在上传',
                desc: '文件 ' + file.name + ' 正在上传。'
            });
        },
        handleSuccess (evnet, file) {
            this.defaultList.push({name: file.file_name});
            this.$Notice.success({
                title: '文件上传成功',
                desc: '文件 ' + file.name + ' 上传成功。'
            });
        },
        handleError (event, file) {
            this.$Notice.error({
                title: '文件上传失败',
                desc: '文件 ' + file.name + ' 上传失败。'
            });
        },

        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.$axios.post("/delete_student_template", {
                params: {
                    file_name: file.name,
                }
            }).then( res =>{
                                
                      

            }).catch(error =>{
                console.log(error);
            });
            
        },
        
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        handleBeforeUpload () {            
            const check = this.defaultList.length <= 0;
            // console.log(this.uploadList.length);
            // console.log(check);
            if (!check) {
                this.$Notice.warning({
                    title: '上传新模板前，请先删除旧模板！'
                });
            }
            return check;
        }
               
    },
    mounted () {
        // this.uploadList = this.$refs.upload.fileList;
        let _this = this;
        this.$axios.get('/get_student_template').then(function(res) {
            // console.log(res);
            // this.$Message.info('添加成功');
            if(res.data.status)
            {
                _this.defaultList.push({name: res.data.file_name});
            }
        }.bind(this))
        .catch(function(error) {
            console.log(error)
        });

                
 
    }
};
</script>
