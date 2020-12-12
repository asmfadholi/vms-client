import qs from 'dot-qs'

const getFormArea = ({ axios, req }) => {
  const query = qs.stringify({ ...req })
  return axios.$get(`/forms?${query}`)
}

export { getFormArea }
