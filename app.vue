<script setup>
import {Chart} from "chart.js/auto";

let config = useRuntimeConfig();

async function getData() {
    let response = await useFetch(config.public.baseUrl + '/api/rate')
    return response.data
}

let data = ref(null)
let isUp = computed(() => {
    if (data == null || data.value == null) return false
    return Object.values(data.value)[data.value.length - 1] > Object.values(data.value)[data.value.length - 2]
})

onMounted(() => {
    getData().then((respData) => {
        data.value = respData.value.data
    }).then(() => {
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(data.value).map((key) => key.substring(5)),
                datasets: [{
                    label: 'Daily Values',
                    data: Object.values(data.value),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
})
</script>

<template>
    <div class="w-screen h-screen flex flex-col gap-1.5 justify-center items-center">
        <div class="text-center text-8xl m-7">今天日元跌了吗？</div>
        <div class="w-[600px] h-[600px]">
            <img v-if="!isUp" src="/sakiko-down.jpeg" alt="">
            <img v-if="isUp" src="/sakiko-up.jpeg" alt="">
        </div>
        <div>
            <canvas id="myChart" width="800" height="200"></canvas>
        </div>
    </div>
</template>

<style scoped>

</style>
