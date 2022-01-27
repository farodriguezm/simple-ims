import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
      description
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($input: IdInput!) {
    getCategory(input: $input) {
      id
      name
      description
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($input: CategoryInput!) {
    addCategory(input: $input) {
      id
      name
      description
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: CategoryUpdateInput!) {
    updateCategory(input: $input) {
      result
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($input: IdInput!) {
    deleteCategory(input: $input) {
      result
    }
  }
`;
