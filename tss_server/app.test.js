const axios = require('axios'); 
const app = require('./app'); 
const { Elev } = require('./db'); 

// TODO: combinat GPT initial si modificat de mana multele probleme
const path = `http://localhost:4000/`

jest.mock('./db', () => ({
  Elev: {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndDelete: jest.fn(),
    insertOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    drop: jest.fn(),
    insertMany: jest.fn()
  }
}));

describe('Suita manuala', () => {
  describe('GET /:id', () => {
    test('returneaza obiectul cu ID-ul scris', async () => {
      const id = 8;
      const document = { 
        nume: "Popescu",
        prenume: "Ioana",
        dataNasterii: "2004-04-12",
        clasa: "11A",
        email: "ioana.popescu@example.com",
        mediaGenerala: 9.8,
        ID: id
      };
      Elev.findOne.mockResolvedValue(document);
      const response = await axios.get(`${path}${id}`);
      expect(response.status).toBe(200);
      expect(response.data).toEqual(document);
    });
  });

  describe('PUT /:idCautatModificare', () => {
    test('update documentul cu acel id', async () => {
      const id = 8;
      const updatedDocument = { 
        nume: "UpdatedName",
        prenume: "UpdatedFirstName",
        dataNasterii: "2004-04-12",
        clasa: "11B",
        email: "updated.email@example.com",
        mediaGenerala: 9.9,
        ID: id
      };
      Elev.findOneAndUpdate.mockResolvedValue(updatedDocument);
      const response = await axios.put(`${path}${id}`, updatedDocument);
      expect(response.status).toBe(200);
      expect(response.data).toEqual(updatedDocument);
      expect(Elev.findOneAndUpdate).toHaveBeenCalledWith({ ID: id }, { $set: updatedDocument });
    });
  });

  describe('DELETE /:id', () => {
    test('sterge documentul cu acel ID', async () => {
      const id = 8;
      Elev.findOneAndDelete.mockResolvedValue();
      const response = await axios.delete(`${path + id}`);
      expect(response.status).toBe(200);
      expect(Elev.findOneAndDelete).toHaveBeenCalledWith({ ID: id });
    });
  });

  describe('POST /', () => {
    test('adauga cu succes un document nou', async () => {
      const elevData = {
        nume: 'Marcel',
        prenume: 'Marcescu',
        dataNasterii: '2000-01-01',
        clasa: '12A',
        email: 'marcel_marcescu@yahoo.rom',
        mediaGenerala: 9.5,
        ID: 21
      };
      Elev.insertOne.mockResolvedValue(elevData);
      const response = await axios.post(`${path}`, elevData);
      expect(response.status).toBe(200);
      expect(response.data).toEqual(elevData);
      expect(Elev.insertOne).toHaveBeenCalledWith(elevData);
    });

    describe('GET /:id Id gresit', () => {
      test('400 ID negasit', async () => {
        const id = 'invalid_id';
        Elev.findOne.mockResolvedValue(null);
        const response = await axios.get(`${path}${id}`).catch((err) =>{
          expect(err.response.status).toBe(400);
        });
      });
    });
    
    describe('POST / camp lipsa', () => {
      test('400 atribut lipsa', async () => {
        const elevData = {
          prenume: 'Marcescu',
          dataNasterii: '2000-01-01',
          clasa: '12A',
          email: 'marcel_marcescu@yahoo.rom',
          mediaGenerala: 9.5,
          ID: 21
        };
        Elev.insertOne.mockResolvedValue(elevData);
        const response = await axios.post(`${path}`, elevData).catch((err) =>{
          expect(err.response.status).toBe(400);
        });;
      });
    });

    describe('POST atrb gresit', () => {
      test('400 atribut gresit', async () => {
        const elevData = {
          nume: 'Marcel',
          prenume: 'Marcescu',
          dataNasterii: '2004-04-12',
          clasa: '12A',
          email: 'marcel_marcescu@yahoo.rom',
          mediaGenerala: 5,
          ID: "sss"
        };
        Elev.insertOne.mockResolvedValue(elevData);
        const response = await axios.post(`${path}`, elevData).catch((err) =>{
          expect(err.response.status).toBe(400);
        });
      });
    });
    
    describe('PUT /:idCautatModificare ID gresit', () => {
      test('400 id gresit', async () => {
        const id = 'invalid_id';
        const updatedDocument = { 
          nume: "UpdatedName",
          prenume: "UpdatedFirstName",
          dataNasterii: "2004-04-12",
          clasa: "11B",
          email: "updated.email@example.com",
          mediaGenerala: 9.9,
          ID: id
        };
        Elev.findOneAndUpdate.mockResolvedValue(updatedDocument);
        const response = await axios.put(`${path}${id}`, updatedDocument).catch((err) =>{
          expect(err.response.status).toBe(400);
        });
      });
    });

    describe('PUT /:idCautatModificare atrb gresit', () => {
      test('400 atribut gresit', async () => {
        const id = 8;
        const updatedDocument = { 
          nume: "UpdatedName",
          prenume: "UpdatedFirstName",
          dataNasterii: "2004-04-12",
          clasa: "11B",
          email: "updated.email@example.com",
          mediaGenerala: 5,
          ID: "id"
        };
        Elev.findOneAndUpdate.mockResolvedValue(updatedDocument);
        const response = await axios.put(`${path}${id}`, updatedDocument).catch((err) =>{
          expect(err.response.status).toBe(400);
        });
      });
    });

    describe('DELETE /:id cu ID gresit', () => {
      test('400 ID gresit', async () => {
        const id = 'invalid_id';
        Elev.findOneAndDelete.mockResolvedValue(null);
        const response = await axios.delete(`${path}${id}`).catch((err) =>{
          expect(err.response.status).toBe(400);
        });
      });
    });
  });
});
describe('Suita AI', () => {
  // Before each test, reset the database and populate with example data
  beforeEach(async () => {
    await Elev.deleteMany({});
    const { elevi } = require('./exampleElevs');
    await Elev.insertMany(elevi);
  });

  // Test case for retrieving all students
  it('GET / should return all students', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test case for retrieving a single student by ID
  it('GET /:id should return a single student by ID', async () => {
    const studentId = 21; // Choose an existing student ID
    const response = await request(app).get(`/${studentId}`);
    expect(response.status).toBe(200);
    expect(response.body.ID).toBe(studentId);
  });

  // Test case for adding a new student
  it('POST / should add a new student', async () => {
    const newStudent = {
      nume: 'John',
      prenume: 'Doe',
      dataNasterii: '2000-01-01',
      clasa: '12A',
      email: 'john.doe@example.com',
      mediaGenerala: 9.5
    };
    const response = await request(app).post('/').send(newStudent);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(newStudent);
  });

  // Test case for updating an existing student
  it('PUT /:id should update an existing student', async () => {
    const studentId = 21; // Choose an existing student ID
    const updatedStudent = {
      nume: 'Updated Name',
      prenume: 'Updated Surname',
      dataNasterii: '1999-01-01',
      clasa: '11B',
      email: 'updated.email@example.com',
      mediaGenerala: 8.8
    };
    const response = await request(app).put(`/${studentId}`).send(updatedStudent);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedStudent);
  });

  // Test case for deleting a student
  it('DELETE /:id should delete an existing student', async () => {
    const studentId = 21; // Choose an existing student ID
    const response = await request(app).delete(`/${studentId}`);
    expect(response.status).toBe(200);
    expect(response.body.ID).toBe(studentId);
  }); 
});