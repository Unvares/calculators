import data from './data';
import calcFunctions from './calcFunctions';

class MockServer {
  #stack = [];
  #index = 0;
  #intervalId = null;
  #calcFunctions = calcFunctions;

  #startHandlingRequests() {
    const delay = 3000;
    this.#intervalId = setInterval(() => this.#handleRequests(), delay);
  }

  #handleRequests() {
    const request = this.#stack[this.#index];
    const {
      reject,
      request: { method },
    } = request;
    if (method === 'GET') this.#get(request);
    if (method === 'POST') this.#post(request);
    this.#throwError({
      reject,
      message: 'Invalid method. Only GET and POST methods are allowed',
    });
    this.#index += 1;
    if (this.#index >= this.#stack.length) this.#stopHandlingRequests();
  }

  #stopHandlingRequests() {
    clearInterval(this.#intervalId);
    this.#stack = [];
    this.#index = 0;
    this.#intervalId = null;
  }

  #throwError({ reject, message }) {
    reject(message);
  }

  #get({ request: { path }, resolve, reject }) {
    if (path === '') return resolve(JSON.stringify(data.calculators));
    this.#throwError({ reject, message: 'invalid path' });
  }

  #post({ request: { path, body }, resolve, reject }) {
    if (path === '') this.#calculate({ body, resolve, reject });
    this.#throwError({ reject, message: 'invalid path' });
  }

  #calculate({ body: { values, id }, resolve, reject }) {
    if (!this.#areValidValues(values))
      reject('Input is invalid. Only numbers are allowed');
    const result = this.#calcFunctions[id](values);
    resolve(JSON.stringify(result));
  }

  #areValidValues(values) {
    return values.indexOf(null) === -1;
  }

  fetch(request) {
    let resolvePromise;
    let rejectPromise;

    const promise = new Promise((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });

    try {
      if (request === 'null') throw Error;
      this.#stack.push({
        request: JSON.parse(request),
        resolve: resolvePromise,
        reject: rejectPromise,
      });
    } catch {
      return new Promise((resolve, reject) => reject('invalid request'));
    }

    if (this.#intervalId === null) this.#startHandlingRequests();

    return promise;
  }
}

export { MockServer };
