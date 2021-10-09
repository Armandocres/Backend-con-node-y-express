const faker = require("faker");
const boom = require("@hapi/boom");

class usersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        gender: faker.name.gender(),
        userBlock: faker.datatype.boolean()
      });
    }
  }

  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw boom.notFound("Product not found");
    }

    if (user.userBlock) {
      throw boom.conflict("Usuario block");
    }

    return user;
  }

  update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound("Product not found");
    }

    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };

    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound("Product not found");
    }

    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = usersService;
