class CategoryMapper {
  toDomain(contactDomain) {
    return {
      id: contactDomain.id,
      name: contactDomain.name,
    };
  }

  toPersistence() {
    return {
    };
  }
}

export default new CategoryMapper();
