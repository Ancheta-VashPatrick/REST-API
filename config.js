const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "rest-api",
    password: "BurntBlackChicken!69",
    database: "ssl_wiot2",
    connectTimeout: 60000,
  },
  listPerPage: 10,
};
module.exports = config;
