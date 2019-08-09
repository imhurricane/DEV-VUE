<template>
  <div>
    <div v-if="datas.child !== undefined && datas.child !== 'undefined' ">
      <Dropdown placement="right-start">
        <DropdownItem :name="datas.id">
          {{datas.name}}
          <Icon type="ios-arrow-forward"></Icon>
        </DropdownItem>
        <DropdownMenu slot="list">
          <div v-for="childs in datas.child">
<!--            <DropdownItem :name=childs.id>{{childs.name}}</DropdownItem>-->
            <DropdownItemUtil :datas="childs"/>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div v-else>
      <DropdownItem :name=datas.id> {{datas.name}}</DropdownItem>
    </div>
  </div>
</template>

<script>
    import DropdownItemUtil from './DropdownItemUtil'
    export default {
      name: "DropdownItemUtil",
      props: {
        datas: {
          default() {
            return [];
          }
        },
        components: {
          DropdownItemUtil
        }
      }
    }
</script>

<style scoped>

</style>
