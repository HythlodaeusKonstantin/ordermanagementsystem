<template>
  <div class="home">
    <strong>Расходные накладные</strong>
  </div>
  <EasyDataTable :headers="headers" :items="items" @click-row="showRow" show-index />
</template>
  
<script>
import axios from 'axios'

export default {
  data() {
    return {
      headers: [],
      itemsAll: [],
      items: [],

    }
  },
  name: 'ShipmentsTable',
  components: {

  },
  props: {
    selectedOrderId: {
      type: String
    }
  },
  watch:
  {
    // При изменении выбранного заказа обновляем видимость расходных накладных - показываем только связанные с выбранным заказом
    selectedOrderId() {
      this.filterShipmentsTable()
    }
  },
  methods: {
    showRow(item) {
      console.log(item)
    },
    // Получаем куки
    getCookie(name) {
      const cDecoded = decodeURIComponent(document.cookie)
      const cArray = cDecoded.split("; ")
      let result = null

      cArray.forEach(element => {
        if (element.indexOf(name) == 0) {
          result = element.substring(name.length + 1)
        }
      })
      return result
    },
    // Отображаем только расходные накладные с выбранным id заказа
    filterShipmentsTable() {
      console.log(this.selectedOrderId)
      let itemsToShow = []
      this.itemsAll.forEach((item) => { if (item.id === this.selectedOrderId) { itemsToShow.push(item) } })
      this.items = itemsToShow
    }
  },
  mounted() {
    // При переключении на страницу подгружаем с сервера актуальный список расходных накладных
    console.log("Loading shipments...")
    if (this.$store.state.auth) {
      const server = this.$store.state.APP_URL
      const uri = server + '/shipments'
      const token = this.getCookie("token")
      axios.get(uri, { headers: { Authorization: "Bearer " + token } })
        .then(responce => {
          const { data: responceData } = responce
          const OrdersData = JSON.parse(responceData)
          const { columns, rows } = OrdersData

          let headersTemp = []
          let headersOnlyToShow = []
          columns.forEach((column) => {
            if (column != "id") {
              headersTemp.push({ text: column, value: column, sortable: true })
              headersOnlyToShow.push(column)
            }
          }
          )

          this.headers = headersTemp
          this.itemsAll = rows
        }, 1)
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>
  