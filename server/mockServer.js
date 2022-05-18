import calculators from './calculators.json';

class mockServer {
  #stack = [];
  #index = 0;
  #intervalId = null;

  #startHandlingRequests() {
    const delay = 10000;
    this.#intervalId = setInterval(() => this.#handleRequests(), delay);
  }

  #handleRequests() {
    const request = this.#stack[this.#index];
    const {
      reject,
      request: { method },
    } = request;
    if (method === 'GET') this.#get(request);
    this.#throwError({
      reject,
      message: 'Invalid method. Only GET methods are allowed',
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
    if (path === '') return resolve(JSON.stringify(calculators));
    this.#throwError({ reject, message: 'invalid path' });
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

export { mockServer };
