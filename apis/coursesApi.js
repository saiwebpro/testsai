const exp = require("express");
const coursesObject = exp.Router();

//body parser
coursesObject.use(exp.json());

//save course object
coursesObject.post("/save", (req, res, next) => {
  console.log("new course obj ",req.body);
 coursesObj={};
  req.body.status="active";
  let newCourseObj=req.body;

  //read all courses object
  let coursescollection = req.app.get("coursescollection");
  coursescollection.findOne((err,coursesObj)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log("course array ",coursesObj.courses);
        //push newcourseobject into courses array of all courses object
        coursesObj.courses.push(newCourseObj);
        console.log("new courses obj is ",coursesObj)
        coursescollection.updateOne({"_id":coursesObj._id},{
          $push:{
            courses:{
              $each:[newCourseObj],
              $position:-1

            }
          }
        },(err,success)=>{
          if(err){

            console.log(err)
          }
          else{
            res.send({message:"New course added successfully"})
          }
        })

      }

  })
  



  // console.log(req.app.get("a"))
  // console.log("courses in api ",req.body);

  // let coursescollection = req.app.get("coursescollection");

  // coursescollection.insertOne(req.body, (err, success) => {
  //   if (err) {
  //     next(err);
  //     console.log(err);
  //   } else {
  //     res.send({ message: "Saved successfully" });
  //   }
  // });
});

coursesObject.get("/readall", (req, res, next) => {
  let coursescollection = req.app.get("coursescollection");
  //read and send courses object
  coursescollection.findOne((err, coursesObject) => {
    if (err) {
      next(err);
      console.log(err);
    } else {
      res.send(coursesObject);
    }
  });
});
module.exports = coursesObject;
