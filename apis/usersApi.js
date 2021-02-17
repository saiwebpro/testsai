const exp = require("express");
const userRouterObj = exp.Router();

userRouterObj.use(exp.json());


//register
userRouterObj.post("/register", (req, res, next) => {
  console.log("user object is ", req.body);

  //compare mobile number and course  already selected
  let userscollection = req.app.get("userscollection");
  userscollection.findOne(
    { phone: req.body.phone }).toArray((err, userObjArray) => {
      console.log("userobj is ", userObjArray);
      //if err is occurred
      if (err) {
        console.log(err);
      }

      //if user obj is existed
      if (userObjArray.length !== 0) {

        console.log(req.body.coursetitle, " ", userObj.coursetitle)
        //compare course title
        if (userObj.coursetitle === req.body.coursetitle) {

          //if phoneno and coursetitle are matched
          res.send({
            status: "failed",
            message: `Course ${req.body.coursetitle} is already taken by ${req.body.phone}`,
          });
        }

        //if only phoneno is matched and course title is not matched
        else {
          req.body.currentstatus = "pending";
          req.body.previousstatus = "registered"
          userscollection.insertOne(req.body, (err, success) => {
            if (err) {
              console.log(err);
            } else {
              res.send({
                status: "success",
                message: `Course registration for ${req.body.coursetitle} is completed. We will get back you soon`,
              });
            }
          });
        }
      }
      else {
        req.body.currentstatus = "pending";
        req.body.previousstatus = "registered"
        userscollection.insertOne(req.body, (err, success) => {
          if (err) {
            console.log(err);
          } else {
            res.send({
              status: "success",
              message: `Course registration for ${req.body.coursetitle} is completed. We will get back you soon`,
            });
          }
        });
      }
    })




});




module.exports = userRouterObj;