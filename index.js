const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const helmet = require("helmet");
const dotenv = require("dotenv");
const dramaRoute = require("./routes/drama");
const episodeRoute = require("./routes/episode");
const scheduleRoute = require("./routes/schedule");
const initStartRoute = require("./routes/initStart");
const settingRoute = require("./routes/setting");
const syncFilesRoute = require("./routes/syncFiles");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const testRoute = require("./routes/test");

dotenv.config();
//CONNECT DATABASE
// mongoose.connect((process.env.MONGODB_URL), () => {
//   console.log("Connected to MongoDB");
// });

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL,)
        .then(()=>console.log('Connected database'))
        .catch(e=>console.log(e));

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
// app.use(helmet());
app.use(cors());
app.use(morgan("common"));

//ROUTES
app.use("/v1/d", dramaRoute);
app.use("/v1/e", episodeRoute);
app.use("/v1/s", scheduleRoute);
app.use("/v1/initstart", initStartRoute);
app.use("/v1/settings", settingRoute);
app.use("/v1/syncFiles", syncFilesRoute);
app.use("/v1/register", registerRoute);
app.use("/v1/login", loginRoute);
app.use("/v1/test", testRoute);

app.listen((process.env.PORT), () => {
  console.log("Server is running... ");
});