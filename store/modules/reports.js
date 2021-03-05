import cookies from "js-cookie";
import { queryStingParamsParser } from "../../utils/Helpers";

const headers = {
  headers: {
    Authorization: cookies.get("Authorization"),
  },
};

export default {
  namespaced: true,
  state: {
    minorExpenses: [],
    reimbursables: [],
    report_count: {},
  },
  getters: {
    getMinorExpenses(state) {
      return state.minorExpenses;
    },
    getReimbursables(state) {
      return state.reimbursables;
    },
    getReportCount(state) {
      return state.report_count;
    },
  },
  mutations: {
    setMinorExpenses(state, minorExpenses) {
      state.minorExpenses = minorExpenses;
    },
    setReimbursables(state, reimbursables) {
      state.reimbursables = reimbursables;
    },
    setReportCount(state, count) {
      state.report_count = count;
    },
  },
  actions: {
    async fetchMinorExpensesByUser({ commit }, filters) {
      try {
        let queryString = queryStingParamsParser({
          userId: filters.user_id,
          start: filters.start,
          end: filters.end,
          status: filters.status
        });

        const response = await this.$axios.get(
          "reports/minor/?" + queryString, headers
        );

        commit("setMinorExpenses", response.data);
      } catch (error) {
        throw error;
      }
    },
    async createMinorExpense({}, minorExpense) {
      try {
        await this.$axios.post("reports/minor/", minorExpense, {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        });
      } catch (error) {
        throw error;
      }
    },
    async editMinorExpense({}, minorExpense) {
      try {
        await this.$axios.put(
          "/minorexpenses/" + minorExpense.id + "/",
          minorExpense,
          headers
        );
      } catch (error) {
        throw error;
      }
    },
    async deleteMinorExpense({}, minorExpense) {
      try {
        await this.$axios.delete("/minorexpenses/" + minorExpense.id + "/", {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        });
      } catch (error) {
        throw error;
      }
    },
    async paginateMinorExpenses({ commit }, params) {
      try {
        const queryString = queryStingParamsParser(params);
        const response = await this.$axios.get(
          "/minorexpenses/?" + queryString
        );
        commit("setMinorExpenses", response.data);
      } catch (error) {
        throw error;
      }
    },
    async searchMinorExpenses({ commit }, filters) {
      let queryString = queryStingParamsParser({
        status: filters.status,
        start: filters.start,
        end: filters.end,
      });

      const response = await this.$axios.get(
        "/reports/minor/?" + queryString
      );

      await commit("setMinorExpenses", response.data);
    },
    async fetchReimbursablesByUser({ commit }, filters) {
      try {
        let queryString = queryStingParamsParser({
          userId: filters.userId,
          start: filters.start,
          end: filters.end,
          status: filters.status,
        });

        const response = await this.$axios.get(
          "reports/refundable/?" + queryString,
          headers
        );

        commit("setReimbursables", response.data);
      } catch (error) {
        throw error;
      }
    },
    async createReimbursable({}, reimbursable) {
      try {
        await this.$axios.post("reports/refundable/", reimbursable, headers);
      } catch (error) {
        throw error;
      }
    },
    async editReimbursable({}, reimbursable) {
      try {
        await this.$axios.put(
          "/reimbursable/" + reimbursable.id + "/",
          reimbursable,
          headers
        );
      } catch (error) {
        throw error;
      }
    },
    async deleteReimbursable({}, reimbursable) {
      try {
        await this.$axios.delete("/reimbursable/" + reimbursable.id + "/", {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        });
      } catch (error) {
        throw error;
      }
    },
    async paginateReimbursables({ commit }, params) {
      try {
        const queryString = queryStingParamsParser(params);
        const response = await this.$axios.get("/reimbursable/?" + queryString);
        commit("setReimbursables", response.data);
      } catch (error) {
        throw error;
      }
    },
    async searchReimbursables({ commit }, filters) {
      let queryString = queryStingParamsParser({
        start: filters.start,
        end: filters.end,
        status: filters.status,
      });

      const response = await this.$axios.get(
        "reports/refundable/?" + queryString,
        headers
      );

      await commit("setReimbursables", response.data);
    },
    async ValidateRNC({}, rnc) {
      try {
        await this.$axios.post("http://localhost:2000/api/rnc", {rnc});
        return true;
      } catch (error) {
        return false;
      }
    },
    async ValidateNCF({}, payload) {
      try {
        let ncfPayload = {
          rnc: payload.rnc,
          ncf: payload.ncf,
        };
        await this.$axios.post("http://localhost:2000/api/ncf", ncfPayload);
        return true;
      } catch (error) {
        return false;
      }
    },

    async ReportsCount({ commit }, user_id) {
      try {
        const response = await this.$axios.get(
          "reports/count/?userId=" + user_id
        );
        await commit("setReportCount", response.data);
      } catch (error) {
        throw error;
      }
    },
    async UpdateStatusReportRefundable({}, payload){
      try {
         await this.$axios.patch(
          "reports/refundable/" + payload.reportId,
          {
           status: payload.status
          } 
          
        )
      } catch (error) {
        throw error
      }
    },
    async UpdateStatusReportMinorExpenses({}, payload){
      try {
         await this.$axios.patch(
          "reports/minor/" + payload.reportId,
          {
           status: payload.status
          } 
          
        )
      } catch (error) {
        throw error
      }
    }
  },
};
