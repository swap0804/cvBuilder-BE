module.exports = {
  respond(req, res, status, message, data, error) {
    return status
      ? res.json({ status, data, message })
      : res.json({ status, message, data, error });
  },

  respondWithSuccess(req, res, data, message = '') {
    res.status(200);
    return this.respond(req, res, true, message, data);
  },

  respondWithFalseSuccess(req, res, data, message = '') {
    res.status(200);
    return this.respond(req, res, false, message, data);
  },

  respondWithError(req, res, error, sendMail = true) {
    res.status(500);
    return this.respond(req, res, false, error.toString());
  },

  respondWithCustomError(req, res, message, data) {
    res.status(400);
    return this.respond(req, res, false, message.toString(), data);
  },
};
