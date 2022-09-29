'use strict';

const { users } = require('../models');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { _authError(); }

  try {


    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateBearer(token);
    if (validUser){
      req.user = validUser;
      req.token = validUser.token;
      next();
    }

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
};
