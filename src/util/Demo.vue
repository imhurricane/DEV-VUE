<template>
    <div>
       这是: {{name1}}
    </div>
</template>

<script>
    export default {
        name: "Demo",
        data () {
            return {
                name1 : ''
            }
        },
        props: {
            name: {
                type: [String , Number ],
                default() {
                    return '';
                }
            },
        },
        beforeMount () {
            this.name1 = this.name
       },

        watch : {
            name1(val) {
                console.log(val);
                this.name1 = val
            }
        }
    }
</script>

<style scoped>

</style>