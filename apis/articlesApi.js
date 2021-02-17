const exp = require("express");
const articleRouter = exp.Router();

articleRouter.use(exp.json());

articleRouter.post("/addnew", (req, res, next) => {

    let articlesscollection = req.app.get("articlesscollection");
    articlesscollection.findOne((err, articleObj) => {
        if (err) {
            next(err);
        }
        else {
            //add first  articleobj
            if (articleObj == null) {
                var articles = [];
                articles.push(req.body);

                articlesscollection.insertOne({ articles: articles }, (err, success) => {
                    if (err) {
                        next(err);
                    }
                    else {
                        res.send({ message: "success" })
                    }
                })
            }
            else {
                // update by adding new articleobj
                // articles.push(req.body);
                articlesscollection.updateOne({ _id: articleObj._id }, {
                    $push: {
                        articles: {
                            $each: [req.body],
                            $position: -1
                        }
                    }
                },(err,success)=>{
                    if(err){
                        next(err)
                    }
                    else{
                        res.send({message:"success"})
                    }
                })

            }
        }
    })
})


//read articles
articleRouter.get("/readall", (req, res, next) => {
    console.log("reading articles")
    let articlesscollection = req.app.get("articlesscollection");
    articlesscollection.findOne((err, articles) => {
        if (err) {
            next(err)
        }
        else {
            res.send({ message: articles })
        }
    })

})
module.exports = articleRouter;