<template>
  <div class="h-64">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'

// 1. Correct import: Use 'Line' component from 'vue-chartjs'
import { Line } from 'vue-chartjs'

// 2. Import and register all required Chart.js elements
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

// Register all elements necessary for a Line Chart
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

const props = defineProps({
  labels: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] },
})

// Accessing CSS variables is done correctly inside computed property
const chartData = computed(() => {
  // Accessing CSS variables should be done dynamically where possible
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--pri-500').trim() || '#0ea5e9'
  
  return {
    labels: props.labels,
    datasets: [{
      label: 'Users',
      data: props.data,
      borderColor: primaryColor, // Use the resolved color
      tension: 0.4,
      fill: false,
    }],
  }
})

// Options are static and can be defined outside of computed/ref
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { 
      grid: { 
        // Get the color value for the grid lines
        color: getComputedStyle(document.documentElement).getPropertyValue('--gry-200').trim() || '#e5e7eb' 
      } 
    },
    x: { grid: { display: false } },
  },
  plugins: { legend: { display: false } },
}
</script>