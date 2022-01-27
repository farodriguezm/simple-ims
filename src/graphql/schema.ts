import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  scalar DateTime

  type Ping {
    message: String!
    time: String!
  }

  type Message {
    content: String!
    result: Boolean!
  }

  input IdInput {
    id: String!
  }

  type User {
    id: String
    fistName: String
    lastName: String
    name: String
    password: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Category {
    id: String
    name: String
    description: String
    products: [Product]
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Product {
    id: String
    code: String
    name: String
    description: String
    image: String
    stock: Int
    price: Float
    category: Category
    createdAt: DateTime
    updatedAt: DateTime
  }

  input UserInput {
    fistName: String!
    lastName: String!
    name: String!
    password: String!
  }

  input UserUpdateInput {
    id: String!
    fistName: String!
    lastName: String!
    name: String!
    password: String!
  }

  input CategoryInput {
    name: String!
    description: String
  }

  input CategoryUpdateInput {
    id: String!
    name: String!
    description: String
  }

  input ProductInput {
    code: String!
    name: String!
    description: String
    image: String
    stock: Int
    price: Float
    categoryId: String!
  }

  input ProductUpdateInput {
    id: String!
    code: String!
    name: String!
    description: String
    image: String
    stock: Int
    price: Float
    categoryId: String!
  }

  type Mutation {
    addUser(input: UserInput!): User!
    updateUser(input: UserUpdateInput!): Message!
    deleteUser(input: IdInput!): Message!
    addCategory(input: CategoryInput!): Category!
    updateCategory(input: CategoryUpdateInput!): Message!
    deleteCategory(input: IdInput!): Message!
    addProduct(input: ProductInput!): Product!
    updateProduct(input: ProductUpdateInput!): Message!
    deleteProduct(input: IdInput!): Message!
  }

  type Query {
    ping: Ping
    getUsers: [User]
    getUser(input: IdInput!): User
    getCategories: [Category]
    getCategory(input: IdInput!): Category
    getProducts: [Product]
    getProduct(input: IdInput!): Product
  }
`;
