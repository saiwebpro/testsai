const exp = require("express");
const adminRouterObj = exp.Router();
const jwt = require("jsonwebtoken");
var ObjectId = require("mongodb").ObjectID;

//body parser middleware
adminRouterObj.use(exp.json());
//adminRouterObj.use(exp.urlencoded());



//routes
adminRouterObj.post("/login", (req, res, next) => {
  console.log("username is ", req.body.username)
  if (req.body.username !== "rajesh.t7982") {
    res.send({ message: "Invalid username" });
  } else if (req.body.password !== "Razesh&1979") {
    res.send({ message: "Invalid password" });
  } else {
    //create jwt
    jwt.sign(
      { username: "rajesh.t7982@gmail.com" },
      "mywebsite",
      { expiresIn: "1h" },
      (err, jwt) => {
        if (err) {
          console.log(err);
          res.send({ message: "something went worng...plz try again" });
        } else {
          res.send({ message: "login-success", jwt: jwt });
        }
      }
    );
  }
});

//post article
adminRouterObj.post("/postarticle", (req, res, next) => {
  console.log("artile is ", req.body);
  let articleObj = {
    nameOfArticle: "abc",
  };
  let admincollectionObj = req.app.locals.admincollectionObj;
  admincollectionObj.insertOne(req.body, (err, suucess) => {
    if (err) {
      next(err);
    } else {
      res.send({ message: "article posted successfully" });
    }
  });
});

//get articles, this will have links to articles only
adminRouterObj.get("/viewarticles", (req, res, next) => {

});



adminRouterObj.put("updatearticle", (req, res, next) => { });



//save notifications
adminRouterObj.post("/savenotification", (req, res, next) => {
  let notificationscollection = req.app.get("notificationscollection");
  console.log("noto is ", req.body)
  notificationscollection.insertOne(req.body, (err, success) => {
    if (err) {
      console.log(err);
      next(err);
    }
    else {
      //read all notifications and send back to sclient
      notificationscollection.find().toArray((err, notifications) => {
        if (err) {
          console.log(err);
        }
        else {
          res.send({ message: notifications })
        }
      })
    }
  })

})

//delete notifications
adminRouterObj.delete("/removenotification/:_id", (req, res, next) => {

  console.log("param is ", req.params._id)
  let notificationscollection = req.app.get("notificationscollection");
  objid = ObjectId(req.params._id)

  console.log("obj id is ", objid)
  notificationscollection.deleteOne({ _id: objid }, (err, success) => {

    if (err) {
      console.log(err);
      next(err);
    }
    else {
      //read all notifications and send back to sclient
      notificationscollection.find().toArray((err, notifications) => {
        if (err) {
          console.log(err);
        }
        else {
          res.send({ message: notifications })
        }
      })
    }
  })
})

adminRouterObj.get("/getnotifications", (req, res, next) => {
  let notificationscollection = req.app.get("notificationscollection");

  notificationscollection.find().toArray((err, notifications) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send({ message: notifications })
    }
  })

})










adminRouterObj.get("/registeredusers", (req, res, next) => {
  let userscollection = req.app.get("userscollection");

  userscollection.find().toArray((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.send(users);
    }
  });
});



adminRouterObj.put("/updateuserstatus", (req, res, next) => {
  console.log("new status is  ", req.body.status);
  //convert id to objectid
  let objid = new ObjectId(req.body._id);
  //console.log("string id is ",req.body._id)
  //console.log("obj is ",objid);
  let userscollection = req.app.get("userscollection");

  userscollection.findOne({ _id: objid }, (err, userObj) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log("before modify ", userObj);

      //  userObj.newstatus=req.body.status;
      //console.log("after updating status ",userObj);
      userscollection.findOneAndUpdate({ _id: objid }, {
        $set: {
          firstname: userObj.firstname,
          lastname: userObj.lastname,
          email: userObj.email,
          phone: userObj.phone,
          coursetitle: userObj.coursetitle,
          previousstatus: userObj.currentstatus,
          currentstatus: req.body.currentstatus
        }
      },
        { returnOriginal: false }, (err, success) => {
          if (err) {
            console.log(err)
          }
          else {
            //  console.log("user obj after update is ",success.value);
            res.send({ message: success.value })
          }
        })
    }
  })

})
module.exports = adminRouterObj;
