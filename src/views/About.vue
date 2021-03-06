<template>
  <main class="grid">
    <section class="col-12 text-center">
      <div class="mt-3">
        <Avatar :image="photoUrl" size="xlarge" shape="circle" />
      </div>
    </section>
    <section class="col-12">
      <p class="text-justify p-text-light">
        Hey there! Welcome to {{ appTitle }}! My name is {{ appAuthor }}. I am
        originally from San Diego, CA and I now reside in San Jacinto, CA. I am
        an amateur photographer, software developer, and hiking &amp; nature
        enthusiast.
      </p>

      <p class="text-justify p-text-light">
        I love to take photos of anything that can be captured, and introduce
        them to the world as my form of art. My personal favorites are pictures
        of nature, animals and virtually anything outdoors.
      </p>

      <p class="text-justify p-text-light">
        In recent months, I have come to a place in mind where I want to try a
        meditative approach to living. In this, I have found out that going
        hiking and camping, and taking pictures can help me to achieve this. I
        am very happy to have found this direction in which I'd like to travel,
        seeing as it is quite peaceful and serene.
      </p>

      <p class="text-justify p-text-light">
        I truly do hope that anyone viewing these photos here or on Instagram
        can find some tranquility through my lens, as I have come to do. There
        is a certain peace within nature and capturing it, that I believe we can
        all come to appreciate in time.
      </p>

      <p class="text-justify p-text-light">
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
    </section>
    <section class="col-12">
      <Divider align="center" type="dashed">Favorite Quote</Divider>

      <p class="lead text-center text-concrete text-600">
        <em>
          "A reader lives a thousand lives before he dies. A man who never
          reads, lives only once"
        </em>
      </p>
      <p class="text-center text-sm">
        <span class="text-pomegranate quote-link">
          - George R.R. Martin, A Dance with Dragons -
        </span>
      </p>
    </section>
  </main>
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Component imports
 * ----------------------------------------------------------------------- */
import Divider from 'primevue/divider'
import Avatar from 'primevue/avatar'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { useStore } from 'vuex'
import { computed } from 'vue'

/* --------------------------------------------------------------------------
 * Render variables and computed properties
 * ----------------------------------------------------------------------- */

// Vuex store
const store = useStore()

// Author name
const appAuthor = computed(() => store.getters.getAppAuthor)

// Application title
const appTitle = computed(() => store.getters.getAppTitle)

// URL to the physical file
const photoUrl =
  'https://zxrrepxdawawbgelqref.supabase.in/storage/v1/object/public/public/profile/profile_image.jpg'
</script>

<!-- Scoped CSS -->
<style scoped>
.quote-link:hover {
  cursor: pointer;
}
</style>
