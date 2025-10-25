<template>
  <div class="space-y-6">
    <!-- Header -->
    <h1 class="text-2xl font-bold">Site Analytics</h1>

    <!-- Top Summary Cards -->
    <div class="grid grid-cols-3 gap-4">
      <div class="p-4 bg-white rounded shadow">
        <h3 class="text-gray-600 text-sm">Total Users</h3>
        <p class="text-3xl font-bold text-blue-600">{{ admin.analytics.totalUsers }}</p>
      </div>

      <div class="p-4 bg-white rounded shadow">
        <h3 class="text-gray-600 text-sm">Total Submissions</h3>
        <p class="text-3xl font-bold text-green-600">{{ submissions.total }}</p>
      </div>

      <div class="p-4 bg-white rounded shadow">
        <h3 class="text-gray-600 text-sm">Passed / Failed</h3>
        <p class="text-3xl font-bold text-gray-800">
          {{ submissions.passed }} / {{ submissions.failed }}
        </p>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="bg-white p-4 rounded shadow">
      <h3 class="text-lg font-semibold mb-2">Daily Submissions</h3>
      <canvas id="analyticsChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useUserStore } from '../../store/user';
import { useSubmissionsStore } from '../../store/submissions';
import { useAdminStore } from '../../store/admin';

Chart.register(...registerables);

const user = useUserStore();
const submissions = useSubmissionsStore();
const admin = useAdminStore();

let chartInstance = null;

function renderChart() {
  const ctx = document.getElementById('analyticsChart').getContext('2d');

  const labels = submissions.items.map((s) => new Date(s.date).toLocaleDateString());
  const data = labels.map(() => Math.floor(Math.random() * 5) + 1); // demo counts

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Submissions per Day',
          data,
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

onMounted(() => {
  // Mock admin data from stores
  admin.updateAnalytics({
    totalUsers: 1200,
    submissionsToday: submissions.total,
  });

  renderChart();
});

// Re-render when submissions update
watch(
  () => submissions.items.length,
  () => renderChart()
);
</script>
