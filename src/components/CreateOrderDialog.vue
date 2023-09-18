<template>
    <div>
        <div class="shadow-sm p-3 mb-5 bg-body rounded">
            <div class="input-group mb-1">
                <span class="input-group-text">Дата заказа</span>
                <input class="form-control" type="date" placeholder="Дата заказа"
                    @change="selectedDate = $event.target.value" :value="selectedDate">
            </div>
            <div id="Address">
                <div class="input-group mb-1">
                    <span class="input-group-text">Адрес доставки</span>
                    <select class="form-select" aria-label="Default select example" v-model="selectedAddress">
                        <option v-for="address in addresses" :value="address.value" :key="address">
                            {{ address.text }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Продукт</span>
                <select class="form-select" v-model="selectedProduct">
                    <option v-for="product in products" :value="product.value" :key="product">
                        {{ product.text }}
                    </option>
                </select>
                <input class="form-control" type="number" placeholder="кол-во"
                    @change="quantityOfProdcut = $event.target.value" :value="quantityOfProdcut">
                <button class="btn btn-outline-dark" id="buttonAddProduct" @click="addProductToSelected">Добавить</button>
            </div>
        </div>
        <div class="shadow-sm p-3 mb-5 bg-body rounded">
            <EasyDataTable :headers="productsHeaders" :items="selectedProducts" @click-row="showRow" show-index />
        </div>
        <div class="shadow-sm p-3 mb-5 bg-body rounded">
            <div class="d-grid gap-3">
                <input class="form-control" type="text" placeholder="Комментарий к заказу"
                    @change="orderComment = $event.target.value" :value="orderComment">
                <div class="position-static">
                    <div class="text-end">
                        <button class="btn btn-outline-dark"
                            :disabled="(!selectedAddress) || (selectedProducts.length === 0) || (!selectedDate)"
                            @click="createOrder">Создать</button>
                    </div>
                </div>
            </div>
        </div>
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
            productsHeaders: [{ text: "Товар", value: "productUID" }, { text: "Кол-во", value: "quantity" }],
            orderComment: "",
            selectedDate: "",
        }
    },
    props: {
    },
    methods: {
        addProductToSelected() {
            if (this.selectedProduct === '' || this.quantityOfProdcut <= 0) { return }
            const { text: productName } = this.products.find((element) => element.value === this.selectedProduct)
            this.selectedProducts.push({ productUID: productName, quantity: this.quantityOfProdcut })
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
        },
        createOrder() {
            if (this.$store.state.auth) {
                const dataToCreateOrder = {}
                dataToCreateOrder.addressUID = this.selectedAddress
                dataToCreateOrder.date = this.selectedDate
                dataToCreateOrder.comment = this.orderComment

                let productsToSend = []
                this.selectedProducts.forEach((selectedProductЕ) => {
                    const { value: productUID } = this.products.find((element) => element.text === selectedProductЕ.productUID)
                    productsToSend.push({ productUID: productUID, quantity: selectedProductЕ.quantity })
                })

                dataToCreateOrder.products = productsToSend
                const server = this.$store.state.APP_URL
                const uriAdresses = server + '/orders'
                const token = this.getCookie("token")

                axios({
                    method: "post",
                    url: uriAdresses,
                    data: dataToCreateOrder,
                    headers: { Authorization: "Bearer " + token }
                })
                    .then(responce => {
                        this.$emit('update:show', false)
                    })
                    .catch((error) => {
                        this.addresses = []
                        this.selectedAddress = ''
                        console.log("request error - address")
                    })
            }
        },
    },
    mounted() {
        if (this.$store.state.auth) {
            // адреса
            const server = this.$store.state.APP_URL
            const uriAdresses = server + '/address'
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
            const uriProducts = server + '/products'
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

<style lang="scss" scoped>
.position {
    text-align: center;
}
</style>