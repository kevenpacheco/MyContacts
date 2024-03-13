import { delay } from '../../utils/delay';

export class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    const response = await fetch(`${this.baseURL}${path}`);

    await delay(2000);

    return response.json();
  }
}
