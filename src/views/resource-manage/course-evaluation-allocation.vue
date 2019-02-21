<style lang="less">
    @import 'draggable-list.less';
</style> 
<template>
<div>
    <Row>            
        <Card>
            <div style="text-align:center;font-size:24px;color: #2db7f5;">
                课程评价指标分配
            </div>   当前学期：
            <Select v-model="option" @on-change="selected()" ref="element1" style="width:200px">
                <Option v-for="(item, index) in term" :key="index" :value="item">{{item}}</Option>
            </Select>                 
        </Card>                      
    </Row>
    <Row>
        <Col span="12">
            <Card>
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    课程&nbsp;&nbsp;&nbsp;
                </p>
                <div style="overflow-y:auto;height:500px;">
                    <ul id="editable-new" class="iview-admin-draggable-list">                            
                        <li v-for="(item, index) in users_data" :key="index" class="notwrap todolist-item" :data-index="index"> 
                        {{ item.name }}</li>
                    </ul>
                </div>
            </Card>
        </Col>
        <Col span="12">
            <Card >
                <p slot="title" style="font-size:20px;height: 33px;">
                    <Icon type="android-funnel"></Icon>
                    可分配评价指标&nbsp;&nbsp;&nbsp;
                    <Button type="primary" @click="save()">保存</Button>
                </p>
                <div style="overflow-y:auto;height:500px;">
                    <Tree ref="tree" :data="data1" show-checkbox @on-check-change="check111"></Tree>
                    <!-- <div style="margin-left:210px">
                        <Input v-model="weight" placeholder="请输入权重" clearable style="width: 200px;height:20px"></Input>
                    </div> -->
                </div>

            </Card>
        </Col>
    </Row>
</div>
</template>
<script>
import Sortable from 'sortablejs';
    export default {
        data () {
            return {
                data1: [
                ],
                data2: [
                ],
                users_data: [
                ],
                modal:false,
                select:null,
                option:'',
                term:[],
                weight:[],
                Weight:'',
                c_weight:[],
                course_id:'',
                check:[],
            }
        },
        mounted () { 
        this.$axios.get("/get_termList_e").then( res =>{
            this.term = res.data;
            this.termList();
        }).catch(error =>{
            console.log(error);
        });
        
        let editable = document.getElementById('editable-new');
        let vm = this;
        var editableList = Sortable.create(editable, {            
            onChoose: function (evt) {
                var el = editableList.closest(evt.item); 
                vm.select=parseInt(el.getAttribute('data-index'));              
                //为选中的条目添加样式
                let list= document.getElementById("editable-new").getElementsByTagName("li");
                for (let i = 0; i < list.length; i++) {
                    if(list[i] == el){
                        evt.item.setAttribute("style","border-color: #87b4ee;"); 
                        let ch_id = vm.users_data[parseInt(el.getAttribute('data-index'))].checked_id;
                        vm.course_id = vm.users_data[parseInt(el.getAttribute('data-index'))].id;
                        vm.c_weight=[];
                        function edit(arr){  
                          depthTraversal1(arr); 
                          return arr; 
                        }   
                        function depthTraversal1(arr){  
                            if (arr!=null){  
                                for(let i=0;i<arr.length;i++){
                                    arr[i]["render"]=(h, params) => {
                                          let _this = vm;
                                          return h('span', [
                                              h('span', params.data.name),
                                              h('Input', {
                                                  style: {
                                                      width: '80px',
                                                      marginLeft:'15px'
                                                  },
                                                  props:{
                                                       value:'',
                                                       autosize: true,
                                                       placeholder:"请输入权重"
                                                  },
                                                  on:{
                                                    input:function(e){
                                                        if(e!=''){
                                                            let x = 0;
                                                            for(let k=0;k<_this.c_weight.length;k++){
                                                                if(_this.c_weight[k].id==params.data.id){
                                                                  _this.c_weight[k].weight=e;
                                                                  x=1;
                                                                }
                                                            }
                                                            if(x==0){
                                                              _this.c_weight.push({
                                                                      id: params.data.id,
                                                                      weight:e,
                                                                    })
                                                            }
                                                        }else{
                                                            for(let k=0;k<_this.c_weight.length;k++){
                                                                if(_this.c_weight[k].id==params.data.id){
                                                                  _this.c_weight.splice(k, 1);                                       
                                                                }
                                                            }
                                                        }
                                                        
                                                        // console.log(_this.c_weight)
                                                    },                                  
                                                  }
                                                })
                                          ]);
                                      }                              
                                    for(let xx=0;xx<vm.weight.length;xx++){
                                        if(vm.weight[xx].courses_id==vm.course_id&&vm.weight[xx].evaluations_id==arr[i].id)
                                        {
                                            arr[i]["render"]=(h, params) => {
                                                      let _this = vm;
                                                      return h('span', [
                                                          h('span', params.data.name),
                                                          h('Input', {
                                                              style: {
                                                                  width: '80px',
                                                                  marginLeft:'15px'
                                                              },
                                                              props:{
                                                                   value:_this.weight[xx].weight,
                                                                   autosize: true,
                                                                   placeholder:"请输入权重"
                                                              },
                                                              on:{
                                                                input:function(e){
                                                        
                                                                    if(e!=''){
                                                                        let x = 0;
                                                                        for(let k=0;k<_this.c_weight.length;k++){
                                                                            if(_this.c_weight[k].id==params.data.id){
                                                                              _this.c_weight[k].weight=e;
                                                                              x=1;
                                                                            }
                                                                        }
                                                                        if(x==0){
                                                                          _this.c_weight.push({
                                                                                  id: params.data.id,
                                                                                  weight:e,
                                                                                })
                                                                        }
                                                                    }else{
                                                                        for(let k=0;k<_this.c_weight.length;k++){
                                                                            if(_this.c_weight[k].id==params.data.id){
                                                                              _this.c_weight.splice(k, 1);                                       
                                                                            }
                                                                        }
                                                                    }
                                                                    // console.log(_this.c_weight)
                                                                },                                  
                                                              }
                                                            })
                                                      ]);
                                                  }
                                            vm.c_weight.push({
                                              id: arr[i].id,
                                              weight:vm.weight[xx].weight,
                                            })
                                            break;
                                        }
                                    }                                   

                                    if(ch_id.length!=0){
                                        if(ch_id.indexOf(arr[i].id)>-1){
                                            arr[i].checked=true;
                                        }else{

                                            let v=true;
                                            for(let n=0;n<arr[i].children.length;n++){

                                                if(ch_id.indexOf(arr[i].children[n].id)>-1){
                                                    arr[i].checked=false;
                                                    v=false;
                                                    break;                                                    
                                                }
                                            }
                                            if(v){
                                                arr[i].checked=false;
                                                delete arr[i]["render"]
                                            }
                                        }
                                    }else{
                                        arr[i].checked=false;
                                        delete arr[i]["render"]
                                    }
                                  depthTraversal1(arr[i].children);

                                }
                            }         
                        }
                        vm.data1=edit(JSON.parse(JSON.stringify(vm.data2)));
                        console.log(vm.c_weight)
                    }else{
                        list[i].removeAttribute("style");
                    }                    
                }
                
            },
            
        });        

    },
    methods:{  
        termList(){
            let last = new Date();
            last = parseInt(last.getFullYear())+1;
            let termlast = parseInt(this.term[this.term.length-1].substring(0,4));
            // console.log(first)
            let m = last - termlast;
            for(let i = 1;i<=m;i++){
                if(this.term[this.term.length-1].indexOf('春季学期')!=-1){
                    this.term.push(termlast+"秋季学期");                    
                }
                this.term.push(termlast+1+"春季学期");
                this.term.push(termlast+1+"秋季学期");
            }
            let month = new Date();
            month = parseInt(month.getMonth()+1);
            if(month>8){
                this.option=last-1+"秋季学期";
            }else{
                this.option=last-1+"春季学期";
            } 


            this.$axios.post("/courseevalList", {
                params: {
                    term:this.option,
                }
            }).then( res =>{
                this.users_data = res.data.a;
                this.data2 = res.data.b;
                this.weight = res.data.c;
            }).catch(error =>{
                console.log(error);
            });


        },
        selected() {
            this.users_data=[];
            this.data1=[];
            this.$axios.post("/courseevalList", {
                params: {
                    term:this.option,
                }
            }).then( res =>{
                this.users_data = res.data.a;
                this.data2 = res.data.b;
                this.weight = res.data.c;
            }).catch(error =>{
                console.log(error);
            });
        },       
        showmodal(){
            this.modal=true;
            this.u_name="";
        },
        save (){
            if(this.select==null){
                this.$Message.info('请选中一个课程');
            }else{
                let checked_tree = this.$refs.tree.getCheckedNodes();
                for(var i=0;i<checked_tree.length;i++){
                    if(checked_tree[i].children.length!=0){
                        checked_tree.splice(i,1);
                    }
                }
                let tree_id = [];
                for(let i=0;i<checked_tree.length;i++){
                    tree_id[i]=checked_tree[i].id;
                }
                this.check=[];
                function edit(arr,c_weight,check){  
                  depthTraversal1(arr,c_weight,check); 
                  // console.log(check)
                  return check; 
                }   
                function depthTraversal1(arr,c_weight,check){  
                    if (arr!=null){  
                        for(let i=0;i<arr.length;i++){                             
                            if(tree_id.length!=0){
                                if(tree_id.indexOf(arr[i].id)>-1){
                                    let v=true;
                                    for(let j=0;j<c_weight.length;j++){
                                        if(arr[i].id==c_weight[j].id){                                            
                                            v=false;
                                            break;
                                        }
                                    }
                                    if(v){
                                        // console.log(arr[i].name)
                                        check.push(false);
                                        break;
                                    }
                                }else{
                                    for(let n=0;n<arr[i].children.length;n++){
                                        if(tree_id.indexOf(arr[i].children[n].id)>-1){
                                            let v=true;
                                            for(let j=0;j<c_weight.length;j++){
                                                if(arr[i].id==c_weight[j].id){
                                                    v=false;
                                                    break;
                                                }
                                            }
                                            if(v){
                                                check.push(false);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }else{
                                break;
                            }
                          depthTraversal1(arr[i].children,c_weight,check);
                        }
                    }         
                }
                this.check=edit(JSON.parse(JSON.stringify(this.data1)),this.c_weight,this.check);
                if(this.check.length==0){
                    this.$axios.patch('/courseevalList', {
                        params: {
                            id:this.users_data[this.select].id,
                            checked_id:tree_id,
                            weight:this.c_weight,
                            term:this.option,
                        }
                    }).then(function(res) {
                        console.log(res);
                        this.users_data[this.select].checked_id = res.data.a.checked_id;
                        this.weight = res.data.b;
                        this.$Message.info('保存成功');
                    }.bind(this))
                    .catch(function(error) {
                        console.log(error)
                    });
                }else{
                    this.$Message.info('请填入所有已选择的评价指标的权重！');
                }               
                        
            }   
        },
        check111(checkedList){
            let ch_id = [];  
            for(let i=0;i<checkedList.length;i++){
                ch_id.push(checkedList[i].id);
            }
            let vm = this;
            vm.c_weight=[];
            function edit(arr){  
              depthTraversal1(arr); 
              return arr; 
            }   
            function depthTraversal1(arr){  
                if (arr!=null){  
                    for(let i=0;i<arr.length;i++){
                        arr[i]["render"]=(h, params) => {
                              let _this = vm;
                              return h('span', [
                                  h('span', params.data.name),
                                  h('Input', {
                                      style: {
                                          width: '80px',
                                          marginLeft:'15px'
                                      },
                                      props:{
                                           value:'',
                                           autosize: true,
                                           placeholder:"请输入权重"
                                      },
                                      on:{
                                        input:function(e){
                                
                                            if(e!=''){
                                                let x = 0;
                                                for(let k=0;k<_this.c_weight.length;k++){
                                                    if(_this.c_weight[k].id==params.data.id){
                                                      _this.c_weight[k].weight=e;
                                                      x=1;
                                                    }
                                                }
                                                if(x==0){
                                                  _this.c_weight.push({
                                                          id: params.data.id,
                                                          weight:e,
                                                        })
                                                }
                                            }else{
                                                for(let k=0;k<_this.c_weight.length;k++){
                                                    if(_this.c_weight[k].id==params.data.id){
                                                      _this.c_weight.splice(k, 1);                                       
                                                    }
                                                }
                                            }
                                            // console.log(_this.c_weight)
                                        },                                  
                                      }
                                    })
                              ]);
                          }                              
                        for(let xx=0;xx<vm.weight.length;xx++){
                            if(vm.weight[xx].courses_id==vm.course_id&&vm.weight[xx].evaluations_id==arr[i].id)
                            {
                                arr[i]["render"]=(h, params) => {
                                          let _this = vm;
                                          return h('span', [
                                              h('span', params.data.name),
                                              h('Input', {
                                                  style: {
                                                      width: '80px',
                                                      marginLeft:'15px'
                                                  },
                                                  props:{
                                                       value:_this.weight[xx].weight,
                                                       autosize: true,
                                                       placeholder:"请输入权重"
                                                  },
                                                  on:{
                                                    input:function(e){
                                            
                                                        if(e!=''){
                                                            let x = 0;
                                                            for(let k=0;k<_this.c_weight.length;k++){
                                                                if(_this.c_weight[k].id==params.data.id){
                                                                  _this.c_weight[k].weight=e;
                                                                  x=1;
                                                                }
                                                            }
                                                            if(x==0){
                                                              _this.c_weight.push({
                                                                      id: params.data.id,
                                                                      weight:e,
                                                                    })
                                                            }
                                                        }else{
                                                            for(let k=0;k<_this.c_weight.length;k++){
                                                                if(_this.c_weight[k].id==params.data.id){
                                                                  _this.c_weight.splice(k, 1);                                       
                                                                }
                                                            }
                                                        }
                                                    },                                  
                                                  }
                                                })
                                          ]);
                                      }
                                vm.c_weight.push({
                                  id: arr[i].id,
                                  weight:vm.weight[xx].weight,
                                })
                                break;
                            }
                        }                                   

                        if(ch_id.length!=0){
                            if(ch_id.indexOf(arr[i].id)>-1){
                                arr[i].checked=true;
                            }else{
                                let v=true;
                                for(let n=0;n<arr[i].children.length;n++){
                                    if(ch_id.indexOf(arr[i].children[n].id)>-1){
                                        arr[i].checked=false;
                                        v=false;
                                        break;
                                    }
                                }
                                if(v){
                                    arr[i].checked=false;
                                    delete arr[i]["render"]
                                }                           
                            }
                        }else{
                            arr[i].checked=false;
                            delete arr[i]["render"]
                        }


                      depthTraversal1(arr[i].children);
                    }
                }         
            }
            vm.data1=edit(JSON.parse(JSON.stringify(vm.data2)));       
        }   
    }
}
</script>
