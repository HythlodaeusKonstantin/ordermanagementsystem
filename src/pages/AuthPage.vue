<!-- eslint-disable no-unused-vars -->

<template>
    <AuthValidation />
    <div class="home">
        <div v-show="!$store.state.auth">
            <input type="text" placeholder="Введите логин" @input="login = $event.target.value" :value="login"
                v-on:keyup.enter="auth" />
            <p></p>
            <input type="text" placeholder="Введите пароль" @input="password = $event.target.value" :value="password"
                v-on:keyup.enter="auth" />
            <h6 class="text-red" v-show="this.authError">Не верный логин или пароль</h6>
            <h6 class="text-red" v-show="$store.state.authRequiredMessage">Пожалуйста, авторизуйтесь</h6>
            <p></p>
            <button class="btn btn-outline-success" @click="auth">Войти</button>
        </div>
        <div v-show="$store.state.auth">
            <div>Вы авторизованы как {{ $store.state.login }}</div>
            <div>Партнер: {{ $store.state.partner }}</div>
            <button class="btn btn-outline-danger" @click="exitFromSystem">Выйти</button>
        </div>
    </div>
</template>
  
<script>
import AuthValidation from '@/components/AuthValidation.vue'
import axios from 'axios'
export default {
    data() {
        return {
            login: "",
            password: "",
            authError: false,
        }
    },
    name: 'DesktopPage',
    components: {
        AuthValidation
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
        setCookie(name, value, dayToLive) {
            const date = new Date()
            date.setTime(date.getTime() + (dayToLive * 24 * 60 * 60 * 1000))
            let expires = "expires=" + date.toUTCString
            document.cookie = `${name}=${value}; ${expires};`
        },

        deleteCookie(name) {
            this.setCookie(name, null, null)
        },

        exitFromSystem() {
            this.$store.state.login = ""
            this.$store.state.auth = false
            this.deleteCookie("login")
            this.deleteCookie("token")
        },
        async auth() {
            if (this.login && this.password) {
                const dataSend = { login: this.login, password: this.password }
                const server = this.$store.state.APP_URL
                const uri = server + '/token'
                axios.post(uri, dataSend)
                    .then(responce => {
                        this.setCookie("token", JSON.parse(responce.data).accessToken),
                            this.setCookie("login", this.login), this.$store.state.auth = true,
                            this.$store.state.login = this.login
                            this.$router.push({ path: "/desktop" })
                            this.$store.state.authRequiredMessage = false
                    }, 1)
                    .catch((error) => {
                        this.exitFromSystem(),
                            this.$store.state.auth = false
                            this.$store.state.login = ""
                            console.log("Auth error")
                            this.authError = true
                    })
            }
        }
    },
    mounted() {
        if (!this.$store.state.partner) {
            const server = this.$store.state.APP_URL
            const uri = server + '/userinfo'
            const token = this.getCookie("token")
            axios.get(uri, { headers: { Authorization: "Bearer " + token } })
                .then(responce => {
                    const { data: responceData } = responce
                    const OrdersData = JSON.parse(responceData)
                    const { user, partner } = OrdersData
                    this.$store.state.partner = partner
                    this.authError = false
                })
                .catch((error) => {
                        this.exitFromSystem(),
                        this.$store.state.auth = false
                        this.$store.state.login = ""
                })
            }
    },
    }

</script>
  

<style scoped>

.text-red {
    color: red;
}

</style>