<!-- src/admin/components/charts/LessonEngagement.vue -->
<template>
  <div class="h-64">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'

// 1. Correct Import: Use 'Bar' component from 'vue-chartjs'
import { Bar } from 'vue-chartjs'

// 2. Import and register all required Chart.js elements
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,       // Essential for Bar Chart bars
  CategoryScale,    // Essential for the X-axis (labels)
  LinearScale,      // Essential for the Y-axis (values)
} from 'chart.js'

// Register all elements necessary for a Bar Chart
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

const props = defineProps({
  labels: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] },
})

const chartData = computed(() => {
  // Accessing CSS variables and providing a fallback color
  const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--acc-ind-500').trim() || '#6366f1'

  return {
    labels: props.labels,
    datasets: [{
      label: 'Views',
      backgroundColor: backgroundColor,
      data: props.data,
    }],
  }
})

// Options are defined statically
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { 
      grid: { 
        // Get the color value for the grid lines
        color: getComputedStyle(document.documentElement).getPropertyValue('--gry-200').trim() || '#e5e7eb' 
      } 
    },
    x: { grid: { display: false } },
  },
}
</script>