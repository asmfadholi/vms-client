import qs from 'dot-qs'

const getWahanaArea = ({ axios, req }) => {
  const query = qs.stringify({ ...req })
  return axios.$get(`/wahanas?${query}`)
}

export { getWahanaArea }
