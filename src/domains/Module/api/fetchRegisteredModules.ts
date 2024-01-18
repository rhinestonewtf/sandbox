import { gql } from '@apollo/client'
import { client } from '@/src/utils/graphQLClient'

const query = `
  query {
    moduleRegistrations {
        id
        implementation
        sender
        resolver
      }
  }
`
export const fetchRegisteredModules = () =>
  client
    .query({
      query: gql(query),
    })
    .then((data) => data.data.moduleRegistrations)
    .catch((err) => {
      console.log('Error fetching data: ', err)
    })
