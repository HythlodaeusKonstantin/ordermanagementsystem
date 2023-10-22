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
    // Оповещаем родительский компонент о выбранном заказе
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
  },
  mounted() {
    // При переключении на страницу через GET с сервера возвращаем актуальный список заказов
    console.log("Loading orders...")
    if (this.$store.state.auth) {
      const server = this.$store.state.APP_URL
      const uri = server + '/orders'
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
  