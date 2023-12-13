
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

const createSystemAdmin = require('./components/systemAdmin');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter')
const {userLogin} = require('./components/accountsUser');
const {openAPI} = require('./components/authenticationMiddleware');

const connectionURL = 'mongodb://localhost:27017/ecommerce';
mongoose.connect(connectionURL, {useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection

db.on('error', (error) => {
    console.log(`Error occured while connecting to database ${error}`);
});
db.once('open', () => {
    console.log("Successfully connected to database !!!");
});

app.use(express.json());

/*Creating super admin user for managing application and
Debug user for debugging purposed*/
createSystemAdmin();

app.use('/api/login', openAPI, userLogin);
app.use('/api/account/', userRouter);
app.use('/api/product/', productRouter);


const HOST_NAME ='localhost';
const PORT_NUMBER = '9090';
app.listen(PORT_NUMBER, () => {
    console.log("Listening on port 9090 !!!");
});