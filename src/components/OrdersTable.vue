<template>
  <div class="home">
    <strong>Заказы на производство</strong>
  </div>
  <EasyDataTable :headers="headers" :items="items" @click-row="showRow" show-index/>
</template>
  
<script>
import axios from 'axios'
export default {
  data() {
    return {
      headers: [],
      itemsAll: [],
      items: [],
      selectedOrder: {},
    }
  },
  name: 'OrdersTable',
  components: {
  },
  methods: {
    showRow(item) {
            let id = ''
            this.itemsAll.forEach((itemI) => {
              if(itemI.ЗаказНаПроизводство === item.ЗаказНаПроизводство){
                id = itemI.id
              }
            }
            )
            this.$emit('selected', id)
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
  },
  mounted() {
    console.log("Loading orders...")
    if (this.$store.state.auth) {
      const uri = 'http://127.0.0.1:8000/orders'
      const token = this.getCookie("token")
      axios.get(uri, { headers: { Authorization: "Bearer " + token } })
        .then(responce => {
          const { data: responceData } = responce
          const OrdersData = JSON.parse(responceData)
          const { columns, rows } = OrdersData

          let headersTemp = []
          let headersOnlyToShow = []
          columns.forEach((column) => {
            if (column!="id"){
            headersTemp.push({ text: column, value: column, sortable: true })
            headersOnlyToShow.push(column)
          }
          }
          )

          let itemsTemp = []
          rows.forEach((row) => {
            let line = {}
            headersOnlyToShow.forEach((column) => {
              line[column] = row[column]
            }
            )
            itemsTemp.push(line)
          }
          )

          this.headers = headersTemp
          this.items = itemsTemp
          this.itemsAll = rows
        }, 1)
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
  