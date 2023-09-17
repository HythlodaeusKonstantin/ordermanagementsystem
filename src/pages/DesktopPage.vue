<template>
  <AuthValidation />
  <button @click="showDialog">Создать заказ</button>
  <OrdersTable v-if="!dialogVisible" @selected="ChangeSelectedOrderId" />
  <ShipmentsTable v-if="!dialogVisible" :selectedOrderId="selectedOrderId" />
  <div class="home">
  </div>
  <ModalDialog v-model:show=dialogVisible>
    <div>
      <createOrderDialog></createOrderDialog>
    </div>
  </ModalDialog>
</template>
  
<script>
import AuthValidation from '@/components/AuthValidation.vue'
import OrdersTable from "@/components/OrdersTable.vue"
import ShipmentsTable from "@/components/ShipmentsTable.vue"
import ModalDialog from '@/components/ModalDialog.vue'
import createOrderDialog from '@/components/CreateOrderDialog.vue'

export default {
  data() {
    return {
      selectedOrderId: "",
      dialogVisible: false
    }
  },
  name: 'DesktopPage',
  components: {
    AuthValidation,
    OrdersTable,
    ShipmentsTable,
    ModalDialog,
    createOrderDialog
  },
  methods: {
    ChangeSelectedOrderId(id) {
      this.selectedOrderId = id
    },
    showDialog(){
      this.dialogVisible = true 
    }
  }
}
</script>
  