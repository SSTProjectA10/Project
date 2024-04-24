const axios = require('axios'); 
const app = require('./app'); 
const { Elev } = require('./db'); 

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

describe('GET /:id', () => {
  test('should return document with the specified ID', async () => {
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
    const response = await axios.get(`http://localhost:4000/${id}`);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(document);
    expect(Elev.findOne).toHaveBeenCalledWith({ ID: id });
  });
});

describe('PUT /:idCautatModificare', () => {
  test('should update document with the specified ID', async () => {
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
    const response = await axios.put(`http://localhost:4000/${id}`, updatedDocument);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(updatedDocument);
    expect(Elev.findOneAndUpdate).toHaveBeenCalledWith({ ID: id }, { $set: updatedDocument });
  });
});

describe('DELETE /:id', () => {
  test('should delete document with the specified ID', async () => {
    const id = 8;
    Elev.findOneAndDelete.mockResolvedValue();
    const response = await axios.delete(`http://localhost:4000/${id}`);
    expect(response.status).toBe(200);
    expect(Elev.findOneAndDelete).toHaveBeenCalledWith({ ID: id });
  });
});

describe('POST /', () => {
  test('should add a new document', async () => {
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
    const response = await axios.post('http://localhost:4000/', elevData);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(elevData);
    expect(Elev.insertOne).toHaveBeenCalledWith(elevData);
  });
});
