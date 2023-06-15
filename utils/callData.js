export default class renderDataTable {
  getJSON(uri, method, data) {
    return axios({
      url: uri,
      method,
      data,
    });
  }
}
