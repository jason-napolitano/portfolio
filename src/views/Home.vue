<template>
  <!-- Responsive grid system -->
  <main class="grid">
    <!-- Always display the Filter System -->
    <section class="col-12 mt-3">
      <!-- Affix the toolbar to the top of the window upon scroll -->
      <ElAffix :offset="-5">
        <!-- Filter toolbar -->
        <Toolbar>
          <!-- Toolbar's left slot  -->
          <template #left>
            <!-- Folder name dropdown -->
            <div v-tooltip.hover.right="'Gallery'">
              <Dropdown
                placeholder="Gallery"
                optionValue="value"
                @change="getPhotos"
                optionLabel="name"
                :options="folders"
                v-model="folder"
                class="mr-2"
              />
            </div>
          </template>
          <!-- Toolbar's right slot  -->
          <template #right>
            <!-- `Order by` dropdown -- >
            <div v-tooltip.hover.left="'Order By'">
              <Dropdown
                :options="orderByOptions"
                placeholder="Order By"
                optionValue="value"
                @change="getPhotos"
                optionLabel="name"
                v-model="orderBy"
                class="mr-2"
              />
            </div>
            < !-- `Order type` dropdown -- >
            <div v-tooltip.hover.left="'Order'">
              <Dropdown
                :options="orderTypeOptions"
                placeholder="Order Type"
                optionValue="value"
                @change="getPhotos"
                optionLabel="name"
                v-model="orderType"
                class="mr-2"
              />
            </div>
            -->
            <!-- `Query limit` dropdown -->
            <div v-tooltip.hover.left="'Limit'">
              <Dropdown
                placeholder="Limit"
                :options="limitOptions"
                optionValue="value"
                @change="getPhotos"
                optionLabel="name"
                v-model="perPage"
                class="mr-2"
              />
            </div>
            <!-- `Reset filters` button -->
            <div v-tooltip.hover.left="'Reset Filters'">
              <Button @click="resetFilters">
                <!-- Local refresh icon -->
                <Icon icon="filters:refresh" width="20" />
              </Button>
            </div>
          </template>
        </Toolbar>
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
      <div class="lead text-center py-2">
        Showing
        <span class="text-pomegranate">{{ formatCount(photos) }}</span> images
        from the
        <span class="text-pomegranate">{{ toTitleCase(folder) }}</span>
        gallery
      </div>
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
          class="sm:col-12 md:col-4 lg:col-4"
          :key="index"
        >
          <!-- Display the individual image ... -->
          <div class="photo-item">
            <div
              class="border-round-top bg-gray-900 text-gray-100 p-2 text-center"
            >
              <div class="name">
                {{ parseFilename(image) }}
              </div>
            </div>
            <!-- Using the image component ... -->
            <ElImage
              class="border-round-bottom cursor-pointer sm:h-20rem md:h-15rem w-full"
              @click="imageClick(index)"
              :src="parseFileUrl(image)"
              :alt="parseFilename(image)"
              fit="cover"
              lazy
            >
              <!-- Or use a placeholder when the image is loading -->
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
    <Toast />
  </main>
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Component imports
 * ----------------------------------------------------------------------- */
import Galleria from 'primevue/galleria'
import Dropdown from 'primevue/dropdown'
import Loading from '../shared/Loading'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

/* --------------------------------------------------------------------------
 * Library imports
 * ----------------------------------------------------------------------- */
import { useToast } from 'primevue/usetoast'
import { supabase } from '../utils/supabase'
import { ref, onBeforeMount } from 'vue'
import {
  thousandsSeparator,
  removeExtension,
  toTitleCase,
  count,
} from '../utils'

/* --------------------------------------------------------------------------
 * General component references
 * ----------------------------------------------------------------------- */

// Display the gallery component initially?
const displayGalleria = ref(false)

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
  { name: 'Architecture', value: 'architecture' },
  { name: 'Vehicles', value: 'vehicles' },
  { name: 'Animals', value: 'animals' },
  { name: 'People', value: 'people' },
  { name: 'Nature', value: 'nature' },
  { name: 'Macro', value: 'macro' },
  { name: 'Misc', value: 'misc' },
])

/* --------------------------------------------------------------------------
 * Query ordering
 * ----------------------------------------------------------------------- */

// Initial query offset
const offset = ref(0)

// Order by `created_at`
const orderBy = ref('name')

// in `ASC` order
const orderType = ref('asc')

/* Dropdown options
const orderByOptions = ref([
  { name: 'Last Accessed', value: 'last_accessed_at' },
  { name: 'Created At', value: 'created_at' },
  { name: 'Image Name', value: 'name' },
])

// Dropdown options
const orderTypeOptions = ref([
  { name: 'DESC', value: 'desc' },
  { name: 'ASC', value: 'asc' },
])
*/

/* --------------------------------------------------------------------------
 * Query limiting
 * ----------------------------------------------------------------------- */

// Set initial per page value to `9`
const perPage = ref(9)

// Dropdown options
const limitOptions = ref([
  { name: '6', value: 6 },
  { name: '9', value: 9 },
  { name: '12', value: 12 },
  { name: '24', value: 24 },
  { name: '36', value: 36 },
  { name: '48', value: 48 },
  { name: '60', value: 60 },
  { name: '72', value: 72 },
  { name: '96', value: 96 },
  { name: '128', value: 128 },
  { name: '256', value: 256 },
  { name: '512', value: 512 },
  { name: '1024', value: 1024 },
])

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
 * Show a formatted count
 *
 * @param data
 *
 * @return {string}
 */
const formatCount = (data) => thousandsSeparator(count(data))

/**
 * Refresh all filters
 *
 * @returns {void}
 */
const resetFilters = () => {
  perPage.value = 9
  orderBy.value = 'name'
  orderType.value = 'asc'
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
  // Calculate the max height and width of the image
  max-height: calc(90vh - 50px) !important;
  max-width: calc(90vw - 50px) !important;
}
</style>
