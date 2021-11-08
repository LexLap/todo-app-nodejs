const express = require('express');
const cors = require('cors');
require('./db/mongoose');


const port = process.env.PORT;
const tasksRouter = require('./routers/tasksRouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use(tasksRouter);

app.listen(port, () => console.log("Server connected, port:", port));