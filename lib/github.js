const Octokit = require('@octokit/rest');

const makeClient = (token) => {
  return new Octokit({
    auth: token
  });
};

/** Commits  */
const commitDefaults = {
  owner: 'teamgantt',
  repo: 'teamgantt-auth'
};

const listCommits = async (client, options) => {
  const withDefaults = {
    ...commitDefaults,
    ...options
  };

  const response = await client.repos.listCommits(withDefaults);
  return response.data;
}

const latestCommit = async (client, options) => {
  const commits = await listCommits(client, options);
  return commits[0];
}

/** Status */
const statusDefaults = {
  owner: 'teamgantt',
  repo: 'teamgantt-auth',
  context: 'TeamGantt Release Pipeline'
}

const createStatus = (client, options) => {
  const withDefaults = {
    ...statusDefaults,
    ...options,
  };

  if (!withDefaults.sha) {
    throw new Error('40 char sha required in options.sha');
  }

  if(!/failure|pending|success/.test(withDefaults.state)) {
    throw new Error('options.state must be one of failure, pending, or success');
  }

  return client.repos.createStatus(withDefaults);
}

module.exports = {
  makeClient,
  listCommits,
  latestCommit,
  createStatus,
};
