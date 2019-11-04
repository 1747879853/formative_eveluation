<style lang="less">
    @import '../../styles/common.less';
    @import '../my-components/file-upload/upload.less';
</style>
<!-- action="//47.100.174.14:9999/api/v1/upload_student_template" -->
<template>
    <div>
        <Row>
            
            <Col span="8" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="upload"></Icon>
                        学生信息excel模板
                    </p>
                    <div class="height-120px">
                        <Row type="flex" justify="center" align="middle" class="height-100">
                            <Upload
                                ref="upload"
                                action="/api/v1/upload_student_template"
                                :format="['xls', 'xlsx']"
                                :on-format-error="handleFormatError"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :headers="headers"
                                :before-upload="handleBeforeUpload"
                                :default-file-list="defaultList"
                                :on-remove="handleRemove"
                            >
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
            defaultList: [
                // {
                //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
                //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                // },
                // {
                //     'name': 'bc7521e033abdd1e92222d733590f104',
                //     'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                // }
            ],
            headers: {
                        'Authorization' : this.$store.state.token
                    }
        };
    },
    methods: {
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请选择excel文件。'
            });
        },
        handleBeforeUpload (file) {
            // this.$Notice.warning({
            //     title: '文件准备上传',
            //     desc: '文件 ' + file.name + ' 准备上传。'
            // });
            const check = this.$refs.upload.fileList.length <= 0;
            // console.log(this.$refs.upload.fileList.length);
            // console.log(this.uploadList.length);
            // console.log(check);
            if (!check) {
                this.$Notice.warning({
                    title: '上传新模板前，请先删除旧模板！'
                });
            }
            return check;
        },
        handleProgress (event, file) {
            this.$Notice.info({
                title: '文件正在上传',
                desc: '文件 ' + file.name + ' 正在上传。'
            });
        },
        handleSuccess (response, file, fileList) {
            // this.$Notice.success({
            //     title: '文件上传成功',
            //     desc: '文件 ' + file.name + ' 上传成功。'
            // });
            let _this = this
            if(response.status){
              this.$Notice.success({
                title: '文件上传成功',
                desc: '文件 ' + file.name + ' 上传成功。'
              })
              
            }else{
              this.$refs.upload.fileList.splice(0, this.$refs.upload.fileList.length)
              this.$Notice.error({
                title: '文件 ' + file.name + ' 上传失败。',
                desc: response.msg
              })
            }
        },
        handleError (event, file) {
            this.$Notice.error({
                title: '文件上传失败',
                desc: '文件 ' + file.name + ' 上传失败。'
            });
        },

        handleRemove (file) {
            // 从 upload 实例删除数据
            let _this = this;
            
            // console.log(file.name);
            
            this.$axios.post("/delete_student_template", {
                params: {
                    file_name: file.name,
                }
            }).then( res =>{
                if (res.data.status){
                    const fileList = _this.$refs.upload.fileList;
                    _this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);   
                    _this.$Message.info('删除成功')             
                } else {
                    _this.$Message.info('删除失败')
                }     

            }).catch(error =>{
                console.log(error);
            });
        },
       
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
