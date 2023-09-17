<template>
    <div>
        <div>
            <span>Дата заказа</span>
            <input type="date" placeholder="Дата заказа">
        </div>
        <div id="Address">
            <span>Адрес доставки</span>
            <select v-model="selectedAddress">
                <option v-for="address in addresses" :value="address.value" :key="address">
                    {{ address.text }}
                </option>
            </select>
        </div>
        <div id="Products">
            <span>Продукт</span>
            <select v-model="selectedProduct">
                <option v-for="product in products" :value="product.value" :key="product">
                    {{ product.text }}
                </option>
            </select>
            <input type="number" placeholder="кол-во" @change="quantityOfProdcut = $event.target.value" :value="quantityOfProdcut">
            <button @click="addProductToSelected">Добавить</button>
            <EasyDataTable :headers="productsHeaders" :items="selectedProducts" @click-row="showRow" show-index/>
        </div>
        <input type="text" placeholder="Комментарий к заказу" @change="orderComment = $event.target.value" :value="orderComment">
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "createOrderDialog",
    data() {
        return {
            selectedAddress: '',
            addresses: [],
            products: [],
            selectedProduct: '',
            quantityOfProdcut: 0,
            selectedProducts: [],
            productsHeaders: [{text: "Товар", value: "product"}, {text: "Кол-во", value: "quantity"}],
            orderComment: ""
        }
    },
    props: {
    },
    methods: {
        addProductToSelected(){
            if(this.selectedProduct===''||this.quantityOfProdcut<=0){return}
            const { text: productName } = this.products.find((element) => element.value === this.selectedProduct)
            this.selectedProducts.push({product: productName, quantity: this.quantityOfProdcut})
            this.selectedProduct = ""
            this.quantityOfProdcut = 0
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
        }
    },
    mounted() {
        if (this.$store.state.auth) {
            // адреса
            const uriAdresses = 'http://127.0.0.1:8000/address'
            const token = this.getCookie("token")
            axios.get(uriAdresses, { headers: { Authorization: "Bearer " + token } })
                .then(responce => {
                    this.addresses = []
                    const { data: responceData } = responce
                    const AddressesData = JSON.parse(responceData)
                    AddressesData.forEach((address) => {
                        const { id, name } = address
                        this.addresses.push({ text: name, value: id })
                    });
                })
                .catch((error) => {
                    this.addresses = []
                    this.selectedAddress = ''
                    console.log("request error - address")
                })

            // номенклатура
            const uriProducts = 'http://127.0.0.1:8000/products'
            axios.get(uriProducts, { headers: { Authorization: "Bearer " + token } })
                .then(responce => {
                    this.products = []
                    const { data: responceData } = responce
                    const ProductsData = JSON.parse(responceData)
                    ProductsData.forEach((product) => {
                        const { id, name } = product
                        this.products.push({ text: name, value: id })
                    });
                })
                .catch((error) => {
                    this.products = []
                    this.selectedProduct = ''
                    console.log("request error - products")
                })
        }
    }
}
</script>

<style lang="scss" scoped></style>