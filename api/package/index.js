import qs from 'dot-qs'

const getPackageArea = ({ axios, req }) => {
  const query = qs.stringify({ ...req })
  return axios.$get(`/packages?${query}`)
}

export { getPackageArea }
