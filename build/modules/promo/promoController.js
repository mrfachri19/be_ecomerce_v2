const helperResponse = require("../../helpers/wrapper/index");
const promoModel = require("./promoModel");
const deleteFile = require("../../helpers/deleteFile");
const {
  v4: uuid
} = require("uuid");
module.exports = {
  postPromo: async (req, res) => {
    try {
      const {
        name,
        discount,
        minTotalPrice,
        maxDiscount,
        promoCode,
        description,
        dateStart,
        dateEnd
      } = req.body;
      console.log(req.body);
      const setData = {
        id: uuid(),
        name,
        discount,
        minTotalPrice,
        maxDiscount,
        promoCode,
        description,
        dateStart,
        dateEnd,
        image: req.file ? req.file.filename : null
      };
      const result = await promoModel.postPromo(setData);
      //   console.log(result);
      return helperResponse.response(res, 200, "Success Create Data", result);
    } catch (error) {
      return helperResponse.response(res, 400, `Bad Request(${error.message})`, null);
    }
  },
  getAllPromo: async (req, res) => {
    try {
      let {
        page,
        limit,
        search
      } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      search = search || "";
      let offset = page * limit - limit;
      const totalData = await promoModel.getCountPromo(search);
      const totalPage = Math.ceil(totalData / limit);
      if (totalPage < page) {
        offset = 0;
        page = 1;
      }
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      };
      const result = await promoModel.getAllPromo(limit, offset, search);
      if (result.length < 1) {
        return helperResponse.response(res, 200, `Data not found !`, []);
      }
      return helperResponse.response(res, 200, "Success get data", result, pageInfo);
    } catch (error) {
      return helperResponse.response(res, 400, `Bad request (${error.message})`, null);
    }
  },
  getPromoById: async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const result = await promoModel.getPromoById(id);
      if (result.length < 1) {
        return helperResponse.response(res, 200, `Data by id ${id} not found!`, result);
      }
      return helperResponse.response(res, 200, "Success get by id", result);
    } catch (error) {
      return helperResponse.response(res, 400, `Bad request (${error.message})`, null);
    }
  },
  updatePromo: async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const checkId = await promoModel.getPromoById(id);
      if (checkId.length < 1) {
        return helperResponse.response(res, 404, `Data by id ${id} not found !`, null);
      }
      const {
        name,
        discount,
        minTotalPrice,
        maxDiscount,
        promoCode,
        description,
        dateStart,
        dateEnd
      } = req.body;
      const setData = {
        name,
        discount,
        minTotalPrice,
        maxDiscount,
        promoCode,
        description,
        dateStart,
        dateEnd,
        image: req.file ? req.file.filename : null,
        updatedAt: new Date(Date.now())
      };
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }
      if (req.file && checkId[0].image) {
        deleteFile(`../../../public/uploads/promo/${checkId[0].image}`);
      }
      const result = await promoModel.updatePromo(setData, id);
      return helperResponse.response(res, 200, "Success update data", result);
    } catch (error) {
      return helperResponse.response(res, 400, `Bad request (${error.message})`, null);
    }
  },
  deletePromo: async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const checkId = await promoModel.getPromoById(id);
      if (checkId.length < 1) {
        return helperResponse.response(res, 404, `Data by id ${id} not found !`, null);
      }
      if (checkId[0].image) {
        deleteFile(`../../../public/uploads/promo/${checkId[0].image}`);
      }
      const result = await promoModel.deletePromo(id);
      return helperResponse.response(res, 200, "Success delete data", result);
    } catch (error) {
      return helperResponse.response(res, 400, `Bad request (${error.message})`, null);
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJoZWxwZXJSZXNwb25zZSIsInJlcXVpcmUiLCJwcm9tb01vZGVsIiwiZGVsZXRlRmlsZSIsInY0IiwidXVpZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJwb3N0UHJvbW8iLCJyZXEiLCJyZXMiLCJuYW1lIiwiZGlzY291bnQiLCJtaW5Ub3RhbFByaWNlIiwibWF4RGlzY291bnQiLCJwcm9tb0NvZGUiLCJkZXNjcmlwdGlvbiIsImRhdGVTdGFydCIsImRhdGVFbmQiLCJib2R5IiwiY29uc29sZSIsImxvZyIsInNldERhdGEiLCJpZCIsImltYWdlIiwiZmlsZSIsImZpbGVuYW1lIiwicmVzdWx0IiwicmVzcG9uc2UiLCJlcnJvciIsIm1lc3NhZ2UiLCJnZXRBbGxQcm9tbyIsInBhZ2UiLCJsaW1pdCIsInNlYXJjaCIsInF1ZXJ5IiwiTnVtYmVyIiwib2Zmc2V0IiwidG90YWxEYXRhIiwiZ2V0Q291bnRQcm9tbyIsInRvdGFsUGFnZSIsIk1hdGgiLCJjZWlsIiwicGFnZUluZm8iLCJsZW5ndGgiLCJnZXRQcm9tb0J5SWQiLCJwYXJhbXMiLCJ1cGRhdGVQcm9tbyIsImNoZWNrSWQiLCJ1cGRhdGVkQXQiLCJEYXRlIiwibm93IiwiZGF0YSIsImRlbGV0ZVByb21vIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvcHJvbW8vcHJvbW9Db250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGhlbHBlclJlc3BvbnNlID0gcmVxdWlyZShcIi4uLy4uL2hlbHBlcnMvd3JhcHBlci9pbmRleFwiKTtcbmNvbnN0IHByb21vTW9kZWwgPSByZXF1aXJlKFwiLi9wcm9tb01vZGVsXCIpO1xuY29uc3QgZGVsZXRlRmlsZSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzL2RlbGV0ZUZpbGVcIik7XG5jb25zdCB7IHY0OiB1dWlkIH0gPSByZXF1aXJlKFwidXVpZFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBvc3RQcm9tbzogYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIG1pblRvdGFsUHJpY2UsXG4gICAgICAgIG1heERpc2NvdW50LFxuICAgICAgICBwcm9tb0NvZGUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkYXRlU3RhcnQsXG4gICAgICAgIGRhdGVFbmQsXG4gICAgICB9ID0gcmVxLmJvZHk7XG4gICAgICBjb25zb2xlLmxvZyhyZXEuYm9keSk7XG5cbiAgICAgIGNvbnN0IHNldERhdGEgPSB7XG4gICAgICAgIGlkOiB1dWlkKCksXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBtaW5Ub3RhbFByaWNlLFxuICAgICAgICBtYXhEaXNjb3VudCxcbiAgICAgICAgcHJvbW9Db2RlLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgZGF0ZVN0YXJ0LFxuICAgICAgICBkYXRlRW5kLFxuICAgICAgICBpbWFnZTogcmVxLmZpbGUgPyByZXEuZmlsZS5maWxlbmFtZSA6IG51bGwsXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJvbW9Nb2RlbC5wb3N0UHJvbW8oc2V0RGF0YSk7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICByZXR1cm4gaGVscGVyUmVzcG9uc2UucmVzcG9uc2UocmVzLCAyMDAsIFwiU3VjY2VzcyBDcmVhdGUgRGF0YVwiLCByZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gaGVscGVyUmVzcG9uc2UucmVzcG9uc2UoXG4gICAgICAgIHJlcyxcbiAgICAgICAgNDAwLFxuICAgICAgICBgQmFkIFJlcXVlc3QoJHtlcnJvci5tZXNzYWdlfSlgLFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgIH1cbiAgfSxcblxuICBnZXRBbGxQcm9tbzogYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB7IHBhZ2UsIGxpbWl0LCBzZWFyY2ggfSA9IHJlcS5xdWVyeTtcbiAgICAgIHBhZ2UgPSBOdW1iZXIocGFnZSkgfHwgMTtcbiAgICAgIGxpbWl0ID0gTnVtYmVyKGxpbWl0KSB8fCAxMDtcbiAgICAgIHNlYXJjaCA9IHNlYXJjaCB8fCBcIlwiO1xuXG4gICAgICBsZXQgb2Zmc2V0ID0gcGFnZSAqIGxpbWl0IC0gbGltaXQ7XG4gICAgICBjb25zdCB0b3RhbERhdGEgPSBhd2FpdCBwcm9tb01vZGVsLmdldENvdW50UHJvbW8oc2VhcmNoKTtcbiAgICAgIGNvbnN0IHRvdGFsUGFnZSA9IE1hdGguY2VpbCh0b3RhbERhdGEgLyBsaW1pdCk7XG5cbiAgICAgIGlmICh0b3RhbFBhZ2UgPCBwYWdlKSB7XG4gICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIHBhZ2UgPSAxO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYWdlSW5mbyA9IHtcbiAgICAgICAgcGFnZSxcbiAgICAgICAgdG90YWxQYWdlLFxuICAgICAgICBsaW1pdCxcbiAgICAgICAgdG90YWxEYXRhLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJvbW9Nb2RlbC5nZXRBbGxQcm9tbyhsaW1pdCwgb2Zmc2V0LCBzZWFyY2gpO1xuXG4gICAgICBpZiAocmVzdWx0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGhlbHBlclJlc3BvbnNlLnJlc3BvbnNlKHJlcywgMjAwLCBgRGF0YSBub3QgZm91bmQgIWAsIFtdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlclJlc3BvbnNlLnJlc3BvbnNlKFxuICAgICAgICByZXMsXG4gICAgICAgIDIwMCxcbiAgICAgICAgXCJTdWNjZXNzIGdldCBkYXRhXCIsXG4gICAgICAgIHJlc3VsdCxcbiAgICAgICAgcGFnZUluZm9cbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBoZWxwZXJSZXNwb25zZS5yZXNwb25zZShcbiAgICAgICAgcmVzLFxuICAgICAgICA0MDAsXG4gICAgICAgIGBCYWQgcmVxdWVzdCAoJHtlcnJvci5tZXNzYWdlfSlgLFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgIH1cbiAgfSxcblxuICBnZXRQcm9tb0J5SWQ6IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJvbW9Nb2RlbC5nZXRQcm9tb0J5SWQoaWQpO1xuICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBoZWxwZXJSZXNwb25zZS5yZXNwb25zZShcbiAgICAgICAgICByZXMsXG4gICAgICAgICAgMjAwLFxuICAgICAgICAgIGBEYXRhIGJ5IGlkICR7aWR9IG5vdCBmb3VuZCFgLFxuICAgICAgICAgIHJlc3VsdFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVyUmVzcG9uc2UucmVzcG9uc2UocmVzLCAyMDAsIFwiU3VjY2VzcyBnZXQgYnkgaWRcIiwgcmVzdWx0KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGhlbHBlclJlc3BvbnNlLnJlc3BvbnNlKFxuICAgICAgICByZXMsXG4gICAgICAgIDQwMCxcbiAgICAgICAgYEJhZCByZXF1ZXN0ICgke2Vycm9yLm1lc3NhZ2V9KWAsXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgfVxuICB9LFxuXG4gIHVwZGF0ZVByb21vOiBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICAgIGNvbnN0IGNoZWNrSWQgPSBhd2FpdCBwcm9tb01vZGVsLmdldFByb21vQnlJZChpZCk7XG4gICAgICBpZiAoY2hlY2tJZC5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBoZWxwZXJSZXNwb25zZS5yZXNwb25zZShcbiAgICAgICAgICByZXMsXG4gICAgICAgICAgNDA0LFxuICAgICAgICAgIGBEYXRhIGJ5IGlkICR7aWR9IG5vdCBmb3VuZCAhYCxcbiAgICAgICAgICBudWxsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGRpc2NvdW50LFxuICAgICAgICBtaW5Ub3RhbFByaWNlLFxuICAgICAgICBtYXhEaXNjb3VudCxcbiAgICAgICAgcHJvbW9Db2RlLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgZGF0ZVN0YXJ0LFxuICAgICAgICBkYXRlRW5kLFxuICAgICAgfSA9IHJlcS5ib2R5O1xuICAgICAgY29uc3Qgc2V0RGF0YSA9IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGlzY291bnQsXG4gICAgICAgIG1pblRvdGFsUHJpY2UsXG4gICAgICAgIG1heERpc2NvdW50LFxuICAgICAgICBwcm9tb0NvZGUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkYXRlU3RhcnQsXG4gICAgICAgIGRhdGVFbmQsXG4gICAgICAgIGltYWdlOiByZXEuZmlsZSA/IHJlcS5maWxlLmZpbGVuYW1lIDogbnVsbCxcbiAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpKSxcbiAgICAgIH07XG5cbiAgICAgIGZvciAoY29uc3QgZGF0YSBpbiBzZXREYXRhKSB7XG4gICAgICAgIGlmICghc2V0RGF0YVtkYXRhXSkge1xuICAgICAgICAgIGRlbGV0ZSBzZXREYXRhW2RhdGFdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXEuZmlsZSAmJiBjaGVja0lkWzBdLmltYWdlKSB7XG4gICAgICAgIGRlbGV0ZUZpbGUoYC4uLy4uLy4uL3B1YmxpYy91cGxvYWRzL3Byb21vLyR7Y2hlY2tJZFswXS5pbWFnZX1gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJvbW9Nb2RlbC51cGRhdGVQcm9tbyhzZXREYXRhLCBpZCk7XG4gICAgICByZXR1cm4gaGVscGVyUmVzcG9uc2UucmVzcG9uc2UocmVzLCAyMDAsIFwiU3VjY2VzcyB1cGRhdGUgZGF0YVwiLCByZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gaGVscGVyUmVzcG9uc2UucmVzcG9uc2UoXG4gICAgICAgIHJlcyxcbiAgICAgICAgNDAwLFxuICAgICAgICBgQmFkIHJlcXVlc3QgKCR7ZXJyb3IubWVzc2FnZX0pYCxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG5cbiAgZGVsZXRlUHJvbW86IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgY2hlY2tJZCA9IGF3YWl0IHByb21vTW9kZWwuZ2V0UHJvbW9CeUlkKGlkKTtcbiAgICAgIGlmIChjaGVja0lkLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGhlbHBlclJlc3BvbnNlLnJlc3BvbnNlKFxuICAgICAgICAgIHJlcyxcbiAgICAgICAgICA0MDQsXG4gICAgICAgICAgYERhdGEgYnkgaWQgJHtpZH0gbm90IGZvdW5kICFgLFxuICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGVja0lkWzBdLmltYWdlKSB7XG4gICAgICAgIGRlbGV0ZUZpbGUoYC4uLy4uLy4uL3B1YmxpYy91cGxvYWRzL3Byb21vLyR7Y2hlY2tJZFswXS5pbWFnZX1gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJvbW9Nb2RlbC5kZWxldGVQcm9tbyhpZCk7XG4gICAgICByZXR1cm4gaGVscGVyUmVzcG9uc2UucmVzcG9uc2UocmVzLCAyMDAsIFwiU3VjY2VzcyBkZWxldGUgZGF0YVwiLCByZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gaGVscGVyUmVzcG9uc2UucmVzcG9uc2UoXG4gICAgICAgIHJlcyxcbiAgICAgICAgNDAwLFxuICAgICAgICBgQmFkIHJlcXVlc3QgKCR7ZXJyb3IubWVzc2FnZX0pYCxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxjQUFjLEdBQUdDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQztBQUM3RCxNQUFNQyxVQUFVLEdBQUdELE9BQU8sQ0FBQyxjQUFjLENBQUM7QUFDMUMsTUFBTUUsVUFBVSxHQUFHRixPQUFPLENBQUMsMEJBQTBCLENBQUM7QUFDdEQsTUFBTTtFQUFFRyxFQUFFLEVBQUVDO0FBQUssQ0FBQyxHQUFHSixPQUFPLENBQUMsTUFBTSxDQUFDO0FBRXBDSyxNQUFNLENBQUNDLE9BQU8sR0FBRztFQUNmQyxTQUFTLEVBQUUsTUFBQUEsQ0FBT0MsR0FBRyxFQUFFQyxHQUFHLEtBQUs7SUFDN0IsSUFBSTtNQUNGLE1BQU07UUFDSkMsSUFBSTtRQUNKQyxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsV0FBVztRQUNYQyxTQUFTO1FBQ1RDLFdBQVc7UUFDWEMsU0FBUztRQUNUQztNQUNGLENBQUMsR0FBR1QsR0FBRyxDQUFDVSxJQUFJO01BQ1pDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDWixHQUFHLENBQUNVLElBQUksQ0FBQztNQUVyQixNQUFNRyxPQUFPLEdBQUc7UUFDZEMsRUFBRSxFQUFFbEIsSUFBSSxDQUFDLENBQUM7UUFDVk0sSUFBSTtRQUNKQyxRQUFRO1FBQ1JDLGFBQWE7UUFDYkMsV0FBVztRQUNYQyxTQUFTO1FBQ1RDLFdBQVc7UUFDWEMsU0FBUztRQUNUQyxPQUFPO1FBQ1BNLEtBQUssRUFBRWYsR0FBRyxDQUFDZ0IsSUFBSSxHQUFHaEIsR0FBRyxDQUFDZ0IsSUFBSSxDQUFDQyxRQUFRLEdBQUc7TUFDeEMsQ0FBQztNQUNELE1BQU1DLE1BQU0sR0FBRyxNQUFNekIsVUFBVSxDQUFDTSxTQUFTLENBQUNj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