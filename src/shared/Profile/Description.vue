<template>
  <div class="text-justify p-text-light">
    <p>
      My name is Jason Napolitano. I am from Southern California. I am an
      amateur photographer, software developer, and hiking and nature
      enthusiast. I love to take photos of anything that can be captured, and
      introduce it as my form of art. I have come to find going hiking and
      taking pictures, to be quite meditative and relaxing. Maybe while viewing
      these photos you are granted a similar emotion. My ultimate hope is that
      everyone enjoys my content and is able to find peace and tranquility
      through my lens, as I have come to do.
    </p>

    <el-divider>Favorite Quote</el-divider>

    <p class="lead p-text-light text-center">
      <em>
        "A reader lives a thousand lives before he dies. A man who never reads,
        lives only once"
      </em>
    </p>
    <p class="lead p-text-light text-center text-sm" @click="openLink">
      <em class="text-marina quote-link">
        - George R.R. Martin, A Dance with Dragons -
      </em>
    </p>
  </div>
</template>

<script setup>
const openLink = () => {
  window.open(
    'https://www.goodreads.com/quotes/615632-a-reader-lives-a-thousand-lives-before-he-dies-the',
    '_blank'
  )
}
</script>

<style scoped>
.quote-link:hover {
  cursor: pointer;
}
</style>
