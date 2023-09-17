<template>
  <AuthValidation />
  <ModalDialog>ddd</ModalDialog>
  <OrdersTable @selected="ChangeSelectedOrderId"/>
  <ShipmentsTable :selectedOrderId="selectedOrderId"/>
  <div class="home">
  </div>
</template>
  
<script>
import AuthValidation from '@/components/AuthValidation.vue'
import OrdersTable from "@/components/OrdersTable.vue"
import ShipmentsTable from "@/components/ShipmentsTable.vue"
import ModalDialog from '@/components/ModalDialog.vue'

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
    ShipmentsTable,
    ModalDialog
},
  methods: {
    ChangeSelectedOrderId(id){
      this.selectedOrderId = id
    }
  }
}
</script>
  