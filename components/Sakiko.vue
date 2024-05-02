<script setup>
let config = useRuntimeConfig();

async function getData() {
    let response = await useFetch(config.public.baseUrl + '/api/rate')
    console.log(config.baseUrl + '/api/rate')
    console.log(response)
    return response.data
}

let data = ref(null)


let isUp = ref(Object.values(data)[data.length - 1] > Object.values(data)[data.length - 2])


onMounted(() => {
    getData().then((respData) => {
        data.value = respData
    })
})
</script>

<template>
<div>
    <div class="w-screen h-screen flex justify-center items-center">
        <div class="w-[400px] h-[400px]">
            <img v-if="!isUp" src="/sakiko-down.jpeg" alt="">
            <img v-if="isUp" src="/sakiko-up.jpeg" alt="">
        </div>
    </div>
</div>
</template>

<style scoped>

</style>
