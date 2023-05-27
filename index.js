const mongoose = require("mongoose")
require('dotenv').config();
mongoose.set('strictQuery', true);
const express = require("express")
const nocache = require('nocache');
const mongoSanitize = require('express-mongo-sanitize');
const app = express()




