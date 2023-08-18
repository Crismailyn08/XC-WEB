<template>
  <tr
    class="flex flex-wrap justify-center items-center p-4 w-full tablet:flex-no-wrap tablet:justify-around tablet:py-2 rounded-lg"
  >
    <td
      v-if="$mq !== 'sm'"
      class="flex justify-center items-center tablet:w-1/12 bg-hueso rounded-full"
    >
      <!-- <img
        v-if="minorExpense.imageUrl"
        class="rounded-full object-cover"
        :src="apiUrl + minorExpense.imageUrl"
        alt="foto de perfil"
      /> -->
      <avatar v-if="minorExpense.user"
        :lighten="10"
        :size="60"
        color="grey"
        backgroundColor="ccc"
        :username="minorExpense.user.fullName"
      ></avatar>
    </td>
    <td class="flex flex-col tablet:px-3 w-1/2 tablet:ml-6">
      <span>{{ minorExpense.invoiceDate }}</span>
      <label>Fecha</label>
    </td>
    <td class="flex flex-col tablet:px-3 w-1/2 ">
      <span>{{ minorExpense.description }}</span>
      <label>Descripcion</label>
    </td>
    <td class="flex flex-col  tablet:px-3 w-1/2 ">
      <span>{{ minorExpense.place }}</span>
      <label>Lugar</label>
    </td>
    <td class="flex flex-col  tablet:px-3 w-1/2 tablet:ml-10">
      <span>{{ minorExpense.total }}</span>
      <label>Monto</label>
    </td>
    <td class="flex flex-col tablet:px-3 w-1/2 ">
      <span>{{ minorExpense.status }}</span>
      <label>Status</label>
    </td>

    <td class="flex tablet:px-3 w-1/2 tablet:w-auto tablet:mr-8">
      <actions
        :edit="edit"
        @details="$emit('itemDetails', minorExpense)"
        @edit="$emit('itemEdit', minorExpense)"
        @delete="$emit('itemDelete', minorExpense)"
      ></actions>
    </td>
  </tr>
</template>
<script>
import Avatar from "vue-avatar";
import Actions from "../Actions";

export default {
  components: {
    Avatar,
    Actions,
  },
  props: {
    minorExpense: {
      required: true,
    },
    edit: {
      required: true,
    },
  },
};
</script>
