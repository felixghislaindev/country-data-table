// src/queries/countriesQuery.ts
import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      code
      emoji
      continent {
        name
      }
      currency
    }
  }
`;
