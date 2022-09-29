'use strict';

// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const foodModel = (sequelize, DataTypes) => sequelize.define('Food', {
  name: { type: DataTypes.STRING, required: true },
  calories: { type: DataTypes.INTEGER, required: true },
  type: { type: DataTypes.ENUM('fruit', 'vegetable', 'protein'), required: true },
  // });

  role: { type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'), required: true, defaultValue: 'user' },
  token: {
    type: DataTypes.VIRTUAL,
    get() {
      return jwt.sign({ username: this.username }, SECRET);
    },
    set(tokenObj) {
      let token = jwt.sign(tokenObj, SECRET);
      return token;
    },
  },
  capabilities: {
    type: DataTypes.VIRTUAL,
    get() {
      const acl = {
        user: ['read'],
        writer: ['read', 'create'],
        editor: ['read', 'create', 'update'],
        admin: ['read', 'create', 'update', 'delete'],
      };
      return acl[this.role];
    },
  },
});


module.exports = foodModel;
