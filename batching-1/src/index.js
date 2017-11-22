const { schema } = require('./schema')
const { fetchUserById, batchedUserFetching } = require('./db_users')
const { graphql } = require('graphql')
const DataLoader = require('dataloader')

const query = `{ 
  users(ids: ["abc", "def", "ghi", "jkl"]) { 
    id
    name
  } 
}`

const dataloader = new DataLoader(batchedUserFetching)

async function start() {
  const result = await graphql(schema, query, null, {dataloader})
  console.log(JSON.stringify(result))
}

start()