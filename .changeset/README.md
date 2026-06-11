# Changesets

This folder holds [changesets](https://github.com/changesets/changesets): a record of changes
that should release a new version of `@fv/ui`.

Run `pnpm changeset` to add one. Pick the bump (patch / minor / major) and write a short summary —
it becomes the changelog entry. On merge to `main`, CI opens a "Version Packages" PR; merging that
publishes to npm.
