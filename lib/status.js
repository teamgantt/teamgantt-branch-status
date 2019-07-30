const {latestCommit, createStatus, makeClient} = require('./github');

const mark = async (branch, state) => {
  if (!process.env['GITHUB_TOKEN']) {
    throw new Error('GITHUB_TOKEN not found in environment');
  }
  const client = makeClient(process.env['GITHUB_TOKEN']);
  const { sha } = await latestCommit(client, {sha: branch});
  const status = await createStatus(client, {
    state,
    sha,
  });
  return status;
};

const markPending = async (branch) => mark(branch, 'pending');

const markSuccess = async (branch) => mark(branch, 'success');

module.exports = {
  markPending,
  markSuccess
}
