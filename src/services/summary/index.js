'use strict';

const hooks = require('./hooks');
const rp = require('request-promise');
class Service {
  constructor(options = {}) {
    this.options = options;
  }

  find(params) {
    let req_url = params.query.url;
    let import_io_url = `https://api.import.io/store/connector/a5979ec4-de3c-41c0-9ef6-e8b470e3471f/_query?input=url:${req_url}&_apikey=5c89801849d746fea1113bef5cb2a4e918bf323ced22c5cb7024ccc9f425a0a5f80851f22f0895279977781bec8211f542bfd2c6c214e98689c78274814f919b4372e092028283ed0916c402a5d6511c`;
    let summary = "";
    return rp(import_io_url).then((data) => {
      let data_obj = JSON.parse(data);
      return data_obj.results[0].summary;
    })
  }

  get(id, params) {
    return Promise.resolve({});
  }

  create(data, params) {
    if(Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/summaries', new Service());

  // Get our initialize service to that we can bind hooks
  const summaryService = app.service('/summaries');

  // Set up our before hooks
  summaryService.before(hooks.before);

  // Set up our after hooks
  summaryService.after(hooks.after);
};

module.exports.Service = Service;
