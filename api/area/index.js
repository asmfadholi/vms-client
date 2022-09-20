import qs from 'qs'

const getAreaList = ({ axios, req }) => {
  const query = qs.stringify({ ...req })
  return axios.$get(`/areas?${query}`)
}

const getAreaDetail = ({ axios, req }) => {
  const query = qs.stringify({ ...req })
  return axios.$get(`/areas?${query}`)
}

export { getAreaList, getAreaDetail }
