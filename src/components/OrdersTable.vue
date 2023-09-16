<template>
  <div class="home">
    <strong>Заказы на производство</strong>
  </div>
  <EasyTable :headers="headers" :items="items" />
</template>
  
<script>
import EasyTable from '@/components/Table.vue'
import axios from 'axios'

export default {
  data() {
    return {
      headers: [{ text: "name", value: "name" }],
      items: [{ name: "d" }, { name: "e" }]
    }
  },
  name: 'OrdersTable',
  components: {
    EasyTable
  },
  methods: {
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
          console.log(columns)
          console.log(rows)

          let headersTemp = []
          columns.forEach((column) => headersTemp.push({ text: column, value: column, sortable: true }))

          let itemsTemp = []
          rows.forEach((row) => {
            let line = {}
            columns.forEach((column) => {
              line[column] = row[column]
            }
            )
            itemsTemp.push(line)
          }
          )

          this.headers = headersTemp
          this.items = itemsTemp
        }, 1)
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
  