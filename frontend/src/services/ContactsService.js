import ContactMapper from './mappers/ContactMapper';
import { HttpClient } from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listContacts(orderBy, signal) {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy || 'asc'}`, { signal });

    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id, signal) {
    const contact = await this.httpClient.get(`/contacts/${id}`, { signal });

    return ContactMapper.toDomain(contact);
  }

  async createContact(contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.post('/contacts', body);
  }

  async updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.put(`/contacts/${id}`, body);
  }

  async deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
