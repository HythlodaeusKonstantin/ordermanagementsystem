<template>
    <div>
    </div>
    <EasyDataTable :headers="headers" :items="items" @click-row="showRow" show-index />
</template>

<script>
import { Header, Item } from "vue3-easy-data-table";

export default ({
    props: {
        headers: {
            type: Array,
            required: true
        },
        items: {
            type: Array,
            required: true
        }

    },
    data() {
        return {
        }
    },
    methods: {
        showRow(item) {
            console.log(item)
        }
    }
})
</script>

<style scoped></style>