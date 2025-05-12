import { gql } from "graphql-tag";

export const ADD_COUNTRY = gql(/* GraphQL */ `
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
      name
      code
      emoji
      continent {
        id
        name
      }
    }
  }
`);
