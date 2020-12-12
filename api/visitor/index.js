const createVisitor = ({ axios, req }) => {
  return axios.$post('/visitors', req)
}

export { createVisitor }
