<template>
  <!-- Main grid -->
  <main class="grid">
    <!-- Always display the Filter System -->
    <section class="col-12">
      <!-- Affix the toolbar to the top of the window upon scroll -->
      <ElAffix :offset="-5">
        <!-- Folder name dropdown -->
        <div
          class="bg-gray-100 p-2 border-1 border-gray-300 border-round-bottom border-round-top"
        >
          <div class="flex">
            <div
              class="flex-none flex align-items-center justify-content-center"
            >
              <!-- INTENTIONALLY LEFT BLANK -->
            </div>
            <div class="flex-1 flex align-items-center justify-content-center">
              <Dropdown
                v-tooltip.hover.right="'Gallery Selection'"
                @change="initDropdown"
                placeholder="Gallery"
                optionValue="value"
                :loading="isLoading"
                class="mr-2 w-full"
                optionLabel="name"
                :options="folders"
                v-model="folder"
              />
            </div>
            <div
              class="flex-none flex align-items-center justify-content-center"
            >
              <Button
                icon="pi pi-info-circle"
                @click="openHelpModal"
                class="p-button-info"
              ></Button>
            </div>
          </div>
        </div>
      </ElAffix>
    </section>

    <!-- Display if query is in `loading` state -->
    <section class="col-12" v-if="isLoading">
      <!-- Loading animation / message -->
      <Loading :width="120" :height="120" :show-svg="true" image="bars">
        <!-- Loading message -->
        <template #message>
          <div>
            The images are currently loading. It shouldn't take too long to grab
            the the photos from the API.
          </div>
        </template>
      </Loading>
    </section>

    <!-- Display if query is not in loading state but there are not photos to display -->
    <section class="col-12" v-if="!isLoading && photos.length < 1">
      <!-- No media message -->
      <div
        class="p-5 border-gray-300 border-1 border-round text-gray-700 bg-gray-50 text-center"
      >
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

    <!-- Display if query is not in loading state but there are photos to display -->
    <section class="col-12" v-if="!isLoading && photos.length > 0">
      <div class="p-2">
        <!-- INTENTIONALLY LEFT BLANK -->
      </div>
      <!-- Gallery component for fullscreen support -->
      <Galleria
        :responsiveOptions="responsiveOptions"
        v-model:activeIndex="activeIndex"
        v-model:visible="displayGalleria"
        :showItemNavigators="true"
        :showThumbnails="false"
        :fullScreen="true"
        :circular="true"
        :value="photos"
      >
        <!-- Fullscreen image -->
        <template #item="slotProps">
          <img
            :src="parseFileUrl(slotProps.item)"
            :alt="parseFilename(slotProps.item)"
            class="w-auto fs-image"
          />
        </template>
        <!-- Thumbnail image (when applicable)-->
        <template #thumbnail="slotProps">
          <img
            :src="parseFileUrl(slotProps.item)"
            :alt="parseFilename(slotProps.item)"
            style="display: block"
          />
        </template>
      </Galleria>
      <!-- Gallery grid -->
      <div class="grid">
        <!-- Foreach through the images ... -->
        <div
          v-for="(image, index) of photos"
          class="xs:col-12 sm:col-12 md:col-4 lg:col-4"
          :key="index"
        >
          <!-- Display the individual image ... -->
          <div class="photo-item">
            <!--
            <div
              class="border-round-top bg-gray-900 text-gray-100 p-2 text-center"
            >
              <div class="name">
                {{ parseFilename(image) }}
              </div>
            </div>
             -->
            <!-- Using the image component ... -->
            <ElImage
              class="border-round cursor-pointer sm:h-20rem md:h-15rem w-full"
              @click="imageClick(index)"
              :src="parseFileUrl(image)"
              :alt="parseFilename(image)"
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

    <!-- Load more button -->
    <section v-if="!isLoading" class="col-12 text-center">
      <Button
        :class="{ 'p-button-secondary': true, hidden: perPage >= totalCount }"
        @click="loadMore"
      >
        <Icon icon="icons:load-more" /> <span class="ml-1">Load More</span>
      </Button>
    </section>

    <!-- Toast Container -->
    <section>
      <Toast />
    </section>

    <!-- Dialog modal container -->
    <section>
      <Dialog
        v-model:visible="displayDialog"
        :close-on-escape="true"
        :style="{ 'max-width': '78vw' }"
        :closable="false"
        position="top"
        :modal="true"
      >
        <p class="text-center">
          If you would like to view a full-screen version of an image, simply
          click the photo you'd like to view to open the applications <br>
          <em class="text-blue-500"><strong>Gallery Mode</strong></em> feature.
        </p>
        <template #footer>
          <Button
            icon="pi pi-fw-pi-times"
            class="p-button-danger w-full"
            @click="closeHelpModal"
          >
            <span class="text-center">Close Window</span>
          </Button>
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
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { supabase } from '../utils/supabase'
import { useToast } from 'primevue/usetoast'
import { removeExtension } from '../utils'
import { ref, onBeforeMount } from 'vue'

/* --------------------------------------------------------------------------
 * General component references
 * ----------------------------------------------------------------------- */

// Display the gallery component initially?
const displayGalleria = ref(false)

// Display the dialog modal initially?
const displayDialog = ref(false)

// The galleries active index
const activeIndex = ref(0)

// Is the API still loading its data?
const isLoading = ref(true)

// Photos array from the API
const photos = ref([])

// PrimeVue Toast API
const toast = useToast()

// Gallery breakpoints
const responsiveOptions = [
  //  1024px
  {
    breakpoint: '1024px',
    numVisible: 7,
  },
  //  768px
  {
    breakpoint: '768px',
    numVisible: 5,
  },
  //  560px
  {
    breakpoint: '560px',
    numVisible: 2,
  },
]

/* --------------------------------------------------------------------------
 * Supabase bucket/folder configuration
 * ----------------------------------------------------------------------- */

// Default values
const access = ref('public')
const bucket = ref('public')
const folder = ref('nature')

// Dropdown options
// TODO - Configure dynamically from supabase
const folders = ref([
  { name: 'Architecture & Vintage', value: 'architecture' },
  { name: 'Vehicles & Automobiles', value: 'vehicles' },
  { name: 'Animals & Livestock', value: 'animals' },
  { name: 'Nature & Outdoors', value: 'nature' },
  { name: 'Macro Style Photos', value: 'macro' },
  { name: 'Miscellaneous', value: 'misc' },
])

/* --------------------------------------------------------------------------
 * Query ordering
 * ----------------------------------------------------------------------- */

// Total of all photos in the selected
// folder
const totalCount = ref(0)

// Set initial offset to `0`
const offset = ref(0)

// Set initial per page value to `6`
const perPage = ref(6)

// Order by `name`
const orderBy = ref('name')

// In `ASC` order
const orderType = ref('asc')

/* --------------------------------------------------------------------------
 * Component methods
 * ----------------------------------------------------------------------- */

/**
 * Activate when clicking on an image
 *
 * @param index
 *
 * @returns {void}
 */
const imageClick = (index) => {
  activeIndex.value = index
  displayGalleria.value = true
}

/**
 * Parse the url to the physical photo within its bucket & folder
 *
 * @param photo
 * @returns {string}
 */
const parseFileUrl = (photo) =>
  `https://zxrrepxdawawbgelqref.supabase.in/storage/v1/object/${access.value}/${bucket.value}/${folder.value}/${photo.name}`

/**
 * Parse a filename
 *
 * @param photo
 *
 * @returns {string}
 */
const parseFilename = (photo) => removeExtension(photo.name)

/**
 * Initialize upon dropdown change
 *
 * @returns {void}
 */
const initDropdown = () => {
  perPage.value = 6
  getPhotos()
}

/**
 * Get the photos from the supabase API
 *
 * @return {Promise<void>}
 */
const getPhotos = async () => {
  // Let's try to retrieve all media
  await supabase.storage
    // Grab the bucket name from our
    // reactive value
    .from(bucket.value)
    // List all photos in the folder that is
    // determined by the dropdown option
    .list(folder.value, {
      // Use the dropdown values to determine
      // the offset, limit and order
      limit: perPage.value,
      offset: offset.value,
      sortBy: {
        column: orderBy.value,
        order: orderType.value,
      },
    })
    // Set the isLoading state to true and
    // return the response data
    .then((response) => {
      isLoading.value = true
      return response.data
    })
    // Assign the data to the photos reference
    // for rendering
    .then((data) => {
      photos.value = data
    })
    // Set the isLoading state to false
    .then(() => {
      isLoading.value = false
    })
    // Get the total count for all photos
    // in the folder
    .then(() => {
      getTotalCount()
    })
    // Catch any errors that may appear
    .catch((error) => {
      // Display a toast with the error message
      toast.add({
        severity: 'error',
        summary: 'Error Message',
        detail: error,
        life: 5500,
      })
    })
}

/**
 * Get the total count value of all photos
 * within the selected folder
 *
 * @returns {Promise<void>}
 */
const getTotalCount = async () => {
  // Let's try to retrieve all media
  await supabase.storage
    // Grab the bucket name from our
    // reactive value
    .from(bucket.value)
    // List all photos in the folder that is
    // determined by the dropdown option
    .list(folder.value)
    .then((response) => {
      totalCount.value = response.data.length
    })
}

/**
 * Load more photos and move 'up' within the
 * viewport
 *
 * @returns {void}
 */
const loadMore = () => {
  perPage.value = perPage.value + 6
  getPhotos()
}

/**
 * Opens the help modal
 *
 * @returns {void}
 */
const openHelpModal = () => {
  displayDialog.value = true
}

/**
 * Opens the help modal
 *
 * @returns {void}
 */
const closeHelpModal = () => {
  displayDialog.value = false
}

/* --------------------------------------------------------------------------
 * Component mounting
 * ----------------------------------------------------------------------- */

/**
 * Before the component is mounted
 */
onBeforeMount(() => {
  // Get the photos from the API for rendering
  getPhotos()
})
</script>

<style scoped lang="scss">
// When an image is in fullscreen mode
.fs-image {
  // Calculate the max-height and max-width of the image
  max-height: calc(90vh - 50px) !important;
  max-width: calc(90vw - 50px) !important;
}
</style>
