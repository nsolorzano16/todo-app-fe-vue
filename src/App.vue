<template>
  <router-view v-slot="{ Component, route}">
    <keep-alive>
      <component :is="Component" :key="route.name"></component>
    </keep-alive>
  </router-view>
</template>