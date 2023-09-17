<template>
    <div class="dialog" v-if="show"></div>
    <div class="dialog__content"><slot></slot></div>
</template>

<script>
export default {
    name: "modalDialog",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }

}
</script>

<style lang="scss" scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;  
    background: rgba(0,0,0, 0.5);
    position: fixed;
    display: flex;
}

.dialog__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
}
</style>