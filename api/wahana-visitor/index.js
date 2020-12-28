const createWahanaVisitor = ({ axios, req }) => {
  return axios.$post('/wahana-visitors', req)
}

export { createWahanaVisitor }
