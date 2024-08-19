import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get(getRepositoryToken(User));
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([]);
  });

  it('/users (GET) w/existing', async () => {
    const newUser = await userRepository.save({
        name: 'Ron Smith',
        email: 'ron@example.com',
      });
  
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([newUser]);
  });

  it('/users (POST)', () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject(newUser);
        expect(res.body.id).toBeDefined();
      });
  });

  it('/users/:id (GET)', async () => {
    const newUser = await userRepository.save({
      name: 'Jane Doe',
      email: 'jane@example.com',
    });

    return request(app.getHttpServer())
      .get(`/users/${newUser.id}`)
      .expect(200)
      .expect(newUser);
  });

  it('/users/:id (PUT)', async () => {
    const newUser = await userRepository.save({
      name: 'Alice',
      email: 'alice@example.com',
    });

    const updatedUser = {
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
    };

    return request(app.getHttpServer())
      .put(`/users/${newUser.id}`)
      .send(updatedUser)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject(updatedUser);
        expect(res.body.id).toBe(newUser.id);
      });
  });

  it('/users/:id (DELETE)', async () => {
    const newUser = await userRepository.save({
      name: 'Bob',
      email: 'bob@example.com',
    });

    await request(app.getHttpServer())
      .delete(`/users/${newUser.id}`)
      .expect(204);

    await request(app.getHttpServer())
      .get(`/users/${newUser.id}`)
      .expect(404);

    return request(app.getHttpServer())
      .delete(`/users/${newUser.id}`)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
