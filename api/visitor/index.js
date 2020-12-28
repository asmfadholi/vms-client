import qs from 'dot-qs'

const createVisitor = ({ axios, req }) => {
  return axios.$post('/visitors', req)
}

const getVisitor = ({ axios, req }) => {
  const query = qs.stringify({ ...req })
  return axios.$get(`/tickets?${query}`)
}

export { createVisitor, getVisitor }
