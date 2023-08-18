<template>
  <div
    class="flex justify-between items-center text-center bg-white shadow p-2 tablet:px-3 tablet:flex-col tablet:h-screen tablet:w-1/4 desktop:w-1/6"
  >
    <div class="flex w-full justify-between tablet:flex-col">
      <div class="flex items-center p-2">
        <img
          @click="logout()"
          class="hidden tablet:mt-4 tablet:block cursor-pointer"
          src="../../../assets/images/logout-button.svg"
         alt="Logout"/>
        <nuxt-link to="/">
          <img
            class="tablet:hidden w-1/2"
            src="../../../assets/images/logo.svg"
            alt
          />
        </nuxt-link>
      </div>
      <div
        @click="$emit('toogleMenu')"
        class="tablet:hidden self-center flex flex-col justify-around h-5 my-5"
      >
        <svg
          class="fill-current text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="4.617"
          viewBox="0 0 25 4.617"
        >
          <rect
            id="Rectangle_139"
            data-name="Rectangle 139"
            width="25"
            height="4.617"
            fill="#9b9b9b"
          ></rect>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="4.617"
          viewBox="0 0 25 4.617"
        >
          <rect
            id="Rectangle_141"
            data-name="Rectangle 141"
            width="25"
            height="4.617"
            fill="#9b9b9b"
          ></rect>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="4.617"
          viewBox="0 0 25 4.617"
        >
          <rect
            id="Rectangle_140"
            data-name="Rectangle 140"
            width="25"
            height="4.617"
            fill="#9b9b9b"
          ></rect>
        </svg>
      </div>

      <UserProfileInfo
        :apiUrl="api_url"
        :user="user"
        v-if="$mq === 'lg' || $mq === 'md'"
      />
    </div>

    <!-- reportes -->
    <div class="flex items-center hidden tablet:block">
      <div class="flex flex-col items-center">
        <span class="text-3xl text-orange-400 font-bold">{{
          report_count.total
        }}</span>
        <p>Reportes</p>
      </div>
      <div class="flex flex-col items-center mt-8">
        <span class="text-3xl text-teal-500 font-bold">{{
          report_count.approved
        }}</span>
        <p>Aprobados</p>
      </div>

      <div class="flex flex-col items-center mt-8">
        <span class="text-3xl text-green-700 font-bold">{{
          report_count.pending
        }}</span>
        <p>Pendientes</p>
      </div>
    </div>

    <!-- Informacion -->
    <div
      class="hidden tablet:block mt-20 flex flex-col items-center text-center mb-6"
    >
      <h1 class="text-3xl">Información</h1>
      <div class="text-md text-gray-800">
        <span>{{ user.position }} ||</span>
        <span>XpertCode</span>
      </div>
      <p class="text-md text-gray-800">809-345-5678</p>
    </div>
  </div>
</template>

<script>
import Alert from "../../../mixins/mixin-alert.js";
import UserProfileInfo from "./UserProfileInfo";

export default {
  components: { UserProfileInfo },
  mixins: [Alert],
  data() {
    return {
      api_url: process.env.API_URL,
      report_count: {
        total: 0,
        approved: 0,
        pending: 0,
      },
    };
  },
  props: ["user"],
  created() {
    this.fetchReportsCounts();
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      await this.$router.push("/login");
    },
    async fetchReportsCounts() {
      try {
        await this.$store.dispatch("reports/ReportsCount", this.user.id);
        this.report_count = await this.$store.getters["reports/getReportCount"];
      } catch (error) {
        this.fireErrorAlert(this.loader);
      }
    },
  },
};
</script>
