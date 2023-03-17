const request = require("supertest");
const connection = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

//const users = require('../db/data/test-data/users');

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

describe("api/topics", () => {
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
            })
          );
        });
      });
  });
});

describe("api/articles", () => {
  it("GET / will respond with status 200 and a article arrays", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        let articles = response.body.article;

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
            })
          );
        });
      });
  });
});

describe("api/articles/:articleId", () => {
  it("GET /:article_id to return 200 and an object containing article key and an array of article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        let articles = response.body.article;

        expect(articles).toBeInstanceOf(Object);
        expect(articles.length).toBe(1);

        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: 1,
              author: "butter_bridge",
              title: "Living in the shadow of a great man",
              topic: "mitch",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 100,
              comment_count: 11,
              body: "I find this existence challenging",
            })
          );
        });
      });
  });

  test("Response 400 and appropriate message if article_id is not a number", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Bad Request");
      });
  });

  

});

describe("api/articles/:articleId/comments", () => {
  it("GET /:article_id with comments for that id  return 200 and an object containing article key, an array of article with comments", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        let articles = response.body.comment;

        expect(articles).toBeInstanceOf(Array);
        expect(articles.length).toBe(11);

        articles.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              comment_id: expect.any(Number),
              body: expect.any(String),
              author: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
      });
  });

  test("Response 400 and appropriate message if article_id is not a number", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Bad Request");
      });
  });

  test("Response 404 and appropriate message if article_id is a number but article does not exist", () => {
    return request(app)
      .get("/api/articles/10000/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("Not Found");
      });
  });

  //   test('Response 200 empty array for an article that exists but has no comments', () => {
  //     return request(app)
  //         .get('/api/articles/2/comments')
  //         .expect(200)
  //         .then(({ body }) => {
  //             expect(body.comments).toEqual([])
  //         })

  // })
});

describe("POST /api/articles/:article_id/comments", () => {
  it("Response 201 and returns newly inserted comment in an object with key of comment", () => {
    const newComment = {
      username: `butter_bridge`,
      body: `Posting a new comment`,
    };
    return request(app)
      .post("/api/articles/2/comments")
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
        });
      });
  });

  it("POST: 400 - responds with an error when given an invalid ID", () => {
    return request(app)
      .post("/api/articles/abc/comments")
      .send({ body: "new comment", username: "butter_bridge" })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toEqual("Bad Request");
      });
  });
  it("POST: 400 - responds with an error when given a body missing a property", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "butter_bridge" })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toEqual("Bad Request");
      });
  });
  it("POST: 404 - responds with an error when the username does not exist", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ body: "New comment", username: "mahmud" })
      .expect(404)
      .then((res) => {
        expect(res.body.message).toEqual("Not Found");
      });
  });

  it("Response 400 and appropriate message if article_id is not a number", () => {
    return request(app)
      .get("/api/articles/banana/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Bad Request");
      });
  });
});

describe("PATCH requests", () => {
  it("PATCH 200 - responds with an object containing the updated article (article 1))", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 100 })

      .expect(200)

      .then(({ body }) => {
        expect(body.article[0]).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            title: expect.any(String),
            topic: expect.any(String),
            votes: expect.any(Number),
          })
        );
        expect(body.article[0].votes).toEqual(200);
      });
  });

  it("PATCH 200 - responds with an object containing the updated article (article 2))", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: -10 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article[0]).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            title: expect.any(String),
            topic: expect.any(String),
            votes: expect.any(Number),
          })
        );
        expect(body.article[0].votes).toEqual(-10);
      });
  });

  it("PATCH 400 - responds with bad request when the vote change is not a number", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "ten" })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad Request");
      });
  });

  it("PATCH 404 - responds with not found when the article id is valid but not present", () => {
    return request(app)
      .patch("/api/articles/1020")
      .send({ inc_votes: 100 })
      .expect(200);
  });

  it("PATCH 400 - responds with bad request when the object in the body is badly formatted", () => {
    return request(app)
      .patch("/api/articles/3")
      .send({ cni_steov: 100 })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });

  it("PATCH 400 - responds with a bad request when the article id is invalid", () => {
    return request(app)
      .patch("/api/articles/notvalid")
      .send({ inc_votes: 100 })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad Request");
      });
  });
});

describe("api/users", () => {
  it("GET / will respond with status 200 and a users array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        const users = response.body.user;

        expect(users).toBeInstanceOf(Array);

        expect(users.length).toBe(4);

        users.forEach((users) => {
          expect(users).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});



describe("/api/comments/:comment_id", () => {
  describe("DELETE", () => {
    test("status(204), responds with an empty response body", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });
   
    
  });
});

/