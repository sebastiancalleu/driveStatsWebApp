<script>
    export default {
    data() {
        return {
            isAuthenticated: true,
        }
    },
    mounted() {
        if (this.isAuthenticated) {
            this.$router.push('/Dashboard')
        } else {
            this.$router.push('/Login')
        }
    }
}
</script>

<template>
</template>
<style>
</style>
