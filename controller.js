const model = require('./model.js');

module.exports = {
  getReviews: function(req,res){
   // console.log(req.query);
   const product_id = req.query.product_id;
   const page = req.query.page || 1;
   const count = req.query.count || 5;
   const sort = req.query.sort ||"newest";
   model.get({page,count,sort,product_id},(err,data)=>{
    if(err){
      res.status(404).send("Error during get reviews request");
    }
    else{
      res.json(data);
    }
   });
  },

  getMeta: function(req,res){
    model.getMetaData(req.query.product_id,(err,data)=>{
      if(err){
        res.status(400).send('Error during get metadata');
      }
      else{
        res.json(data);//.send(200);
      }
    });
  },

  // putHelpful: function(req,res){
  //  // console.log("postHelpful",req.params);
  //   model.putHelpful(req.params.review_id,(err)=>{
  //     if(err){
  //       res.status(400).send('Error during post request for helpfulness');
  //     }
  //     else{
  //       res.status(204);
  //     }
  //   })
  // },
  putHelpful: function(req, res){
    const reviewId = parseInt(req.params.review_id, 10);
    if (req.params.review_id === undefined || typeof reviewId !== 'number') {
      res.status(400).send('Invalid review_id input');
    } else {
      model.putHelpful(reviewId, (err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(204).send('updated');
        }
      });
    }
  },

  putReport: function(req, res){
    const reviewId = Number(req.params.review_id);
    if (req.params.review_id === undefined || typeof reviewId !== 'number') {
      res.status(400).send('Invalid review_id input');
    } else {
      model.putReport(reviewId, (err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(204).send('updated');
          }
      })
    }
  },
  // putReport: function(req,res){
  //   model.putReport(req.params.review_id,(err)=>{
  //     if(err){
  //       res.status(400).send('Err during post reported request');
  //     }
  //     else{
  //       res.status(204);
  //     }
  //   })
  // },

  addReview: function(req,res){
    model.postReview(req)
    .then(()=>
    {
      res.sendStatus(201)})
   // res.status(201).send("Successfully")})
    .catch(()=>{
      console.log("test2");
      res.status(400).send("Err")});
  }

};