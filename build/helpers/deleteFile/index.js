const fs = require("fs");
const deleteFile = filePath => new Promise((resolve, reject) => {
  console.log("PROSES DELETE", filePath);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, err => {
      if (err) reject(new Error("Error delete file"));
      resolve();
    });
  }
});
module.exports = deleteFile;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJkZWxldGVGaWxlIiwiZmlsZVBhdGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNvbnNvbGUiLCJsb2ciLCJleGlzdHNTeW5jIiwidW5saW5rIiwiZXJyIiwiRXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvZGVsZXRlRmlsZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuY29uc3QgZGVsZXRlRmlsZSA9IChmaWxlUGF0aCkgPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiUFJPU0VTIERFTEVURVwiLCBmaWxlUGF0aCk7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICBmcy51bmxpbmsoZmlsZVBhdGgsIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikgcmVqZWN0KG5ldyBFcnJvcihcIkVycm9yIGRlbGV0ZSBmaWxlXCIpKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWxldGVGaWxlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFFeEIsTUFBTUMsVUFBVSxHQUFJQyxRQUFRLElBQzFCLElBQUlDLE9BQU8sQ0FBQyxDQUFDQyxPQUFPLEVBQUVDLE1BQU0sS0FBSztFQUMvQkMsT0FBTyxDQUFDQyxHQUFHLENBQUMsZUFBZSxFQUFFTCxRQUFRLENBQUM7RUFDdEMsSUFBSUgsRUFBRSxDQUFDUyxVQUFVLENBQUNOLFFBQVEsQ0FBQyxFQUFFO0lBQzNCSCxFQUFFLENBQUNVLE1BQU0sQ0FBQ1AsUUFBUSxFQUFHUSxHQUFHLElBQUs7TUFDM0IsSUFBSUEsR0FBRyxFQUFFTCxNQUFNLENBQUMsSUFBSU0sS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7TUFDL0NQLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDO0VBQ0o7QUFDRixDQUFDLENBQUM7QUFFSlEsTUFBTSxDQUFDQyxPQUFPLEdBQUdaLFVBQVUifQ==