# GitHub Pages using GitHub Actions

### References

-   [Deploying a Static Site (GitHub Pages) - Vite](https://vitejs.dev/guide/static-deploy#github-pages)
-   [`pnpm` - `action-setup`](https://github.com/pnpm/action-setup)

### GitHub Action

Example GitHub Actions `.yml` is as follows (using `pnpm`):

```yaml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
    # Runs on pushes targeting the default branch
    push:
        branches: ["master"]

    # Allows you to run this workflow manually from the Actions tab
    workflow_dispatch:

# Sets the GITHUB_TOKEN permissions to allow deployment to GitHub Pages
permissions:
    contents: read
    pages: write
    id-token: write

# Allow one concurrent deployment
concurrency:
    group: "pages"
    cancel-in-progress: true

#Allow repo secrets
env:
    VITE_EXAMPLE_SECRET: ${{ secrets.VITE_EXAMPLE_SECRET }}
    VITE_EXAMPLE_VAR: ${{ vars.VITE_EXAMPLE_VAR }}

jobs:
    # Single deploy job since we're just deploying
    deploy:
        environment:
            name: gh-pages
            url: ${{ steps.deployment.outputs.page_url }}
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@v4
            - uses: pnpm/action-setup@v4
              name: Install pnpm
              with:
                  version: 9
                  run_install: false
            - name: Install Node.js
              uses: actions/setup-node@v4
              with:
                  node-version: 20
                  cache: "pnpm"
            - name: Install dependencies
              run: pnpm install
            - name: Build
              run: pnpm run build
            - name: Setup Pages
              uses: actions/configure-pages@v4
            - name: Upload artifact
              uses: actions/upload-pages-artifact@v3
              with:
                  # Upload dist folder
                  path: "./dist"
            - name: Deploy to GitHub Pages
              id: deployment
              uses: actions/deploy-pages@v4
```

### Things to Note:

-   Change the `branches` to the branch you want to deploy from. It can be `master`, `main`, or any other branch.
-   List all the environment variables you want to use in the `env` section. It can also be listed at the step level.
-   For secrets, use `${{ secrets.SECRET_NAME }}` and for environment variables, use `${{ vars.VAR_NAME }}`.
