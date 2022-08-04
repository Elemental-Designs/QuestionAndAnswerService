const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;

describe("GET/reviews", function () {
  it("returns all reviews, limited to 5 per page", async function () {
    const response = await request.get("/reviews").query({product_id:40344});

    expect(response.status).to.eql(200);
    expect(typeof(response.body)).to.eql('object');
    expect(response.body.result.length).to.eql(5);
    const attributes = response.body;
    expect(attributes).to.include.keys("product_id","page","count","result");
   expect(attributes.product_id).to.eql(40344);
   expect(attributes.result[0].rating).to.eql(1);
   expect(attributes.result[0].helpfulness).to.eql(21);
  })
});

describe("POST/reviews", function () {
  it("add a review form", async function () {
    const response = await request
      .post("/reviews")
      .send({
        "product_id": 40344,
        "rating": 5,
        "summary": "These pants are great!",
        "recommend": true,
        "body": "I really like it",
        "name": "json",
        "email": "json@email.com",
        "photos": [],
        "characteristics": {
          "Size": {
            "id": 14,
            "value": 5
          },
          "Width": {
            "id": 14,
            "value": 4
          },
          "Comfort": {
            "id": 16,
            "value": 3
          },
          "Quality": {
            "id": 17,
            "value": 4
          }
        }
      });
      expect(response.status).to.eql(201);
  })

});

describe("PUT/reviews:review_id/report",()=>{
  it("it should update reported to true",async function(){
    const reviewId = 4;
    const response = await request.put(`/reviews/${reviewId}/report`);
    expect(response.status).to.eql(204);
  });
});

