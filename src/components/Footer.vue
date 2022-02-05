<script setup>
  const getYear = () => {
    return new Date().getFullYear()
  }
</script>

<template>
  <div class="fixed bottom-0 w-full py-4 bg-gray-700 text-gray-50">
    <div class="max-w-4xl px-5 mx-auto">
      <h1 class="tracking-wider">All rights reserved &copy; kaygia {{ getYear() }}</h1>
    </div>
  </div>
</template>
