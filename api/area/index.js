import qs from 'qs'

const getAreaList = ({ axios }) => {
  return axios.$get('/areas')
}

const getAreaDetail = ({ axios, req }) => {
  const query = qs.stringify({ ...req })
  return axios.$get(`/areas?${query}`)
}

export { getAreaList, getAreaDetail }
