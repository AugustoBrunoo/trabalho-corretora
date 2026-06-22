<template>
  <div class="bg-slate-950 text-slate-300 font-sans antialiased selection:bg-prime-500 selection:text-slate-900 min-h-screen">
    <TeamNavbar />
    <TeamHero />
    <TeamMembers />
    <TeamFooter />
  </div>
</template>

<script setup>
import TeamFooter from '../components/team/TeamFooter.vue';
import TeamHero from '../components/team/TeamHero.vue';
import TeamMembers from '../components/team/TeamMembers.vue';
import TeamNavbar from '../components/team/TeamNavbar.vue';


</script>