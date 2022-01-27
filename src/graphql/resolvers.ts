import prisma from "src/utils/prisma";
import bcrypt from "bcryptjs";
import { SALT } from "src/utils/env";

export const resolvers = {
  Query: {
    ping: async (): Promise<Ping> => {
      const response = await prisma.$queryRaw<any[]>`select now() as time`;
      const result = { message: "Simple IMS", time: response[0].time };
      return result;
    },
    getUsers: async () => await prisma.user.findMany(),
    getUser: async (_: any, { input: { id } }: { input: IdInput }) => {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    },
    getCategories: async () => {
      return await prisma.category.findMany({
        include: {
          products: true,
        },
      });
    },
    getCategory: async (_: any, { input: { id } }: { input: IdInput }) => {
      const category = await prisma.category.findUnique({
        where: {
          id,
        },
        include: {
          products: true,
        },
      });
      return category;
    },
    getProducts: async () => {
      return await prisma.product.findMany({
        include: {
          category: true,
        },
      });
    },
    getProduct: async (_: any, { input: { id } }: { input: IdInput }) => {
      return await prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
        },
      });
    },
  },
  Mutation: {
    addUser: async (_: any, { input }: { input: UserInput }) => {
      const hash = await bcrypt.hash(input.password, SALT);
      const user = await prisma.user.create({
        data: {
          ...input,
          password: hash,
        },
      });
      return user;
    },
    updateUser: async (
      _: any,
      { input }: { input: UserUpdateInput }
    ): Promise<Message> => {
      const user = await prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (user) {
        const hash = await bcrypt.hash(input.password, SALT);
        await prisma.user.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
            password: hash,
          },
        });
        return { content: "User updated", result: true };
      }

      return { content: "User not Found", result: false };
    },
    deleteUser: async (
      _: any,
      { input: { id } }: { input: IdInput }
    ): Promise<Message> => {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (user) {
        await prisma.user.delete({
          where: {
            id,
          },
        });
        return { content: "User deleted", result: true };
      }

      return { content: "User not Found", result: false };
    },
    addCategory: async (_: any, { input }: { input: CategoryInput }) => {
      const category = await prisma.category.create({
        data: {
          ...input,
        },
      });
      return category;
    },
    updateCategory: async (
      _: any,
      { input }: { input: CategoryUpdateInput }
    ): Promise<Message> => {
      const category = await prisma.category.findUnique({
        where: {
          id: input.id,
        },
      });

      if (category) {
        await prisma.category.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          },
        });
        return { content: "Category updated", result: true };
      }

      return { content: "Category not Found", result: false };
    },
    deleteCategory: async (
      _: any,
      { input: { id } }: { input: IdInput }
    ): Promise<Message> => {
      const category = await prisma.category.findUnique({
        where: {
          id,
        },
      });

      if (category) {
        await prisma.category.delete({
          where: {
            id,
          },
        });
        return { content: "Category deleted", result: true };
      }

      return { content: "Category not Found", result: false };
    },
    addProduct: async (_: any, { input }: { input: ProductInput }) => {
      const product = await prisma.product.create({
        data: {
          ...input,
        },
      });
      return product;
    },
    updateProduct: async (
      _: any,
      { input }: { input: ProductUpdateInput }
    ): Promise<Message> => {
      const product = await prisma.product.findUnique({
        where: {
          id: input.id,
        },
      });

      if (product) {
        await prisma.product.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          },
        });
        return { content: "Product updated", result: true };
      }

      return { content: "Product not found", result: false };
    },
    deleteProduct: async (
      _: any,
      { input: { id } }: { input: IdInput }
    ): Promise<Message> => {
      const product = await prisma.product.findUnique({
        where: {
          id,
        },
      });

      if (product) {
        await prisma.product.delete({
          where: {
            id,
          },
        });
        return { content: "Product deleted", result: true };
      }

      return { content: "Product not found", result: false };
    },
  },
};
