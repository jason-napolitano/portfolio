<template>
  <!-- Main grid -->
  <main class="grid">
    <!-- Always display the Filter System -->
    <section class="col-12">
      <!-- Folder name dropdown -->
      <div
        class="bg-gray-50 p-2 border-1 border-gray-300 border-round-bottom border-round-top"
      >
        <div class="flex">
          <div class="flex-none flex align-items-center justify-content-center">
            <!-- INTENTIONALLY LEFT BLANK -->
          </div>
          <div class="flex-1 flex align-items-center justify-content-center">
            <Dropdown
              v-tooltip.hover.right="'Gallery Selection'"
              :optionValue="isLoading ? null : 'value'"
              placeholder="Loading Gallery Data ..."
              :loading="isLoading"
              @change="getPhotos"
              class="mr-2 w-full"
              optionLabel="name"
              :options="folders"
              v-model="folder"
            />
          </div>
          <div class="flex-none flex align-items-center justify-content-center">
            <Button
              icon="pi pi-info-circle"
              class="p-button-info"
              @click="changeHelpModalStatus"
            ></Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Display photo counter -->
    <section v-if="!isLoading && totalCount > 0" class="col-12">
      <Divider align="center" type="dashed">
        Showing {{ thousandsSeparator(totalCount) }} photos
      </Divider>
    </section>

    <!-- Display if query is in `loading` state -->
    <section class="col-12" v-if="isLoading">
      <!-- Loading animation / message -->
      <Loading :width="120" :height="120" :show-svg="true" image="bars">
        <!-- Loading message -->
        <template #message>
          <div>
            The images are currently loading. This process shouldn't take too
            long. <br />
            If this loading state persists, please
            <router-link
              class="text-blue-700 no-underline"
              :to="{ name: 'contact-view' }"
              >let me know</router-link
            >.
          </div>
        </template>
      </Loading>
    </section>

    <!-- Display if query is not in loading state but there are no photos to display -->
    <section class="col-12" v-if="!isLoading && totalCount < 1">
      <!-- No media message -->
      <div class="text-center">
        There is currently no media to load. Either this gallery contains no
        media, the gallery does not exist or an incorrect gallery has been
        selected. If this error persists, please
        <router-link
          class="text-blue-700 no-underline"
          :to="{ name: 'contact-view' }"
          >contact me</router-link
        >
        to report the issue.
      </div>
    </section>

    <!-- Display if query is not in loading state and there are photos to display -->
    <section class="col-12" v-if="!isLoading && photos.length > 0">
      <!-- Gallery component for fullscreen support -->
      <Galleria
        v-model:activeIndex="activeIndex"
        v-model:visible="displayGallery"
        :showItemNavigators="true"
        :showThumbnails="false"
        :fullScreen="true"
        :circular="false"
        :value="photos"
      >
        <!-- Fullscreen image -->
        <template #item="slotProps">
          <img
            :alt="removeExtension(slotProps.item.name)"
            :src="parseFileUrl(slotProps.item)"
            class="w-auto fs-image"
          />
        </template>
      </Galleria>
      <!-- Gallery grid -->
      <div class="grid">
        <!-- Foreach through the images ... -->
        <div
          v-for="(image, index) of photos"
          class="xs:col-12 sm:col-6 md:col-4 lg:col-4"
          :key="index"
        >
          <!-- Display the individual image ... -->
          <div class="photo-item">
            <!-- Using the image component ... -->
            <ElImage
              class="border-round cursor-pointer sm:h-12rem md:h-15rem w-full"
              :alt="removeExtension(image.name)"
              @click="imageClick(index)"
              :src="parseFileUrl(image)"
              fit="cover"
              lazy
            >
              <!-- Placeholder to be used when the image is loading -->
              <template #placeholder>
                <div
                  class="flex align-content-center flex-wrap bg-gray-100 h-full"
                >
                  <!-- Loading placeholder -->
                  <div style="margin: 0 auto">
                    <Loading />
                  </div>
                </div>
              </template>
            </ElImage>
          </div>
        </div>
      </div>
    </section>

    <!-- Toast Container -->
    <section>
      <Toast />
    </section>

    <!-- Dialog modal container -->
    <section>
      <Dialog
        :style="{ 'max-width': '89vw' }"
        v-model:visible="displayDialog"
        :close-on-escape="true"
        :show-header="false"
        :closable="false"
        position="top"
        :modal="true"
        class="mt-0"
      >
        <p class="text-center">
          You can enable <strong>Gallery Mode</strong> by opening any image
        </p>
        <p class="text-center text-gray-600 font-light">
          (Landscape orientation is recommended)
        </p>
        <template #footer>
          <div
            class="text-center bg-pomegranate cursor-pointer border-round text-white p-2 w-full"
            @click="changeHelpModalStatus"
          >
            Close Window
          </div>
        </template>
      </Dialog>
    </section>
  </main>
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Component imports
 * ----------------------------------------------------------------------- */
import Galleria from 'primevue/galleria'
import Dropdown from 'primevue/dropdown'
import Loading from '../shared/Loading'
import Divider from 'primevue/divider'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { removeExtension, thousandsSeparator } from '../utils'
import { supabase } from '../utils/supabase'
import { useToast } from 'primevue/usetoast'
import { ref, onMounted } from 'vue'

/* --------------------------------------------------------------------------
 * Component mounting
 * ----------------------------------------------------------------------- */

/**
 * When the component is mounted
 */
onMounted(() => {
  // Get the photos from the API
  getPhotos()
})

/* --------------------------------------------------------------------------
 * Fullscreen gallery
 * ----------------------------------------------------------------------- */

// Display the gallery component initially?
const displayGallery = ref(false)

// The galleries active index
const activeIndex = ref(0)

/**
 * Activate when clicking on an image
 *
 * @param index {number}
 *
 * @returns {void}
 */
const imageClick = (index) => {
  activeIndex.value = index
  displayGallery.value = true
}

/* --------------------------------------------------------------------------
 * Dialog modal
 * ----------------------------------------------------------------------- */

// Display the dialog modal initially?
const displayDialog = ref(false)

/**
 * Opens and closes the help modal
 *
 * @returns {void}
 */
const changeHelpModalStatus = () => {
  displayDialog.value = !displayDialog.value
}

/* --------------------------------------------------------------------------
 * Supabase folders
 * ----------------------------------------------------------------------- */

// Default bucket
const bucket = ref('public')

// Default folder
const folder = ref('nature')

// Dropdown options
const folders = ref([
  { name: `Architecture & Vintage`, value: 'architecture' },
  { name: 'Vehicles & Automobiles', value: 'vehicles' },
  { name: 'Animals & Livestock', value: 'animals' },
  { name: 'Nature & Outdoors', value: 'nature' },
  { name: 'Macro Style Photos', value: 'macro' },
  { name: 'Miscellaneous', value: 'misc' },
])

/**
 * Parse the url to the physical file
 *
 * @param item
 * @returns {string}
 */
const parseFileUrl = (item) =>
  `https://zxrrepxdawawbgelqref.supabase.in/storage/v1/object/public/${bucket.value}/${folder.value}/${item.name}`

/* --------------------------------------------------------------------------
 * Supabase request
 * ----------------------------------------------------------------------- */

// Total of all photos in the selected folder
const totalCount = ref(0)

// Is the API call still loading?
const isLoading = ref(true)

// Photos array from the API
const photos = ref([])

// PrimeVue Toast API
const toast = useToast()

/**
 * Get the photos using the supabase API
 *
 * @return {Promise<void>}
 */
const getPhotos = async () => {
  // Let's try to retrieve all media
  await supabase.storage
    // Grab from the `public` bucket
    .from(bucket.value)
    // List all photos in the folder that is
    // determined by the dropdown option
    .list(folder.value, {
      // Sort the results by ...
      sortBy: {
        column: 'name',
        order: 'asc',
      },
    })
    // Assign the response data
    .then((response) => {
      photos.value = response.data
    })
    // Assign the total count value
    .then(() => {
      totalCount.value = photos.value.length
    })
    // Reset the isLoading state to false
    .then(() => {
      isLoading.value = false
    })
    // Catch any errors that may occur
    .catch((error) => {
      // Display a toast with an error
      // message
      toast.add({
        severity: 'error',
        summary: 'Error Message',
        detail: error,
        life: 5500,
      })
    })
}
</script>

<!-- Scoped SCSS -->
<style scoped lang="scss">
// When an image is in fullscreen mode
.fs-image {
  // Calculate the max-height and max-width of the image
  max-height: calc(90vh - 50px) !important;
  max-width: calc(90vw - 50px) !important;
}
</style>
