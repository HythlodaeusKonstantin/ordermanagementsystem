<template>
  <div class="home">
    <div class="container d-flex justify-content-center">
      <strong>Адреса доставки</strong>
    </div>
    <div class="container d-flex">
      <div class="input-group mb-1 d-flex justify-content-end">
        <input type="text" @change="addressName = $event.target.value" :value="addressName"
          placeholder="Введите новый адрес">
        <button class="btn btn-outline-dark" @click="addNewAddress" :disabled="!addressName">Добавить новый
          адрес</button>
      </div>
    </div>
    <div class="container justify-content-end sm-1">
      <EasyDataTable :headers="headers" :items="items" @click-row="showRow" show-index />
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'
export default {
  data() {
    return {
      addressName: "",
      headers: [{ text: "Адрес", value: "name" }],
      items: [],
      addresses: [],
    }
  },
  name: 'AddresssesTable',
  components: {
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
    addNewAddress() {
      console.log("dsfsd")
      if (this.$store.state.auth && this.addressName) {
        const dataToCreateAddress = {}
        dataToCreateAddress.addressName = this.addressName
        const server = this.$store.state.APP_URL
        const uriAdresses = server + '/address'
        const token = this.getCookie("token")

        console.log(dataToCreateAddress)

        axios({
          method: "post",
          url: uriAdresses,
          data: dataToCreateAddress,
          headers: { Authorization: "Bearer " + token }
        })
          .then(responce => {
            this.refreshAddressTable()
            this.addressName = ''
          })
          .catch((error) => {
            this.addressName = ''
            console.log("request error - address")
          })
      }
    },
    refreshAddressTable() {
      // адреса
      const server = this.$store.state.APP_URL
      const uriAdresses = server + '/address'
      const token = this.getCookie("token")
      axios.get(uriAdresses, { headers: { Authorization: "Bearer " + token } })
        .then(responce => {
          this.addresses = []
          this.items = []
          const { data: responceData } = responce
          const AddressesData = JSON.parse(responceData)
          AddressesData.forEach((address) => {
            const { id, name } = address
            this.addresses.push({ text: name, value: id })
            this.items.push({ name: name })
          });
        })
        .catch((error) => {
          console.log("request error - address")
        })
    }
  },
  mounted() {
    console.log("Loading addresses...")
    if (this.$store.state.auth) {
      this.refreshAddressTable()
    }
  }
}
</script>
  