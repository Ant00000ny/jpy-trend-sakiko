<script setup>
import {Chart} from "chart.js/auto";

useHead({
    title: '今天日元跌了吗？',
    meta: [
        {
            name: 'description',
            content: '今天日元跌了吗？'
        },
        {
            name: 'keywords',
            content: '今天日元跌了吗？'
        }
    ]
})

let config = useRuntimeConfig();
let app = useNuxtApp()

async function getData() {
    let response = await useFetch(config.public.baseUrl + '/api/rate')
    return response.data
}

function fireConfetti() {
    let confetti = app.$confetti

    var end = Date.now() + (4 * 1000);

// go Buckeyes!
    var colors = ['#365162', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

let data = ref(null)
let isUp = computed(() => {
    if (data == null || data.value == null) return null
    return Object.values(data.value)[Object.values(data.value).length - 1] > Object.values(data.value)[Object.values(data.value).length - 2]
})

onMounted(() => {
    getData().then((respData) => {
        data.value = respData.value.data
    }).then(() => {
        if (isUp) {
            fireConfetti()
        }

        const minValue = Math.min(...Object.values(data.value));
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(data.value).map((key) => key.substring(5)),
                datasets: [{
                    label: 'CNY to JPY',
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
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: minValue,  // Set the minimum value here
                    }
                }
            }
        });
    })
})
</script>

<template>
    <div class="w-screen h-screen flex flex-col gap-1.5 justify-center items-center">
        <div class="text-center text-4xl">今天日元跌了吗？</div>
        <div class="w-1/2 max-w-[600px] max-h-[600px]">
            <img v-if="isUp != null && !isUp" src="/sakiko-down.jpeg" alt="">
            <img v-if="isUp != null && isUp" src="/sakiko-up.jpeg" alt="">
        </div>
        <div class="w-11/12 max-w-[800px] max-h-[200px]">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</template>

<style scoped>

</style>
