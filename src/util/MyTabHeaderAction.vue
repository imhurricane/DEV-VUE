<template>
    <div class="tab-header-action">
        <span>{{name}}</span>
        <Divider style="height: 100%" type="vertical" />
        <template v-for="btn in thActionBtns">
            <Button @click="thCommonBut(btn.method)" style="font-size: 16px" :icon="btn.iconName" type="text">{{btn.content}}</Button>
        </template>
    </div>
</template>

<script>
    export default {
        name: "MyTabHeaderAction",
        props : {
            thActionBtns: {
                type: Array,
                default (){
                    return [
                        {method:'addBut' , iconName: 'ios-create' , content : '新增'},
                        {method:'delBtn' , iconName: 'md-trash' , content : '删除'}
                    ]
                }
            },
            name : {
                type: String,
                default (){
                    return '请为我起名'
                }
            }
        },
        methods: {
            thCommonBut (method) {
                this.$emit(method , null);
            }
        }
    }
</script>

<style scoped>
    .tab-header-action {
        padding-left:8px;
        margin-bottom: 10px ;
        height: 40px;
        line-height: 40px;
    }
</style>