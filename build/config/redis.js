const redis = require("redis");
require("dotenv").config();
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});
client.on("connect", () => {
  // eslint-disable-next-line no-console
  console.log("You're now connected db redis ...");
});
module.exports = client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZWRpcyIsInJlcXVpcmUiLCJjb25maWciLCJjbGllbnQiLCJjcmVhdGVDbGllbnQiLCJob3N0IiwicHJvY2VzcyIsImVudiIsIlJFRElTX0hPU1QiLCJwb3J0IiwiUkVESVNfUE9SVCIsInBhc3N3b3JkIiwiUkVESVNfUEFTU1dPUkQiLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9yZWRpcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByZWRpcyA9IHJlcXVpcmUoXCJyZWRpc1wiKTtcbnJlcXVpcmUoXCJkb3RlbnZcIikuY29uZmlnKCk7XG5cbmNvbnN0IGNsaWVudCA9IHJlZGlzLmNyZWF0ZUNsaWVudCh7XG4gIGhvc3Q6IHByb2Nlc3MuZW52LlJFRElTX0hPU1QsXG4gIHBvcnQ6IHByb2Nlc3MuZW52LlJFRElTX1BPUlQsXG4gIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5SRURJU19QQVNTV09SRCxcbn0pO1xuXG5jbGllbnQub24oXCJjb25uZWN0XCIsICgpID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgY29uc29sZS5sb2coXCJZb3UncmUgbm93IGNvbm5lY3RlZCBkYiByZWRpcyAuLi5cIik7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGllbnQ7XG4iXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUM5QkEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDQyxNQUFNLENBQUMsQ0FBQztBQUUxQixNQUFNQyxNQUFNLEdBQUdILEtBQUssQ0FBQ0ksWUFBWSxDQUFDO0VBQ2hDQyxJQUFJLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVO0VBQzVCQyxJQUFJLEVBQUVILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRyxVQUFVO0VBQzVCQyxRQUFRLEVBQUVMLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSztBQUN4QixDQUFDLENBQUM7QUFFRlQsTUFBTSxDQUFDVSxFQUFFLENBQUMsU0FBUyxFQUFFLE1BQU07RUFDekI7RUFDQUMsT0FBTyxDQUFDQyxHQUFHLENBQUMsbUNBQW1DLENBQUM7QUFDbEQsQ0FBQyxDQUFDO0FBRUZDLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHZCxNQUFNIn0=