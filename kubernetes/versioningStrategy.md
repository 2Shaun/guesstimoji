-   each service (front end, game api, graph ql api, etc.) will have an image tag based on `$CI_COMMIT_SHORT_SHA`. the default will be defined in `values.yml` as latest
-   `.Chart.AppVersion` will not have much meaning and will follow `.Chart.Version`

## Labels

-
