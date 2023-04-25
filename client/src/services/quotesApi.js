import axios from 'axios';

class QuotesApi {
  constructor() {
    this._apiUrl = 'http://localhost:5000/api/quotes';
  }
  getQuotes() {
    return axios.get(this._apiUrl);
  }
  createQuote(data) {
    return axios.post(this._apiUrl, data);
  }
  updateQuote(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }
  deleteQuote(id) {
    return axios.delete(`${this._apiUrl}/${id}`, { data: {} });
  }
}

export default new QuotesApi();
