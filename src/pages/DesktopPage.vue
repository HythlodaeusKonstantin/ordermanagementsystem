<template>
  <AuthValidation />
  <OrdersTable @selected="ChangeSelectedOrderId"/>
  <ShipmentsTable :selectedOrderId="selectedOrderId"/>
  <div class="home">
  </div>
</template>
  
<script>
import AuthValidation from '@/components/AuthValidation.vue'
import OrdersTable from "@/components/OrdersTable.vue"
import ShipmentsTable from "@/components/ShipmentsTable.vue"

export default {
  data(){
    return {
      selectedOrderId : ""
    }
  },
  name: 'DesktopPage',
  components: {
    AuthValidation,
    OrdersTable,
    ShipmentsTable
  },
  methods: {
    ChangeSelectedOrderId(id){
      this.selectedOrderId = id
    }
  }
}
</script>
  