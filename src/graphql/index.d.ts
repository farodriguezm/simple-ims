type Ping = {
  message: string;
  time: string;
};

type Message = {
  content: string;
  result: boolean;
};

type IdInput = {
  id: string;
};

type User = {
  id: string;
  fistName: string;
  lastName: string;
  name: string;
  password: string;
  createdAt: ?Date;
  updatedAt: ?Date;
};

type Category = {
  id: string;
  name: string;
  description: ?string;
  products: ?Product[];
  createdAt: ?Date;
  updatedAt: ?Date;
};

type Product = {
  id: string;
  code: string;
  name: string;
  description: ?string;
  image: ?string;
  stock: int;
  price: number;
  category: ?Category;
  createdAt: ?Date;
  updatedAt: ?Date;
};

type UserInput = {
  fistName: string;
  lastName: string;
  name: string;
  password: string;
};

type UserUpdateInput = {
  id: string;
  fistName: string;
  lastName: string;
  name: string;
  password: string;
};

type CategoryInput = {
  name: string;
  description: ?string;
};

type CategoryUpdateInput = {
  id: string;
  name: string;
  description: ?string;
};

type ProductInput = {
  code: string;
  name: string;
  description: ?string;
  image: ?string;
  stock: ?int;
  price: number;
  categoryId: string;
};

type ProductUpdateInput = {
  id: string;
  code: string;
  name: string;
  description: ?string;
  image: ?string;
  stock: ?int;
  price: number;
  categoryId: string;
};
