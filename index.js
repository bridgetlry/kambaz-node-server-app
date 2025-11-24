import "dotenv/config";
import session from "express-session";
import express from 'express'
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js"
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import cors from "cors"
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import mongoose from "mongoose";
const app = express();
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb+srv://bridgetlry:gotasecret@kambaz.tw0ek8t.mongodb.net/"
mongoose.connect(CONNECTION_STRING);

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
}
));
// app.set('trust proxy',1);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));
app.use(express.json());


Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
app.listen(process.env.PORT || 4000);