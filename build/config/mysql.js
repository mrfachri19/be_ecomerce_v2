const mysql = require("mysql2");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
connection.connect(err => {
  if (err) {
    throw err;
  }

  // eslint-disable-next-line no-console
  console.log("You are now connected db mysql...");
});
module.exports = connection;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJteXNxbCIsInJlcXVpcmUiLCJjb25maWciLCJjb25uZWN0aW9uIiwiY3JlYXRlQ29ubmVjdGlvbiIsImhvc3QiLCJwcm9jZXNzIiwiZW52IiwiREJfSE9TVCIsInVzZXIiLCJEQl9VU0VSIiwicGFzc3dvcmQiLCJEQl9QQVNTV09SRCIsImRhdGFiYXNlIiwiREJfREFUQUJBU0UiLCJjb25uZWN0IiwiZXJyIiwiY29uc29sZSIsImxvZyIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL215c3FsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG15c3FsID0gcmVxdWlyZShcIm15c3FsMlwiKTtcbnJlcXVpcmUoXCJkb3RlbnZcIikuY29uZmlnKCk7XG5cbmNvbnN0IGNvbm5lY3Rpb24gPSBteXNxbC5jcmVhdGVDb25uZWN0aW9uKHtcbiAgaG9zdDogcHJvY2Vzcy5lbnYuREJfSE9TVCxcbiAgdXNlcjogcHJvY2Vzcy5lbnYuREJfVVNFUixcbiAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LkRCX1BBU1NXT1JELFxuICBkYXRhYmFzZTogcHJvY2Vzcy5lbnYuREJfREFUQUJBU0UsXG59KTtcblxuY29ubmVjdGlvbi5jb25uZWN0KChlcnIpID0+IHtcbiAgaWYgKGVycikge1xuICAgIHRocm93IGVycjtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUubG9nKFwiWW91IGFyZSBub3cgY29ubmVjdGVkIGRiIG15c3FsLi4uXCIpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gY29ubmVjdGlvbjtcbiJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQy9CQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUNDLE1BQU0sQ0FBQyxDQUFDO0FBRTFCLE1BQU1DLFVBQVUsR0FBR0gsS0FBSyxDQUFDSSxnQkFBZ0IsQ0FBQztFQUN4Q0MsSUFBSSxFQUFFQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsT0FBTztFQUN6QkMsSUFBSSxFQUFFSCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0csT0FBTztFQUN6QkMsUUFBUSxFQUFFTCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0ssV0FBVztFQUNqQ0MsUUFBUSxFQUFFUCxPQUFPLENBQUNDLEdBQUcsQ0FBQ087QUFDeEIsQ0FBQyxDQUFDO0FBRUZYLFVBQVUsQ0FBQ1ksT0FBTyxDQUFFQyxHQUFHLElBQUs7RUFDMUIsSUFBSUEsR0FBRyxFQUFFO0lBQ1AsTUFBTUEsR0FBRztFQUNYOztFQUVBO0VBQ0FDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1DQUFtQyxDQUFDO0FBQ2xELENBQUMsQ0FBQztBQUVGQyxNQUFNLENBQUNDLE9BQU8sR0FBR2pCLFVBQVUifQ==