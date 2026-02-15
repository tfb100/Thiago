<script setup>
import './layouts/executive/executive.css'
import ExecutiveNav from './layouts/executive/ExecutiveNav.vue'
import ExecutiveHero from './layouts/executive/ExecutiveHero.vue'
import ExecutiveStatement from './layouts/executive/ExecutiveStatement.vue'
import ExecutiveStats from './layouts/executive/ExecutiveStats.vue'
import ExecutiveExperience from './layouts/executive/ExecutiveExperience.vue'
import ExecutiveFocus from './layouts/executive/ExecutiveFocus.vue'
import ExecutiveContact from './layouts/executive/ExecutiveContact.vue'
</script>

<template>
  <div class="exec-layout min-h-screen bg-exec-bg text-white overflow-x-hidden">
    <ExecutiveNav />
    <main>
      <ExecutiveHero />
      <ExecutiveStatement />
      <ExecutiveStats />
      <ExecutiveExperience />
      <ExecutiveFocus />
      <ExecutiveContact />
    </main>
  </div>
</template>
