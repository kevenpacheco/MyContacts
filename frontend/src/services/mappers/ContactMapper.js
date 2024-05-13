class ContactMapper {
  toPersistence(contactDomain) {
    return {
      name: contactDomain.name,
      email: contactDomain.email,
      phone: contactDomain.phone,
      category_id: contactDomain.categoryId,
    };
  }
}

export default new ContactMapper();
