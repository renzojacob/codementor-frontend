<template>
  <main class="bg-gray-50 min-h-screen flex flex-col">
    <div class="max-w-5xl w-full mx-auto px-4 flex-grow">
      <!-- Page Title -->
      <div class="text-center mt-10 mb-6">
        <h1 class="text-4xl font-extrabold text-gray-800">
          Leaderboard
        </h1>
        <p class="text-gray-500 text-sm mt-1">Top learners and coders in the community</p>
      </div>

      <!-- Leaderboard Table -->
      <div class="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <table class="min-w-full text-sm text-left text-gray-700">
          <thead class="bg-gray-100 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 font-semibold text-gray-600">Rank</th>
              <th class="px-6 py-3 font-semibold text-gray-600">User</th>
              <th class="px-6 py-3 font-semibold text-gray-600">Language</th>
              <th class="px-6 py-3 font-semibold text-right text-gray-600">Points</th>
              <th class="px-6 py-3 font-semibold text-right text-gray-600">Challenges</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(user, index) in paginatedUsers"
              :key="user.name"
              class="hover:bg-gray-50 transition-colors duration-150"
            >
              <td class="px-6 py-3 font-semibold text-gray-800">
                {{ (currentPage - 1) * pageSize + index + 1 }}
              </td>
              <td class="px-6 py-3 flex items-center space-x-3">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  :style="{ backgroundColor: user.color }"
                >
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <span class="font-medium">{{ user.name }}</span>
              </td>
              <td class="px-6 py-3">{{ user.language }}</td>
              <td class="px-6 py-3 text-right font-semibold text-blue-600">
                {{ user.points.toLocaleString() }}
              </td>
              <td class="px-6 py-3 text-right text-gray-600">
                {{ user.challenges }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <Pagination
        class="mt-3 mb-10"
        :total-items="users.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @page-change="handlePageChange"
      />
    </div>
  </main>
</template>

<script>
import Pagination from '@/components/ui/Pagination.vue'

export default {
  name: 'Leaderboard',
  components: { Pagination },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      users: [],
      softColors: [
        '#A5B4FC', // indigo-300
        '#FBCFE8', // pink-200
        '#BFDBFE', // blue-200
        '#C7D2FE', // indigo-200
        '#BBF7D0', // green-200
        '#FDE68A', // yellow-200
        '#FECACA', // red-200
        '#FCD34D', // amber-300
      ],
      baseUsers: [
        { name: 'Alice Johnson', language: 'Python', points: 13400, challenges: 120 },
        { name: 'Ravi Kumar', language: 'JavaScript', points: 12780, challenges: 115 },
        { name: 'Marie Dubois', language: 'Java', points: 12100, challenges: 102 },
        { name: 'Carlos Reyes', language: 'PHP', points: 11000, challenges: 98 },
        { name: 'Hannah Lee', language: 'C#', points: 10600, challenges: 90 },
        { name: 'Taro Tanaka', language: 'Python', points: 9800, challenges: 85 },
        { name: 'Fatima Noor', language: 'JavaScript', points: 9500, challenges: 79 },
        { name: 'Luca Rossi', language: 'Java', points: 8900, challenges: 72 },
        { name: 'Sofia Petrova', language: 'C#', points: 8600, challenges: 70 },
        { name: 'James Brown', language: 'Python', points: 8300, challenges: 65 },
      ],
    }
  },
  computed: {
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.users.slice(start, start + this.pageSize)
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page
    },
    assignRandomColors() {
      this.users = this.baseUsers.map(user => {
        const color = this.softColors[Math.floor(Math.random() * this.softColors.length)]
        return { ...user, color }
      })
    },
  },
  created() {
    this.assignRandomColors()
  },
}
</script>
