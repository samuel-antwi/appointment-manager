<script>
  export default {
    props: ['modalActive'],
  }
</script>

<template>
  <transition name="modal-animation">
    <div v-if="modalActive" class="pt-20 main-modal">
      <transition name="modal-animation-inner">
        <div class="relative modal-inner" v-show="modalActive">
          <!-- Modal content -->
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
  .modal-animation-enter-active,
  .modal-animation-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-animation-enter-from,
  .modal-animation-leave-to {
    opacity: 0;
  }

  .modal-animation-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }
  .modal-animation-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }
  .modal-animation-inner-leave-to {
    transform: scale(0.8);
  }
</style>
