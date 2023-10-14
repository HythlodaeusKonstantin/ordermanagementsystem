<template>
    <div></div>
</template>
  
<script>

export default {
    name: 'AuthValidation',
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
            this.deleteCookie("login")
            this.deleteCookie("token")
        },
    },
    mounted() {
        console.log("AuthValidation")
        const token = this.getCookie("token")
        const login = this.getCookie("login")
        if (token === null || token === "null" || login === null || login === "null") { 
            this.$router.push({ path: "/auth" }) 
            this.$store.state.authRequiredMessage = true
        }
        else {
            this.$store.state.login = login
            this.$store.state.auth = true
        }
    }
}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  