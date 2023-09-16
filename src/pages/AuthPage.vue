<!-- eslint-disable no-unused-vars -->

<template>
    <AuthValidation />
    <div class="home">
        <div v-show="!$store.state.auth">
            <input type="text" placeholder="Введите логин" @input="login = $event.target.value" :value="login" v-on:keyup.enter="auth" />
            <p></p>
            <input type="text" placeholder="Введите пароль" @input="password = $event.target.value" :value="password" v-on:keyup.enter="auth" />
            <p></p>
            <button @click="auth">Войти</button>
        </div>
        <div v-show="$store.state.auth">
            <div>Вы авторизованы как {{ $store.state.login }}</div>
            <button @click="exitFromSystem">Выйти</button>   
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
            password: ""
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
                const uri = 'http://127.0.0.1:8000/token'
                axios.post(uri, dataSend)
                .then(responce => { 
                    this.setCookie("token", JSON.parse(responce.data).accessToken), 
                    this.setCookie("login", this.login), this.$store.state.auth=true, 
                    this.$store.state.login = this.login
                    this.$router.push({ path: "/desktop" })
                }, 1)
                .catch((error) => {
                    this.exitFromSystem(), 
                    this.$store.state.auth=false
                    this.$store.state.login = ""
                })
            }
        }
    }
}

</script>
  