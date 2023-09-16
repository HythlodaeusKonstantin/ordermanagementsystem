<template>
    <div>
        TEST
    </div>
    <RouterLink to="test2">Test2</RouterLink>
    <EasyDataTable :headers="headers" :items="items" @click-row="showRow" show-index/>
</template>

<script>
import { Header, Item } from "vue3-easy-data-table";

export default ({
    data() {
        return {

            headers: [
                { text: "Name", value: "name" },
                { text: "Height (cm)", value: "height", sortable: true },
                { text: "Weight (kg)", value: "weight", sortable: true },
                { text: "Age", value: "age", sortable: true }
            ],

            items: [
                { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
                { "name": "James", "height": 180, "weight": 75, "age": 21 },
                { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
                { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
                { "name": "James", "height": 180, "weight": 75, "age": 21 },
                { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
                { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
                { "name": "James", "height": 180, "weight": 75, "age": 21 },
                { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
                { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
                { "name": "James", "height": 180, "weight": 75, "age": 21 },
                { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
                { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
                { "name": "James", "height": 180, "weight": 75, "age": 21 },
                { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
                { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
                { "name": "James", "height": 180, "weight": 75, "age": 21 },
                { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
                { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
                { "name": "James", "height": 180, "weight": 75, "age": 21 },
                { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
                { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
                { "name": "James", "height": 180, "weight": 75, "age": 21 },
                { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
                { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
                { "name": "James", "height": 180, "weight": 75, "age": 21 },
                { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
            ]
        }
    },
    methods: {
        showRow (item) {
            console.log(item)
        }
    }
})
</script>

<style scoped></style>