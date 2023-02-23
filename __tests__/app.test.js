

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

    describe('api/articles/:articleId', () => {

    it('GET /:article_id to return 200 and an object containing article key and an array of article', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response) => {

          let articles = response.body.article

          expect(articles).toBeInstanceOf(Object);
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


test('Response 400 and appropriate message if article_id is a number but article does not exist', () => {
  return request(app)
      .get('/api/articles/10000000')
      .expect(400)
      .then(({ body }) => {
          expect(body.message).toEqual('Bad Request')
      })
})

test('Response 400 and appropriate message if article_id is not a number', () => {
  return request(app)
      .get('/api/articles/banana')
      .expect(400)
      .then(({ body }) => {
          expect(body.message).toEqual('Bad Request')
      })
})
  })

  

  describe('api/articles/:articleId/comments', () => {

    it('GET /:article_id with comments for that id  return 200 and an object containing article key, an array of article with comments', () => {
      
      return request(app)
        .get('/api/articles/1/comments')
          .expect(200)
            .then((response) => {

      let articles = response.body.comment


          expect(articles).toBeInstanceOf(Array);
          expect(articles.length).toBe(11);
         
          articles.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
              
                article_id: expect.any(Number),
                comment_id: expect.any(Number),
body:expect.any(String),
                author: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number)
              }))
            })
            
            })
          })

          test('Response 400 and appropriate message if article_id is a number but article does not exist', () => {
            return request(app)
                .get('/api/articles/10000000')
                .expect(400)
                .then(({ body }) => {
                    expect(body.message).toEqual('Bad Request')
                })
          })
          
          test('Response 400 and appropriate message if article_id is not a number', () => {
            return request(app)
                .get('/api/articles/banana')
                .expect(400)
                .then(({ body }) => {
                    expect(body.message).toEqual('Bad Request')
                })
          })
          
        
  })

  

  describe('POST /api/articles/:article_id/comments', () => {
    it.only('Response 201 and returns newly inserted comment in an object with key of comment', () => {
        const newComment = {
            username: `butter_bridge`,
            body: `Posting a new comment`
        }
        return request(app)
            .post('/api/articles/2/comments')
            .send(newComment)
            .expect(201)
            .then(({ body }) => {
                expect(body.comment[0]).toEqual({
                    article_id: 2,
                    author: "butter_bridge",
                    body: "Posting a new comment",
                    comment_id: 19,
                    created_at: expect.any(String),
                    votes: 0,
                })
            })
    })

    it('should respond with a status 400 Bad request', ()=>{
      return request(app)
      .post('/api/articles/15/comments')
      .send({username: 'butter_bridge', body: 'Posting a new comment'})
      .expect(400)
      .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
      })
    })
  
    it('Response 400 and appropriate message if article_id is a number but article does not exist', () => {
      return request(app)
          .get('/api/articles/10000000')
          .expect(400)
          .then(({ body }) => {
              expect(body.msg).toEqual('Bad Request')
          })
    })

    it('200: GET - responds with server ok message', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
          console.log(response.body, 'RESPONSE BODY');
          expect(response.body.msg).toBe('Server is OK');
        });
    });

})

describe('POST /api/articles', () => {
  const newArticle = {
      title: "testArticle",
      topic: "mitch",
      author: "butter_bridge",
      body: "Lorem ipsum dolor sit amet",
  }
  test('Response 200', () => {
      return request(app)
          .post('/api/articles')
          .send(newArticle)
          .expect(201)
          .then(({ body }) => {
              expect(body.article).toEqual(
                  {
                      article_id: expect.any(Number),
                      votes: 0,
                      created_at: expect.any(String),
                      title: "testArticle",
                      topic: "mitch",
                      author: "butter_bridge",
                      body: "Lorem ipsum dolor sit amet",
                      comment_count: "0"
                  })
          });
  })
})