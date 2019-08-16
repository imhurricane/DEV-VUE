<template>
  <div>
    <ExportExcelData @getResult="getResult"/>
    <Demo :name="1"/>
    <Demo :name="2"/>
    <Demo :name="3"/>
  </div>
</template>
<script>
import ExportExcelData from '../../util/ExportExcelData'
import { implData } from '@/api/tourmanagerResult'
import Demo from '../../util/Demo'
export default {
  name: 'rasult',
  components: { Demo, ExportExcelData },
  methods: {
    getResult (res) {
      implData(res)
    }
  }
}
</script>
