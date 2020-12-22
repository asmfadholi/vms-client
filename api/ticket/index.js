import qs from 'dot-qs'

const createTicket = ({ axios, req }) => {
  return axios.$post('/tickets', req)
}

const getTicket = ({ axios, req }) => {
  const query = qs.stringify({ ...req })
  return axios.$get(`/tickets?${query}`)
}

export { createTicket, getTicket }
