
<template>
    <div class="access">
        <Row>
            <Button type="primary" icon="plus-round" @click="goto_new_approval">创建新审批</Button>
           
        </Row>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: 'access_index',
    data () {
        return {
            accessCode: parseInt(Cookies.get('access')),
            switchValue: parseInt(Cookies.get('access')) === 1
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        changeAccess (res) {
            if (res) {
                this.accessCode = 1;
                Cookies.set('access', 1);
            } else {
                this.accessCode = 0;
                Cookies.set('access', 0);
            }
            this.$store.commit('updateMenulist');
        },
        goto_new_approval(){
            this.$router.push({
                name: 'new-approval',
            });
        }
    }
};
</script>

<style>

</style>
