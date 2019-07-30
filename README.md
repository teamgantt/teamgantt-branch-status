# teamgantt-branch-status

Utility for updating the status of a branch.

## Usage

GitHub API usage requires a `GITHUB_TOKEN` environment variable to be present.

The included executable `mark-pending-branch` takes a single `--branch` option:

### Bundled executable(s)

```
$ mark-pending-branch --branch release-0.1.1
```

## API

The index of the module exports `markPending` and `markSuccess` functions that accept a single argument of the branch to mark.
