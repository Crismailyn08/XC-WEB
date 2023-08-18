<template>
  <tr
    class="flex flex-col justify-center items-center p-4 w-full tablet:flex-row tablet:justify-around tablet:py-2 rounded-lg"
  >
      <td
      v-if="$mq !== 'sm'"
      class="flex justify-center items-center tablet:w-1/12 bg-hueso rounded-full"
    >
      <!-- <img
        v-if="reimbursable.imageUrl"
        class="rounded-full object-cover"
        :src="apiUrl + reimbursable.imageUrl"
        alt="foto de perfil"
      /> -->
      <avatar v-if="reimbursable.user"
        :lighten="10"
        :size="60"
        color="grey"
        backgroundColor="ccc"
        :username="reimbursable.user.fullName"
      ></avatar>
      
    </td>
    <td class="flex flex-col tablet:px-3 w-1/2 tablet:ml-5">
      <span>{{reimbursable.invoiceDate}}</span>
      <label>Fecha</label>
    </td>
    <td class="flex flex-col tablet:px-3 w-1/2">
      <span>{{reimbursable.provider}}</span>
      <label>Proveedor</label>
    </td>
    <td class="flex flex-col tablet:px-3 w-1/2">
      <span>{{reimbursable.rnc}}</span>
      <label>RNC</label>
    </td>
    <td class="flex flex-col tablet:px-3 w-1/2 ">
      <span>RD${{parseInt(reimbursable.total).toFixed(2)}}</span>
      <label>Total</label>
    </td>
    <td class="flex flex-col tablet:px-3 w-1/2 ">
      <span>{{reimbursable.status }}</span>
      <label>Status</label>
    </td>
    <td class="flex flex-col tablet:px-3 w-1/2 tablet:w-auto tablet:mr-8">
      <actions
        :edit="edit"
        @details="$emit('itemDetails', reimbursable)"
        @edit="$emit('itemEdit', reimbursable)"
        @delete="$emit('itemDelete', reimbursable)"
      ></actions>
    </td>
  </tr>
</template>
<script>
import Actions from "../Actions";
import Avatar from "vue-avatar";

export default {
  components: {
    Actions,
    Avatar
  },
  props: {
    edit: {
      required: true
    },
    reimbursable: {
      required: true,
    }
  }
};
</script>

