<template>
  <AuthValidation />
  <div class="home">
  </div>
  <div>
    <AddressesTable />
    {{this.$route.path}}
  </div>
</template>
  
<script>
import AuthValidation from '@/components/AuthValidation.vue'
import AddressesTable from '@/components/AddressesTable.vue';
export default {
  name: 'HomePage',
  components: {
    AuthValidation,
    AddressesTable
  }
}
</script>
  