import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as dotenv from 'dotenv';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './../src/post/post.entity';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let postRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    postRepository = moduleFixture.get(getRepositoryToken(Post));
  });

  afterEach(async () => {
    await postRepository.clear();
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect([]);
  });

  it('/posts (GET) w/existing', async () => {
    const newPost = await postRepository.save({
      title: 'New Post',
      content: 'This is a new post',
      user_id: 2,
    });
  
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect([newPost]);
  });

  it('/posts (POST)', () => {
    const newPost = {
      title: 'Test Post',
      content: 'This is a test post',
      user_id: 1,
    };

    return request(app.getHttpServer())
      .post('/posts')
      .send(newPost)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject(newPost);
        expect(res.body.id).toBeDefined();
      });
  });

  it('/posts/:id (GET)', async () => {
    const newPost = await postRepository.save({
      title: 'Test Post',
      content: 'This is a test post',
      user_id: 1,
    });

    return request(app.getHttpServer())
      .get(`/posts/${newPost.id}`)
      .expect(200)
      .expect(newPost);
  });

  it('/posts/:id (PUT)', async () => {
    const newPost = await postRepository.save({
      title: 'Test Post',
      content: 'This is a test post',
      user_id: 1,
    });

    const updatedPost = {
      title: 'Updated Test Post',
      content: 'This is an updated test post',
      user_id: 2,
    };

    return request(app.getHttpServer())
      .put(`/posts/${newPost.id}`)
      .send(updatedPost)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject(updatedPost);
        expect(res.body.id).toBe(newPost.id);
      });
  });

  it('/posts/:id (DELETE)', async () => {
    const newPost = await postRepository.save({
      title: 'Test Post',
      content: 'This is a test post',
      user_id: 1,
    });

    await request(app.getHttpServer())
      .delete(`/posts/${newPost.id}`)
      .expect(204);

    await request(app.getHttpServer())
      .get(`/posts/${newPost.id}`)
      .expect(404);

    return request(app.getHttpServer())
      .delete(`/posts/${newPost.id}`)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });



});