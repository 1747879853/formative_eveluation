
<template>
    <div>
        <div style="background-color: #ddd;">{{itemtitle}}{{itemno + 1}}</div>
        <p v-for="(key,value) in itemhash">
            {{value}}:{{key}}
        </p>
    </div>

</template>

<script>
export default {
    name: 'hash-key-value-div',
    props: ['itemhash','itemtitle','itemno'],
    data () {
        return {
                      
        };
    },
}
</script>
