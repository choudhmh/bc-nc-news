

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

    describe.only('api/articles/:articleId', () => {

    it('GET /:article_id to return 200 and an object containing article key and an array of article', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response) => {

          let articles = response.body.article

          console.log( articles);

          expect(articles).toBeInstanceOf(Array);
          expect(articles.length).toBe(1);
         
          articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                article_id: 1,
                author: 'butter_bridge',
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                created_at: '2020-07-09T20:11:00.000Z',
                votes: 100,
                comment_count: 11
          }))
        });
    });
  })

  })