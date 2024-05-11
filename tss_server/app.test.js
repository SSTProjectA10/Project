const axios = require('axios'); 
const app = require('./app'); 
const { Elev } = require('./db'); 

// TODO: GPT tot, nu am scris o litera de mana si nici cu stiu ce face aicea

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
        mediaGenerala: "sss",
        ID: 21
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
        mediaGenerala: 'invalid_mediaGenerala',
        ID: id
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
