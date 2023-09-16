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
    selectedOrderId() {
      this.filterShipmentsTable()
    }
  },
  methods: {
    showRow(item) {
      console.log(item)
    },
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
    filterShipmentsTable() {
      console.log(this.selectedOrderId)
      let itemsToShow = []
      this.itemsAll.forEach((item) => {if (item.id === this.selectedOrderId) {itemsToShow.push(item)}})
      this.items = itemsToShow
    }
  },
  mounted() {
    console.log("Loading orders...")
    if (this.$store.state.auth) {
      const uri = 'http://127.0.0.1:8000/shipments'
      const token = this.getCookie("token")
      axios.get(uri, { headers: { Authorization: "Bearer " + token } })
        .then(responce => {
          const { data: responceData } = responce
          const OrdersData = JSON.parse(responceData)
          const { columns, rows } = OrdersData
          console.log(columns)
          console.log(rows)

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
  