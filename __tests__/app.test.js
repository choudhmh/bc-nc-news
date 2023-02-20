

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
