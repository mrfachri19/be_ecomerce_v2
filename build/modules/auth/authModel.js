const connection = require("../../config/mysql");
module.exports = {
  getDataConditions: data => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT *, TIMESTAMPDIFF(MINUTE, NOW(), updatedAt) AS minuteDiff FROM user WHERE ?", data, (error, result) => {
        !error ? resolve(result) : reject(new Error("SQL : " + error.sqlMessage));
      });
    });
  },
  updateDataUser: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE user SET ? WHERE id = ?", [data, id], (error, result) => {
        if (!error) {
          const newResult = {
            id,
            ...data
          };
          resolve(newResult);
        } else {
          reject(new Error("SQL : " + error.sqlMessage));
        }
      });
    });
  },
  register: data => new Promise((resolve, reject) => {
    connection.query("INSERT INTO user SET?", data, (error, result) => {
      if (!error) {
        const newResult = {
          id: result.insertId,
          ...data
        };
        delete newResult.password;
        resolve(newResult);
      } else {
        reject(new Error(`SQL:${error.sqlMessage}`));
      }
    });
  }),
  verifyUser: (data, id) => new Promise((resolve, reject) => {
    connection.query("UPDATE user SET status = ? WHERE id = ?", [data, id], (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(`SQL : ${err.sqlMessage}`));
      }
    });
  }),
  getUserByEmail: email => new Promise((resolve, reject) => {
    connection.query("SELECT * FROM user WHERE email = ?", email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(new Error(`SQL: ${error.sqlMessage}`));
      }
    });
  })
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb25uZWN0aW9uIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXREYXRhQ29uZGl0aW9ucyIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInF1ZXJ5IiwiZXJyb3IiLCJyZXN1bHQiLCJFcnJvciIsInNxbE1lc3NhZ2UiLCJ1cGRhdGVEYXRhVXNlciIsImlkIiwibmV3UmVzdWx0IiwicmVnaXN0ZXIiLCJpbnNlcnRJZCIsInBhc3N3b3JkIiwidmVyaWZ5VXNlciIsImVyciIsImdldFVzZXJCeUVtYWlsIiwiZW1haWwiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9hdXRoL2F1dGhNb2RlbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb25uZWN0aW9uID0gcmVxdWlyZShcIi4uLy4uL2NvbmZpZy9teXNxbFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldERhdGFDb25kaXRpb25zOiAoZGF0YSkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25uZWN0aW9uLnF1ZXJ5KFxuICAgICAgICBcIlNFTEVDVCAqLCBUSU1FU1RBTVBESUZGKE1JTlVURSwgTk9XKCksIHVwZGF0ZWRBdCkgQVMgbWludXRlRGlmZiBGUk9NIHVzZXIgV0hFUkUgP1wiLFxuICAgICAgICBkYXRhLFxuICAgICAgICAoZXJyb3IsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICFlcnJvclxuICAgICAgICAgICAgPyByZXNvbHZlKHJlc3VsdClcbiAgICAgICAgICAgIDogcmVqZWN0KG5ldyBFcnJvcihcIlNRTCA6IFwiICsgZXJyb3Iuc3FsTWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9LFxuICB1cGRhdGVEYXRhVXNlcjogKGRhdGEsIGlkKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbm5lY3Rpb24ucXVlcnkoXG4gICAgICAgIFwiVVBEQVRFIHVzZXIgU0VUID8gV0hFUkUgaWQgPSA/XCIsXG4gICAgICAgIFtkYXRhLCBpZF0sXG4gICAgICAgIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgY29uc3QgbmV3UmVzdWx0ID0ge1xuICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXNvbHZlKG5ld1Jlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJTUUwgOiBcIiArIGVycm9yLnNxbE1lc3NhZ2UpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH0sXG4gIHJlZ2lzdGVyOiAoZGF0YSkgPT5cbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25uZWN0aW9uLnF1ZXJ5KFwiSU5TRVJUIElOVE8gdXNlciBTRVQ/XCIsIGRhdGEsIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICBjb25zdCBuZXdSZXN1bHQgPSB7XG4gICAgICAgICAgICBpZDogcmVzdWx0Lmluc2VydElkLFxuICAgICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGRlbGV0ZSBuZXdSZXN1bHQucGFzc3dvcmQ7XG4gICAgICAgICAgcmVzb2x2ZShuZXdSZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFNRTDoke2Vycm9yLnNxbE1lc3NhZ2V9YCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KSxcbiAgdmVyaWZ5VXNlcjogKGRhdGEsIGlkKSA9PlxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbm5lY3Rpb24ucXVlcnkoXG4gICAgICAgIFwiVVBEQVRFIHVzZXIgU0VUIHN0YXR1cyA9ID8gV0hFUkUgaWQgPSA/XCIsXG4gICAgICAgIFtkYXRhLCBpZF0sXG4gICAgICAgIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFNRTCA6ICR7ZXJyLnNxbE1lc3NhZ2V9YCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KSxcbiAgZ2V0VXNlckJ5RW1haWw6IChlbWFpbCkgPT5cbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25uZWN0aW9uLnF1ZXJ5KFxuICAgICAgICBcIlNFTEVDVCAqIEZST00gdXNlciBXSEVSRSBlbWFpbCA9ID9cIixcbiAgICAgICAgZW1haWwsXG4gICAgICAgIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBTUUw6ICR7ZXJyb3Iuc3FsTWVzc2FnZX1gKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pLFxufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7QUFFaERDLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHO0VBQ2ZDLGlCQUFpQixFQUFHQyxJQUFJLElBQUs7SUFDM0IsT0FBTyxJQUFJQyxPQUFPLENBQUMsQ0FBQ0MsT0FBTyxFQUFFQyxNQUFNLEtBQUs7TUFDdENSLFVBQVUsQ0FBQ1MsS0FBSyxDQUNkLG1GQUFtRixFQUNu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