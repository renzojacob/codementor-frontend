<!-- Main Layout -->
 <template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="flex-1 p-4 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/features/main/components/Sidebar.vue'
import Header from '@/features/main/components/Header.vue'
</script>