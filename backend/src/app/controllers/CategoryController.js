const CategoriesRepository = require('../repositories/CategoriesRepository');

class ContactController {
  async index(request, response) {
    const contacts = await CategoriesRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await CategoriesRepository.findById(id);

    if (!contact) {
      response.sendStatus(404);
      return;
    }

    response.json(contact);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      response.status(400).json({ error: 'Name is required' });
      return;
    }

    const contact = await CategoriesRepository.create({ name });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const contactExists = await CategoriesRepository.findById(id);
    if (!contactExists) {
      response.sendStatus(404);
      return;
    }

    if (!name) {
      response.status(400).json({ error: 'Name is required' });
      return;
    }

    const contact = await CategoriesRepository.update(id, { name });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ContactController();
