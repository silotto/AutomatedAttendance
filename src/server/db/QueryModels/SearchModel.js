import SearchQueries from '../QuerySelectors/SearchQueries';
import Promise from 'bluebird';
import db from '../index.js';

Promise.promisifyAll(db);

export default class SearchModel extends SearchQueries {

  constructor() {
    super();
  }

  async getFirstLastGithubNames() {
    const queryString = super.firstLastGithubNames();
    return await db.queryAsync(queryString);
  }

}