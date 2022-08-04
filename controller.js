const model = require('./model.js');

module.exports = {
  getReviews: function(req,res){
   // console.log(req.query);
   const product_id = Number(req.query.product_id);
   const page = Number(req.query.page) || 1;
   const count = Number(req.query.count) || 5;
   const sort = req.query.sort ||"newest";
   model.get({page,count,sort,product_id},(err,data)=>{
    if(err){
      res.status(404).send("Error during get reviews request");
    }
    else{
      //console.log(data);
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
        res.json(data);
      }
    });
  },

  putHelpful: function(req,res){
   // console.log("postHelpful",req.params);
    model.putHelpful(req.params.review_id,(err)=>{
      if(err){
        res.status(400).send('Error during post request for helpfulness');
      }
      else{
        res.status(204).send("Successfully update helpfulness");
        //res.sendStatus(204);
      }
    })
  },

  putReport: function(req,res){
    // if (req.params.review_id === undefined || typeof reviewId !== 'number') {
    //   //     res.status(400).send('Invalid review_id input');
    //   //   }
    model.putReport(req.params.review_id,(err)=>{
      if(err){
        res.status(400).send('Err during post reported request');
      }
      else{
        res.sendStatus(204);
      }
    })
  },

  addReview: function(req,res){
    model.postReview(req)
    .then(()=>
    {
      res.sendStatus(201)})
   // res.status(201).send("Successfully")})
   //res.status(200).end();
    .catch(()=>{
      res.status(500).send("Err")});
  }

};