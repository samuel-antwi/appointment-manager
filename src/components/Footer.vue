<script setup>
  const getYear = () => {
    return new Date().getFullYear()
  }
</script>

<template>
  <div class="bg-gray-700 py-4 text-gray-50">
    <div class="mx-auto max-w-4xl px-5">
      <h1 class="tracking-wider">All rights reserved &copy; kaygia {{ getYear() }}</h1>
    </div>
  </div>
</template>
