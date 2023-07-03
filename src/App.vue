<template>
  <router-view />
</template>

<style>
:root {
  --primary-color: #f18a19;
  --secondary-color: #424242;
  --highlight-color: #f0f0f0;
  --deemphasized-text-color: #888;
  --primary-gradient: linear-gradient(to right, var(--primary-color), #ff9800);
  --background-gradient: linear-gradient(
    to right,
    var(--highlight-color),
    #fff
  );

  --shadow-light: 0 2px 5px rgba(0, 0, 0, 0.15);
  --shadow-dark: 0 4px 10px rgba(0, 0, 0, 0.3);

  --margin-xl: 2rem; /* 32px */
  --margin-lg: 1.25rem; /* 20px */
  --margin-md: 1rem; /* 16px */
  --margin-sm: 0.625rem; /* 10px */
  --margin-xs: 0.3125rem; /* 5px */

  --padding-lg: 1.25rem; /* 20px */
  --padding-md: 1rem; /* 16px */
  --padding-sm: 0.625rem; /* 10px */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--secondary-color);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
