<template>
    <div  class="my-content">
        <div class="my-content-item">
            <label class="my-content-item-label">
                专业名称：
            </label>
            <Input placeholder="专业名称"
                   class="my-content-item-input"
                   v-model="getRowData.description"
            />
        </div>
        <div class="my-content-item">
            <label class="my-content-item-label">
                创建人：
            </label>
            <Input
                    disabled
                    class="my-content-item-input"
                    v-model="getRowData.cj_userName || currentUser"
            />
        </div>
        <div class="my-content-item">
            <label class="my-content-item-label">
                创建时间：
            </label>
            <Input disabled
                   class="my-content-item-input"
                   v-model="getRowData.reportdate || newDate "
            />
        </div>
        <div class="my-content-item">
            <label class="my-content-item-label">
                修改人：
            </label>
            <Input disabled
                   class="my-content-item-input"
                   v-model="getRowData.xg_userName || currentUser"
            />
        </div>
        <div class="my-content-item">
            <label class="my-content-item-label">
                修改时间：
            </label>
            <Input disabled
                   class="my-content-item-input"
                   v-model="getRowData.changedate || newDate "
            />
        </div>

    </div>
</template>

<script>
import { getDateString } from '@/libs/util'
import '@/util/util.css'
import { mapGetters } from 'vuex'
export default {
  name: 'ZyInfo',
  data () {
    return {
      newDate: getDateString(),
      currentUser: JSON.parse(localStorage.getItem('userInfo')).userName
    }
  },
  computed: {
    ...mapGetters('publicTableStore', [
      'getRowData'
    ])
  }
}
</script>

<style scoped>
    .my-contentOne {
        display: flex;
        margin-bottom: 10px;
    }
</style>
