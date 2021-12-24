<template>
  <div class="grid">
    <div class="col-12">
      <div dir="ltr">
        <div class="text-center">
          <Message severity="info" :closable="false" class="text-justify">
            In regards to any multimedia content that the following terms
            <strong><em>must</em></strong> be met.
          </Message>
          <Divider align="left">
            <div class="p-d-inline-flex p-ai-center">
              <i class="pi pi-thumbs-up mr-2"></i>
              <strong>You are free to</strong>
            </div>
          </Divider>
        </div>
        <div class="text-justify">
          <ul class="list-none">
            <li>
              <strong>Share</strong>: <br />Share, copy and redistribute the
              material in any medium or format. The licensor cannot revoke these
              freedoms as long as you follow the license terms.
            </li>
          </ul>
        </div>
        <br />
        <div class="text-justify">
          <Divider align="left">
            <div class="p-d-inline-flex p-ai-center">
              <i class="pi pi-exclamation-circle mr-2"></i>
              <strong>Under the following terms</strong>
            </div>
          </Divider>
          <ul class="list-none">
            <li>
              <strong>You give proper attributions</strong>
              <br />
              <span
                >You must give appropriate credit, provide a link to the
                license, and indicate if changes were made. You may do so in any
                reasonable manner, but not in any way that suggests the licensor
                endorses you or your use.
              </span>
              <Divider type="dashed" />
            </li>
            <li>
              <strong>You do <em>not</em> try to sell:</strong>
              <br />
              You may not use the material for commercial purposes
              <Divider type="dashed" />
            </li>
            <li>
              <strong>You do <em>not</em> modify:</strong>
              <br />
              If you remix, transform, or build upon the material, you may not
              distribute the modified material.
              <Divider type="dashed" />
            </li>
            <li>
              <strong>You do <em>not</em> apply restrictions:</strong>
              <br />
              You may not apply legal terms or technological measures that
              legally restrict others from doing anything the license permits.
            </li>
          </ul>
        </div>
        <br />
        <div>
          <Divider align="left">
            <div class="p-d-inline-flex p-ai-center">
              <i class="pi pi-eye mr-2"></i>
              <strong>Notices</strong>
            </div>
          </Divider>
          <ul class="list-none">
            <li>
              You do not have to comply with the license for elements of the
              material in the public domain or where your use is permitted by an
              applicable exception or limitation.
              <Divider type="dashed" />
            </li>
            <li>
              No warranties are given. The license may not give you all of the
              permissions necessary for your intended use. For example, other
              rights such as publicity, privacy, or moral rights may limit how
              you use the material.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* --------------------------------------------------------------------------
 * Component imports
 * ----------------------------------------------------------------------- */
import Divider from 'primevue/divider'
import Message from 'primevue/message'
</script>
