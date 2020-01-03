module.exports = function(req, res, next) {
  if (req.method === "POST" && req.originalUrl === "/api/uaa/oauth/token") {
    return res.jsonp({
      id: "1",
      access_token: "6c788b63-f5c6-43d5-beb7-4e85d6692cf8",
      token_type: "bearer",
      refresh_token: "63c35a9b-cf85-4907-be94-2a053dc4c4ce",
      expires_in: 40484,
      scope: "ui"
    });
  }
  next();
};
