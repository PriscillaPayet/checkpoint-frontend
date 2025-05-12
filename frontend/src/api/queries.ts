import { gql } from "graphql-tag";

export const GET_CONTINENTS = gql(/* GraphQL */ `
  query continents {
    continents {
      id
      name
    }
  }
`);

export const GET_COUNTRIES = gql`
  query {
    countries {
      id
      name
      emoji
    }
  }
`;

export const GET_COUNTRY = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;
