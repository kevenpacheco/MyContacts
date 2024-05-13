class ContactMapper {
  toPersistence(contactDomain) {
    return {
      name: contactDomain.name,
      email: contactDomain.email,
      phone: contactDomain.phone,
      category_id: contactDomain.categoryId,
    };
  }

  toDomain(contactPersistence) {
    return {
      id: contactPersistence.id,
      name: contactPersistence.name,
      email: contactPersistence.email,
      phone: contactPersistence.phone,
      category: {
        id: contactPersistence.category_id,
        name: contactPersistence.category_name,
      },
    };
  }
}

export default new ContactMapper();
