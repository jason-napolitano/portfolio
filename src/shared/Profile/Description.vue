<template>
  <div class="text-justify p-text-light">
    <p>
      Hey there! My name is Jason Napolitano. I am originally from San Diego, CA
      and I now reside in San Jacinto, CA. I am an amateur photographer,
      software developer, and hiking &amp; nature enthusiast.
    </p>

    <p>
      I love to take photos of anything that can be captured, and introduce them
      to the world as my form of art. My personal favorites are pictures of
      nature, animals and virtually anything outdoors.
    </p>

    <p>
      In recent months, I have come to a place in mind where I want to try a
      meditative approach to living. In this, I have found out that going hiking
      and camping, and taking pictures can help me to achieve this. I am very
      happy to have found this direction in which I'd like to travel, seeing as
      it is quite peaceful and serene.
    </p>

    <p>
      I truly do hope that anyone viewing these photos here or on
      <em
        class="text-blue-600 no-underline cursor-pointer"
        @click="openInstagramLink"
        >Instagram</em
      >
      can find some tranquility through my lens, as I have come to do. There is
      a certain peace within nature and capturing it, that I believe we can all
      come to appreciate in time.
    </p>

    <p>
      I thank you for visiting my portfolio and of course if you have any
      requests or inquiries, you may
      <em
        ><router-link
          class="text-blue-600 no-underline cursor-pointer"
          :to="{ name: 'contact-view' }"
          >contact me</router-link
        ></em
      >
      any time.
    </p>

    <ElDivider>Favorite Quote</ElDivider>

    <p class="lead p-text-light text-center">
      <em>
        "A reader lives a thousand lives before he dies. A man who never reads,
        lives only once"
      </em>
    </p>
    <p class="lead text-center text-sm">
      <em class="text-marina quote-link">
        - George R.R. Martin, A Dance with Dragons -
      </em>
    </p>
  </div>
</template>

<script setup>
/**
 * Opens the `favorite quote` link
 *
 * @returns {void}
 */
const openInstagramLink = () => {
  window.open('https://instagram.com/napolitano.photos', '_blank')
}
</script>

<style scoped>
.quote-link:hover {
  cursor: pointer;
}
</style>
