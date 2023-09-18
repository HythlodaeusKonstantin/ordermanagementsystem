<template>
  <AuthValidation />
  <div class="container d-flex justify-content-end">
    <button class="btn btn-outline-dark" @click="showDialog">Создать заказ</button>
  </div>
  <OrdersTable v-if="!dialogVisible" @selected="ChangeSelectedOrderId" />
  <ShipmentsTable v-if="!dialogVisible" :selectedOrderId="selectedOrderId" />
  <div class="home">
  </div>
  <ModalDialog v-model:show=dialogVisible>
    <div>
      <createOrderDialog v-model:show=dialogVisible></createOrderDialog>
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
    showDialog() {
      this.dialogVisible = true
    }
  },
}
</script>
  