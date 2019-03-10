<style lang="less">
    @import '../../styles/common.less';
    @import '../my-components/file-upload/upload.less';
</style>

<template>
    <div>
        <Row>
            
            <Col span="24" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="upload"></Icon>
                        学生信息excel模板
                    </p>
                    <div class="height-120px">
                        <Row type="flex" justify="center" align="middle" class="height-100">
                            <Col span="7" class="padding-left-10">
                            <Upload
                                ref="upload"
                                action="//127.0.0.1:3000/api/v1/upload_student_template"
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
                                <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                                
                            </Upload>
                            </Col>
                            <Col span="4" class="padding-left-10">
                            <Button @click="handleUpload">开始上传</Button>
                            </Col>
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
            uploadList: [],
            headers: {
                        'Authorization' : this.$store.state.token
                    }
        };
    },
    methods: {
        handleUpload () {
            if(this.uploadList.length ==0){
                this.$Notice.warning({
                    title: '请先选择需要上传的文件'
                });
                return
            }
            let params = new FormData()
            // 将uploadList中的文件添加到FormData中
            this.uploadList.forEach(file => params.append('file', file))
            params.append('Authorization', this.$store.state.token)
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }

            this.$axios.post('upload_student_template', params, config)
                .then(resp => {
                    // let respData = resp.data
                    // debugger
                    // if (respData.code === '0000') {
                    //     this.$Message.success('上传成功')
                    //     this.uploadList.forEach(file => this.uploadedList.push(file.url))
                    //     this.uploadList = []
                    // } else {
                    //     store.dispatch('onAddERR', respData.desc)
                    // }
                    this.$Notice.success({
                        title: '文件上传成功',
                        desc: '文件 ' + resp.data.file_name + ' 上传成功。'
                    });
                })
                .catch(err => {
                    // store.dispatch('onAddERR', '服务器内部错误，请稍后再试')
                    this.$Notice.error({
                        title: '文件上传失败',
                        desc: '服务器内部错误，请稍后再试'
                    });
                })
        },
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
            if (!/(xls|xlsx)$/.test(file.name)) {
              this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请选择excel文件。'
                // desc: `文件 ${file.name} 格式不正确，请选择excel文件`
              })
              return false
            }
            if (this.uploadList.length > 0) {
                this.$Notice.warning({
                    title: '文件已选择！'
                });
                return false;
            }
            const check = this.defaultList.length <= 0;
            if (!check) {
                this.$Notice.warning({
                    title: '上传新模板前，请先删除旧模板！'
                });
                return false;
            }
            // 创建一个 FileReader 对象
            let reader = new FileReader()
            // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
            // 读取文件作为 URL (base64编码)可访问地址
            reader.readAsDataURL(file)
            const _this = this
            reader.onload = function (e) {
                file.url = reader.result
                // 添加到用于手动上传的列表uploadList中并展示（即预览功能实现）
                _this.uploadList.push(file);
                // _this.$refs.upload.fileList.push(file);
                _this.defaultList.push({name: file.name});
            }
            // 取消自动上传的触发，手动上传
            return false 
        },
        
        handleSuccess (evnet, file) {
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
            // 从 upload 实例删除数据
            // const fileList = this.$refs.upload.fileList;
            // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.defaultList = [];
            this.uploadList = [];
            // console.log(file.name);
            
            this.$axios.post("/delete_student_template", {
                params: {
                    file_name: file.name,
                }
            }).then( res =>{
                                
                 console.log("delete success");     

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
