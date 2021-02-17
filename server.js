const exp = require("express");
const app = exp();
const path = require("path");
const port = process.env.PORT || 8080;
app.use(exp.static(path.join(__dirname, "dist/rajeshapp")));

//import MongoClient
const mc = require("mongodb").MongoClient;

//import admin and user routers
const coursesApi = require("./apis/coursesApi");
const userApi = require("./apis/usersApi");
const adminApi=require("./apis/adminApi");
const articleApi=require("./apis/articlesApi");
const articleRouter = require("./apis/articlesApi");
//if path contains '/user'
app.use("/courses", coursesApi);
app.use("/users", userApi);
app.use("/admin",adminApi);
app.use("/articles",articleRouter);
//if path contains '/admin'
//app.use("/admin", adminApiObj);

//middleware to handle unavailable paths
app.use((req, res, next) => {
  console.log(req.url);
  res.send({ message: `path ${req.url} is not existed` });
});

//get db url from mongo atlas

var dbUrl =
  "mongodb+srv://rajesh:rajesh@cluster0.rjvoz.mongodb.net/rajeshupdatedapp?retryWrites=true&w=majority";

mc.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    //if error regarding db connection
    if (err) {
      console.log("error in db connection ", err);
    }

    //after connecting to db
    else {
      //get database object
      let dbobj = client.db("rajeshupdatedapp");

      //get collection objects
      let coursescollection = dbobj.collection("courses");
      let userscollection = dbobj.collection("users");
      let notificationscollection = dbobj.collection("notifications");
      let articlesscollection = dbobj.collection("articles");
  
      console.log("DB server started..");


      app.set("coursescollection",coursescollection);
      app.set("userscollection",userscollection);
      app.set("notificationscollection",notificationscollection);
      app.set("articlesscollection",articlesscollection);
     

      //assign port number to http server
      app.listen(port, () => {
        console.log(`server running on port ${port}`);
      });
    }
  }
);
