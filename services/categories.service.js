const faker = require("faker");

class categoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        image: faker.image.imageUrl()
      });
    }
  }

  create(data) {
    const newCategoria = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.categories.push(newCategoria);
    return newCategoria;
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find((item) => item.id === id);
  }

  update(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error("product nor found");
    }

    const categoria = this.categories[index];
    this.categories[index] = {
      ...categoria,
      ...changes
    };

    return this.categories[index];
  }

  delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error("product nor found");
    }

    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = categoriesService;
