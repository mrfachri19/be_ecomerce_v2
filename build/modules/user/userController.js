const bcryptjs = require("bcrypt");
const helperWrapper = require("../../helpers/wrapper");
const deleteFile = require("../../helpers/deleteFile");
const userModel = require("./userModel");
module.exports = {
  getUserById: async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const result = await userModel.getUserById(id);
      if (result.length < 1) {
        return helperWrapper.response(res, 404, `User by id ${id} not found`, null);
      }
      return helperWrapper.response(res, 200, `Success get data user by id`, result);
    } catch (error) {
      return helperWrapper.response(res, 400, `Bad request (${error.message})`, null);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const {
        displayName,
        firstName,
        lastName,
        email,
        phoneNumber,
        deliveryAddress,
        gender,
        birthDay
      } = req.body;
      const user = await userModel.getUserById(id);
      if (user.length < 1) {
        return helperWrapper.response(res, 404, `Get data user by id ${id} not found`, null);
      }
      const setData = {
        displayName,
        firstName,
        lastName,
        email,
        phoneNumber,
        deliveryAddress,
        gender,
        birthDay,
        updatedAt: new Date(Date())
      };
      Object.keys(setData).forEach(property => {
        if (!setData[property]) {
          delete setData[property];
        }
      });
      const result = await userModel.updateProfile(setData, id);
      return helperWrapper.response(res, 200, `Success update profile`, result);
    } catch (error) {
      return helperWrapper.response(res, 400, `Bad request (${error.message})`, null);
    }
  },
  updateImage: async (req, res) => {
    try {
      const {
        id
      } = req.decodeToken;
      const user = await userModel.getUserById(id);
      if (user.length < 1) {
        return helperWrapper.response(res, 404, `User by id ${id} not found`, null);
      }
      if (user[0].image) {
        deleteFile(`public/uploads/user/${user[0].image}`);
      }
      const setData = {
        image: req.file ? req.file.filename : null,
        updatedAt: new Date(Date())
      };
      const result = await userModel.updateProfile(setData, id);
      return helperWrapper.response(res, 200, "Success update image user", result);
    } catch (error) {
      return helperWrapper.response(res, 400, `Bad request : ${error.message}`, null);
    }
  },
  updatePassword: async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const {
        newPassword,
        confirmPassword
      } = req.body;
      const user = await userModel.getUserById(id);
      if (user.length < 1) {
        return helperWrapper.response(res, 404, `User by id ${id} not found`, null);
      }
      if (newPassword !== confirmPassword) {
        return helperWrapper.response(res, 400, `Password does not match`, null);
      }
      const salt = await bcryptjs.genSalt(10);
      const passwordHash = await bcryptjs.hash(newPassword, salt);
      const setData = {
        password: passwordHash
      };
      const result = await userModel.updateProfile(setData, id);
      return helperWrapper.response(res, 200, `Success update password`, {
        id: result.id
      });
    } catch (error) {
      return helperWrapper.response(res, 400, `Bad request : ${error.message}`, null);
    }
  },
  deleteImage: async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const checkId = await userModel.getUserById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(res, 404, `Data by id ${id} not found !`, null);
      }
      await userModel.updateProfile({
        image: null,
        updatedAt: new Date()
      }, id);
      if (checkId[0].image) {
        deleteFile(`../../../public/uploads/promo/${checkId[0].image}`);
      }
      return helperWrapper.response(res, 200, "Success delete image", {
        id
      });
    } catch (error) {
      return helperWrapper.response(res, 400, `Bad Request${error.message ? " (" + error.message + ")" : ""}`, null);
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJiY3J5cHRqcyIsInJlcXVpcmUiLCJoZWxwZXJXcmFwcGVyIiwiZGVsZXRlRmlsZSIsInVzZXJNb2RlbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXRVc2VyQnlJZCIsInJlcSIsInJlcyIsImlkIiwicGFyYW1zIiwicmVzdWx0IiwibGVuZ3RoIiwicmVzcG9uc2UiLCJlcnJvciIsIm1lc3NhZ2UiLCJ1cGRhdGVQcm9maWxlIiwiZGlzcGxheU5hbWUiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImVtYWlsIiwicGhvbmVOdW1iZXIiLCJkZWxpdmVyeUFkZHJlc3MiLCJnZW5kZXIiLCJiaXJ0aERheSIsImJvZHkiLCJ1c2VyIiwic2V0RGF0YSIsInVwZGF0ZWRBdCIsIkRhdGUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInByb3BlcnR5IiwidXBkYXRlSW1hZ2UiLCJkZWNvZGVUb2tlbiIsImltYWdlIiwiZmlsZSIsImZpbGVuYW1lIiwidXBkYXRlUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsImNvbmZpcm1QYXNzd29yZCIsInNhbHQiLCJnZW5TYWx0IiwicGFzc3dvcmRIYXNoIiwiaGFzaCIsInBhc3N3b3JkIiwiZGVsZXRlSW1hZ2UiLCJjaGVja0lkIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvdXNlci91c2VyQ29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBiY3J5cHRqcyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7XG5jb25zdCBoZWxwZXJXcmFwcGVyID0gcmVxdWlyZShcIi4uLy4uL2hlbHBlcnMvd3JhcHBlclwiKTtcbmNvbnN0IGRlbGV0ZUZpbGUgPSByZXF1aXJlKFwiLi4vLi4vaGVscGVycy9kZWxldGVGaWxlXCIpO1xuY29uc3QgdXNlck1vZGVsID0gcmVxdWlyZShcIi4vdXNlck1vZGVsXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0VXNlckJ5SWQ6IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1c2VyTW9kZWwuZ2V0VXNlckJ5SWQoaWQpO1xuICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKFxuICAgICAgICAgIHJlcyxcbiAgICAgICAgICA0MDQsXG4gICAgICAgICAgYFVzZXIgYnkgaWQgJHtpZH0gbm90IGZvdW5kYCxcbiAgICAgICAgICBudWxsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKFxuICAgICAgICByZXMsXG4gICAgICAgIDIwMCxcbiAgICAgICAgYFN1Y2Nlc3MgZ2V0IGRhdGEgdXNlciBieSBpZGAsXG4gICAgICAgIHJlc3VsdFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXG4gICAgICAgIHJlcyxcbiAgICAgICAgNDAwLFxuICAgICAgICBgQmFkIHJlcXVlc3QgKCR7ZXJyb3IubWVzc2FnZX0pYCxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG5cbiAgdXBkYXRlUHJvZmlsZTogYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGRpc3BsYXlOYW1lLFxuICAgICAgICBmaXJzdE5hbWUsXG4gICAgICAgIGxhc3ROYW1lLFxuICAgICAgICBlbWFpbCxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIGRlbGl2ZXJ5QWRkcmVzcyxcbiAgICAgICAgZ2VuZGVyLFxuICAgICAgICBiaXJ0aERheSxcbiAgICAgIH0gPSByZXEuYm9keTtcblxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHVzZXJNb2RlbC5nZXRVc2VyQnlJZChpZCk7XG4gICAgICBpZiAodXNlci5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKFxuICAgICAgICAgIHJlcyxcbiAgICAgICAgICA0MDQsXG4gICAgICAgICAgYEdldCBkYXRhIHVzZXIgYnkgaWQgJHtpZH0gbm90IGZvdW5kYCxcbiAgICAgICAgICBudWxsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNldERhdGEgPSB7XG4gICAgICAgIGRpc3BsYXlOYW1lLFxuICAgICAgICBmaXJzdE5hbWUsXG4gICAgICAgIGxhc3ROYW1lLFxuICAgICAgICBlbWFpbCxcbiAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgIGRlbGl2ZXJ5QWRkcmVzcyxcbiAgICAgICAgZ2VuZGVyLFxuICAgICAgICBiaXJ0aERheSxcbiAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZShEYXRlKCkpLFxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmtleXMoc2V0RGF0YSkuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgICAgICAgaWYgKCFzZXREYXRhW3Byb3BlcnR5XSkge1xuICAgICAgICAgIGRlbGV0ZSBzZXREYXRhW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVzZXJNb2RlbC51cGRhdGVQcm9maWxlKHNldERhdGEsIGlkKTtcblxuICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UocmVzLCAyMDAsIGBTdWNjZXNzIHVwZGF0ZSBwcm9maWxlYCwgcmVzdWx0KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXG4gICAgICAgIHJlcyxcbiAgICAgICAgNDAwLFxuICAgICAgICBgQmFkIHJlcXVlc3QgKCR7ZXJyb3IubWVzc2FnZX0pYCxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG4gIHVwZGF0ZUltYWdlOiBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLmRlY29kZVRva2VuO1xuXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdXNlck1vZGVsLmdldFVzZXJCeUlkKGlkKTtcbiAgICAgIGlmICh1c2VyLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXG4gICAgICAgICAgcmVzLFxuICAgICAgICAgIDQwNCxcbiAgICAgICAgICBgVXNlciBieSBpZCAke2lkfSBub3QgZm91bmRgLFxuICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHVzZXJbMF0uaW1hZ2UpIHtcbiAgICAgICAgZGVsZXRlRmlsZShgcHVibGljL3VwbG9hZHMvdXNlci8ke3VzZXJbMF0uaW1hZ2V9YCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNldERhdGEgPSB7XG4gICAgICAgIGltYWdlOiByZXEuZmlsZSA/IHJlcS5maWxlLmZpbGVuYW1lIDogbnVsbCxcbiAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZShEYXRlKCkpLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXNlck1vZGVsLnVwZGF0ZVByb2ZpbGUoc2V0RGF0YSwgaWQpO1xuICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXG4gICAgICAgIHJlcyxcbiAgICAgICAgMjAwLFxuICAgICAgICBcIlN1Y2Nlc3MgdXBkYXRlIGltYWdlIHVzZXJcIixcbiAgICAgICAgcmVzdWx0XG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gaGVscGVyV3JhcHBlci5yZXNwb25zZShcbiAgICAgICAgcmVzLFxuICAgICAgICA0MDAsXG4gICAgICAgIGBCYWQgcmVxdWVzdCA6ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgIH1cbiAgfSxcblxuICB1cGRhdGVQYXNzd29yZDogYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCB7IG5ld1Bhc3N3b3JkLCBjb25maXJtUGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdXNlck1vZGVsLmdldFVzZXJCeUlkKGlkKTtcbiAgICAgIGlmICh1c2VyLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXG4gICAgICAgICAgcmVzLFxuICAgICAgICAgIDQwNCxcbiAgICAgICAgICBgVXNlciBieSBpZCAke2lkfSBub3QgZm91bmRgLFxuICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1Bhc3N3b3JkICE9PSBjb25maXJtUGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXG4gICAgICAgICAgcmVzLFxuICAgICAgICAgIDQwMCxcbiAgICAgICAgICBgUGFzc3dvcmQgZG9lcyBub3QgbWF0Y2hgLFxuICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2FsdCA9IGF3YWl0IGJjcnlwdGpzLmdlblNhbHQoMTApO1xuICAgICAgY29uc3QgcGFzc3dvcmRIYXNoID0gYXdhaXQgYmNyeXB0anMuaGFzaChuZXdQYXNzd29yZCwgc2FsdCk7XG5cbiAgICAgIGNvbnN0IHNldERhdGEgPSB7IHBhc3N3b3JkOiBwYXNzd29yZEhhc2ggfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXNlck1vZGVsLnVwZGF0ZVByb2ZpbGUoc2V0RGF0YSwgaWQpO1xuXG4gICAgICByZXR1cm4gaGVscGVyV3JhcHBlci5yZXNwb25zZShyZXMsIDIwMCwgYFN1Y2Nlc3MgdXBkYXRlIHBhc3N3b3JkYCwge1xuICAgICAgICBpZDogcmVzdWx0LmlkLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBoZWxwZXJXcmFwcGVyLnJlc3BvbnNlKFxuICAgICAgICByZXMsXG4gICAgICAgIDQwMCxcbiAgICAgICAgYEJhZCByZXF1ZXN0IDogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgfVxuICB9LFxuICBkZWxldGVJbWFnZTogYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCBjaGVja0lkID0gYXdhaXQgdXNlck1vZGVsLmdldFVzZXJCeUlkKGlkKTtcbiAgICAgIGlmIChjaGVja0lkLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGhlbHBlcldyYXBwZXIucmVzcG9uc2UoXG4gICAgICAgICAgcmVzLFxuICAgICAgICAgIDQwNCxcbiAgICAgICAgICBgRGF0YSBieSBpZCAke2lkfSBub3QgZm91bmQgIWAsXG4gICAgICAgICAgbnVsbFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYXdhaXQgdXNlck1vZGVsLnVwZGF0ZVByb2ZpbGUoeyBpbWFnZTogbnVsbCwgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpIH0sIGlkKTtcblxuICAgICAgaWYgKGNoZWNrSWRbMF0uaW1hZ2UpIHtcbiAgICAgICAgZGVsZXRlRmlsZShgLi4vLi4vLi4vcHVibGljL3VwbG9hZHMvcHJvbW8vJHtjaGVja0lkWzBdLmltYWdlfWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVyV3JhcHBlci5yZXNwb25zZShyZXMsIDIwMCwgXCJTdWNjZXNzIGRlbGV0ZSBpbWFnZVwiLCB7IGlkIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gaGVscGVyV3JhcHBlci5yZXNwb25zZShcbiAgICAgICAgcmVzLFxuICAgICAgICA0MDAsXG4gICAgICAgIGBCYWQgUmVxdWVzdCR7ZXJyb3IubWVzc2FnZSA/IFwiIChcIiArIGVycm9yLm1lc3NhZ2UgKyBcIilcIiA6IFwiXCJ9YCxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICB9XG4gIH0sXG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDbEMsTUFBTUMsYUFBYSxHQUFHRCxPQUFPLENBQUMsdUJBQXVCLENBQUM7QUFDdEQsTUFBTUUsVUFBVSxHQUFHRixPQUFPLENBQUMsMEJBQTBCLENBQUM7QUFDdEQsTUFBTUcsU0FBUyxHQUFHSCxPQUFPLENBQUMsYUFBYSxDQUFDO0FBRXhDSSxNQUFNLENBQUNDLE9BQU8sR0FBRztFQUNmQyxXQUFXLEVBQUUsTUFBQUEsQ0FBT0MsR0FBRyxFQUFFQyxHQUFHLEtBQUs7SUFDL0IsSUFBSTtNQUNGLE1BQU07UUFBRUM7TUFBRyxDQUFDLEdBQUdGLEdBQUcsQ0FBQ0csTUFBTTtNQUV6QixNQUFNQyxNQUFNLEdBQUcsTUFBTVIsU0FBUyxDQUFDRyxXQUFXLENBQUNHLEVBQUUsQ0FBQztNQUM5QyxJQUFJRSxNQUFNLENBQUNDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDckIsT0FBT1gsYUFBYSxDQUFDWSxRQUFRLENBQzNCTCxHQUFHLEVBQ0gsR0FBRyxFQUNGLGNBQWFDLEVBQUcsWUFBVyxFQUM1QixJQUNGLENBQUM7TUFDSDtNQUVBLE9BQU9SLGFBQWEsQ0FBQ1ksUUFBUSxDQUMzQkwsR0FBRyxFQUNILEdBQUcsRUFDRiw2QkFBNEIsRUFDN0JHLE1BQ0YsQ0FBQztJQUNILENBQUMsQ0FBQyxPQUFPRyxLQUFLLEVBQUU7TUFDZCxPQUFPYixhQUFhLENBQUNZLFFBQVEsQ0FDM0JMLEdBQUcsRUFDSCxHQUFHLEVBQ0YsZ0JBQWVNLEtBQUssQ0FBQ0MsT0FBUSxHQUFFLEVBQ2hDLElBQ0YsQ0FBQztJQUNIO0VBQ0YsQ0FBQztFQUVE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