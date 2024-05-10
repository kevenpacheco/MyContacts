import { HttpClient } from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async getContactById(id) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  async createContact(contact) {
    return this.httpClient.post('/contacts', contact);
  }

  async updateContact(id, contact) {
    return this.httpClient.put(`/contacts/${id}`, contact);
  }

  async deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
