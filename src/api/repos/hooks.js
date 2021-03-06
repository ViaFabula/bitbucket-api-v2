const {
  _,
  log,
  handleError,
  buildUri,
  fluid,
  createPromisedApi,
  createAbstractApi,
  validateArgs
} = require('./_base')

/**
 * API doc: https://developer.atlassian.com/bitbucket/api/2/reference/
 * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts)

  const localApi = {
    /**
     * Get the branch info for a single repo
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     */
    getAll(username, repoSlug, callback) {
      validateArgs('getAll', arguments, 2)
      const uri = buildUri(username, repoSlug, 'hooks')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },

    /**
     * Get the branch info for a single repo
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo.
     */
    create(username, repoSlug, callback) {
      validateArgs('getAll', arguments, 2)
      const uri = buildUri(username, repoSlug, 'hooks')
      api.post(
        uri,
        null, null,
        result.$createListener(callback)
      )
    }
  }

  localApi.forProject = fluid(localApi, 2)
  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'getAll',
    'create'
  ]
}
