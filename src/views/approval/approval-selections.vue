<template>
    <div>
        <div v-if="selOpt!=''">
        </div>
        <div v-else>
            <div v-for="(item,index) in xx">
                <input type="text" value="item">
                <button @click="delitem">-<button>
                <button @click="additem">+<button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'approval-selections',
    props: ['selOpt'],
    data () {
        return {
            computed:(){
                if (this.selOpt) {
                    xx=this.selOpt.split(',');
                }else{
                    xx=['选项1','选项2','选项3']
                }
            }       

        };
    },
    
    mounted () {
               
    },
    
    methods:{
        additem (evt) {
            this.$emit('sels-changed',tt)
        },
        delitem (evt) {
        },
    }

};
</script>