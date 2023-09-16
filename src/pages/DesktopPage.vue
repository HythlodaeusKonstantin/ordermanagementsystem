<template>
  <AuthValidation />
  <OrdersTable />
  <div class="home">
  </div>
</template>
  
<script>
import AuthValidation from '@/components/AuthValidation.vue'
import OrdersTable from "@/components/OrdersTable.vue"

export default {
  data(){
    return {
    }
  },
  name: 'DesktopPage',
  components: {
    AuthValidation,
    OrdersTable
  }
}
</script>
  