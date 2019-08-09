<template>
    <Dropdown @on-click="clickItem" placement="bottom-start">
        <Input :value="inputValue" readonly style="width: 100% ;" @on-clear="clear" clearable
               :placeholder="placeholder"/>
        <DropdownMenu slot="list">
            <div v-for="item in dataArray">
                <DropdownItemUtil :datas="item"/>
            </div>

        </DropdownMenu>
    </Dropdown>
</template>

<script>
    import DropdownItemUtil from "./DropdownItemUtil";

    export default {
        name: "DropdownUtil",
        data() {
            return {
                itemName: null,
                inputValue: this.inputValues
            }
        },
        props: {
            dataArray: {
                type: Array,
                default() {
                    return [];
                }
            },
            placeholder: {
                type: String
            },
            inputValues: {
                type: String
            }
        },
        methods: {
            clickItem(name) {
                this.inputValue = name;
                this.$emit("on-click-item", name);
            },
            clear() {
                this.$emit("on-clear", null);
            }
        },
        components: {
            DropdownItemUtil
        },
        //监听data的变化
        watch: {
            inputValue: function (val, oldVal) {
            },
        }
    }
</script>

<style scoped>

</style>
