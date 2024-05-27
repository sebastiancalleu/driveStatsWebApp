<script>
    import { LineChart } from 'chartist';
    import 'chartist/dist/index.css';

    export default {
        props: {chartTitle: String, values: Array, labels: Array},
        data() {
            return {
            }
        },
        computed: {
        },
        methods: {
        },
        mounted() {
            const chart = new LineChart(
                `#${this.chartTitle}__chart`,
                {
                    labels: this.labels,
                    series: [this.values]
                },
                {
                    showArea: true,
                    fullWidth: true,
                    chartPadding: {
                        right: 50
                    },
                }
            );

            chart.on('draw', () => {
                setTimeout(() => {
                    document.querySelector(`#${this.chartTitle}__chart`).querySelector('.ct-area').style.fill = '#535981';
                    document.querySelector(`#${this.chartTitle}__chart`).querySelectorAll('.ct-point').forEach((el) => el.style.stroke = '#535981');
                    document.querySelector(`#${this.chartTitle}__chart`).querySelector('.ct-line').style.stroke = '#535981';
                }, 1)
            })
        },
    }
</script>

<template>
    <div class="mileage__chart">
        <div class="chart__header">
            <h3>
                {{ chartTitle }}
            </h3>
        </div>
        <div class="chart__container">
            <div class="ct-chart ct-golden-section" :id="`${chartTitle}__chart`"></div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .mileage__chart {
        height: 30rem;
        width: 30rem;
        .chart__header {
            display: flex;
            justify-content: center;
        }
        @media only screen and (max-width: 600px) {
            width: 100%;
            height: auto;
        }
    }
</style>
