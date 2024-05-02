<script setup>
$axios
  .get("https://api.github.com/users/sakiko")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });
</script>

<template>
<div>

</div>
</template>

<style scoped>

</style>
