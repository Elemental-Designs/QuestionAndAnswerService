DROP DATABASE IF EXISTS reviews;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS characteristic_review;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      product_id INT NOT NULL,
      rating INT NOT NULL,
      date BIGINT NOT NULL,
      summary VARCHAR(200) NOT NULL,
      body VARCHAR(1000) NOT NULL,
      recommend BOOLEAN NOT NULL,
      reported BOOLEAN,
      reviewer_name VARCHAR(60) NOT NULL,
      reviewer_email VARCHAR(60) NOT NULL,
      response VARCHAR NOT NULL,
      helpfulness  INT NOT NULL DEFAULT 0
  );

CREATE TABLE  photos(
  id SERIAL PRIMARY KEY,
 review_id INT REFERENCES reviews(id),
  url VARCHAR
);

CREATE TABLE characteristics(
  id SERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR
);

CREATE TABLE characteristic_reviews(
  id SERIAL PRIMARY KEY,
  characteristic_id INT REFERENCES characteristics(id),
  review_id INT REFERENCES reviews(id),
  value  INT
);

---ETL code
COPY reviews FROM '/Users/JadeZhang/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/JadeZhang/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/Users/JadeZhang/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristic_reviews FROM '/Users/JadeZhang/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

--improve query time
-- CREATE INDEX idx_productID on reviews(product_id);
-- CREATE INDEX idx_photosID on photos(review_id);
-- CREATE INDEX idx_charProID on characteristics(product_id);
-- CREATE INDEX idx_charID on characteristic_reviews(characteristic_id);
-- CREATE INDEX idx_charReviewID on characteristic_reviews(review_id);



-- COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
-- FROM '/Users/JadeZhang/Downloads/reviews.csv'
-- DELIMITER ','
-- CSV HEADER;