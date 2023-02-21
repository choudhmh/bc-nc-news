

const request = require('supertest');
const connection = require('../db/connection');
const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');



beforeEach(() => {
    return seed(data);
  });
  
  afterAll(() => {
    return connection.end();
  });

  
    describe('api/topics', () => {
      it("GET / will respond with status 200 and a topics array", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body: { topics } }) => {
            expect(topics).toBeInstanceOf(Array);
            expect(topics.length).toBe(3);

            topics.forEach((topic) => {
              expect(topic).toEqual(
                expect.objectContaining({
                  slug: expect.any(String),
                  description: expect.any(String),
                }))

            //expect(topics[0]).forEach(["slug", "description"]);
          });
      });
      });
    
    })



    describe('api/articles', () => {
      it("GET / will respond with status 200 and a article arrays", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((response) => {

            let articles = response.body.article

            console.log( articles);

            expect(articles).toBeInstanceOf(Array);
            expect(articles.length).toBe(12);
           
            articles.forEach((article) => {
              expect(article).toEqual(
                expect.objectContaining({
                  author: expect.any(String),
                  title: expect.any(String),
                  article_id: expect.any(Number),
                //body: expect.any(String),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                  article_img_url: expect.any(String),
                  comment_count: expect.any(Number),
                
                }))

          });
      });
      });
    
    })


    // describe('GET /api/articles', () => {
    //   test('Response 200 and returns object with key articles containing array of articles', () => {
    //       return request(app)
    //           .get('/api/articles')
    //           .expect(200)
    //           .then(({ body }) => {
    //               expect(body.articles).toHaveLength(12);
    //               body.articles.forEach(article => {
    //                   expect(article).toEqual(expect.objectContaining({
    //                       article_id: expect.any(Number),
    //                       title: expect.any(String),
    //                       topic: expect.any(String),
    //                       author: expect.any(String),
    //                       body: expect.any(String),
    //                       created_at: expect.any(String),
    //                       votes: expect.any(Number),
    //                       comment_count: expect.any(String)
    //                   }))
    //               })
    //           })
    //   })
    // })
 


   