'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.vectorizer =
  exports.vectorIndex =
  exports.vectorDistances =
  exports.tokenization =
  exports.reranker =
  exports.reconfigure =
  exports.generative =
  exports.dataType =
  exports.configure =
    void 0;
const generative_js_1 = __importDefault(require('./generative.js'));
exports.generative = generative_js_1.default;
const reranker_js_1 = __importDefault(require('./reranker.js'));
exports.reranker = reranker_js_1.default;
const vectorIndex_js_1 = require('./vectorIndex.js');
Object.defineProperty(exports, 'vectorIndex', {
  enumerable: true,
  get: function () {
    return vectorIndex_js_1.configure;
  },
});
const vectorizer_js_1 = require('./vectorizer.js');
Object.defineProperty(exports, 'vectorizer', {
  enumerable: true,
  get: function () {
    return vectorizer_js_1.vectorizer;
  },
});
const parsing_js_1 = require('./parsing.js');
const dataType = {
  INT: 'int',
  INT_ARRAY: 'int[]',
  NUMBER: 'number',
  NUMBER_ARRAY: 'number[]',
  TEXT: 'text',
  TEXT_ARRAY: 'text[]',
  UUID: 'uuid',
  UUID_ARRAY: 'uuid[]',
  BOOLEAN: 'boolean',
  BOOLEAN_ARRAY: 'boolean[]',
  DATE: 'date',
  DATE_ARRAY: 'date[]',
  OBJECT: 'object',
  OBJECT_ARRAY: 'object[]',
  BLOB: 'blob',
  GEO_COORDINATES: 'geoCoordinates',
  PHONE_NUMBER: 'phoneNumber',
};
exports.dataType = dataType;
const tokenization = {
  WORD: 'word',
  LOWERCASE: 'lowercase',
  WHITESPACE: 'whitespace',
  FIELD: 'field',
  TRIGRAM: 'trigram',
  GSE: 'gse',
  KAGOME_KR: 'kagome_kr',
};
exports.tokenization = tokenization;
const vectorDistances = {
  COSINE: 'cosine',
  DOT: 'dot',
  HAMMING: 'hamming',
  L2_SQUARED: 'l2-squared',
};
exports.vectorDistances = vectorDistances;
const configure = {
  generative: generative_js_1.default,
  reranker: reranker_js_1.default,
  vectorizer: vectorizer_js_1.vectorizer,
  vectorIndex: vectorIndex_js_1.configure,
  dataType,
  tokenization,
  vectorDistances,
  /**
   * Create an `InvertedIndexConfigCreate` object to be used when defining the configuration of the keyword searching algorithm of your collection.
   *
   * See [the docs](https://weaviate.io/developers/weaviate/configuration/indexes#configure-the-inverted-index) for details!
   *
   * @param {number} [options.bm25b] The BM25 b parameter.
   * @param {number} [options.bm25k1] The BM25 k1 parameter.
   * @param {number} [options.cleanupIntervalSeconds] The interval in seconds at which the inverted index is cleaned up.
   * @param {boolean} [options.indexTimestamps] Whether to index timestamps.
   * @param {boolean} [options.indexPropertyLength] Whether to index the length of properties.
   * @param {boolean} [options.indexNullState] Whether to index the null state of properties.
   * @param {'en' | 'none'} [options.stopwordsPreset] The stopwords preset to use.
   * @param {string[]} [options.stopwordsAdditions] Additional stopwords to add.
   * @param {string[]} [options.stopwordsRemovals] Stopwords to remove.
   */
  invertedIndex: (options) => {
    return {
      bm25: {
        b: options.bm25b,
        k1: options.bm25k1,
      },
      cleanupIntervalSeconds: options.cleanupIntervalSeconds,
      indexTimestamps: options.indexTimestamps,
      indexPropertyLength: options.indexPropertyLength,
      indexNullState: options.indexNullState,
      stopwords: {
        preset: options.stopwordsPreset,
        additions: options.stopwordsAdditions,
        removals: options.stopwordsRemovals,
      },
    };
  },
  /**
   * Create a `MultiTenancyConfigCreate` object to be used when defining the multi-tenancy configuration of your collection.
   *
   * @param {boolean} [options.autoTenantActivation] Whether auto-tenant activation is enabled. Default is false.
   * @param {boolean} [options.autoTenantCreation] Whether auto-tenant creation is enabled. Default is false.
   * @param {boolean} [options.enabled] Whether multi-tenancy is enabled. Default is true.
   */
  multiTenancy: (options) => {
    return options
      ? {
          autoTenantActivation: (0, parsing_js_1.parseWithDefault)(options.autoTenantActivation, false),
          autoTenantCreation: (0, parsing_js_1.parseWithDefault)(options.autoTenantCreation, false),
          enabled: (0, parsing_js_1.parseWithDefault)(options.enabled, true),
        }
      : { autoTenantActivation: false, autoTenantCreation: false, enabled: true };
  },
  /**
   * Create a `ReplicationConfigCreate` object to be used when defining the replication configuration of your collection.
   *
   * NOTE: You can only use one of Sharding or Replication, not both.
   *
   * See [the docs](https://weaviate.io/developers/weaviate/concepts/replication-architecture#replication-vs-sharding) for more details.
   *
   * @param {boolean} [options.asyncEnabled] Whether asynchronous replication is enabled. Default is false.
   * @param {ReplicationDeletionStrategy} [options.deletionStrategy] The deletion strategy when replication conflicts are detected between deletes and reads.
   * @param {number} [options.factor] The replication factor. Default is 1.
   */
  replication: (options) => {
    return {
      asyncEnabled: options.asyncEnabled,
      deletionStrategy: options.deletionStrategy,
      factor: options.factor,
    };
  },
  /**
   * Create a `ShardingConfigCreate` object to be used when defining the sharding configuration of your collection.
   *
   * NOTE: You can only use one of Sharding or Replication, not both.
   *
   * See [the docs](https://weaviate.io/developers/weaviate/concepts/replication-architecture#replication-vs-sharding) for more details.
   *
   * @param {number} [options.virtualPerPhysical] The number of virtual shards per physical shard.
   * @param {number} [options.desiredCount] The desired number of physical shards.
   * @param {number} [options.desiredVirtualCount] The desired number of virtual shards.
   */
  sharding: (options) => {
    return {
      virtualPerPhysical: options.virtualPerPhysical,
      desiredCount: options.desiredCount,
      desiredVirtualCount: options.desiredVirtualCount,
    };
  },
};
exports.configure = configure;
const reconfigure = {
  vectorIndex: vectorIndex_js_1.reconfigure,
  /**
   * Create an `InvertedIndexConfigUpdate` object to be used when updating the configuration of the keyword searching algorithm of your collection.
   *
   * See [the docs](https://weaviate.io/developers/weaviate/configuration/indexes#configure-the-inverted-index) for details!
   *
   * @param {number} [options.bm25b] The BM25 b parameter.
   * @param {number} [options.bm25k1] The BM25 k1 parameter.
   * @param {number} [options.cleanupIntervalSeconds] The interval in seconds at which the inverted index is cleaned up.
   * @param {'en' | 'none'} [options.stopwordsPreset] The stopwords preset to use.
   * @param {string[]} [options.stopwordsAdditions] Additional stopwords to add.
   * @param {string[]} [options.stopwordsRemovals] Stopwords to remove.
   */
  invertedIndex: (options) => {
    return {
      bm25: {
        b: options.bm25b,
        k1: options.bm25k1,
      },
      cleanupIntervalSeconds: options.cleanupIntervalSeconds,
      stopwords: {
        preset: options.stopwordsPreset,
        additions: options.stopwordsAdditions,
        removals: options.stopwordsRemovals,
      },
    };
  },
  vectorizer: {
    /**
     * Create a `VectorConfigUpdate` object to be used when updating the named vector configuration of Weaviate.
     *
     * @param {string} name The name of the vector.
     * @param {VectorizerOptions} options The options for the named vector.
     */
    update: (options) => {
      return {
        name: options === null || options === void 0 ? void 0 : options.name,
        vectorIndex: options.vectorIndexConfig,
      };
    },
  },
  /**
   * Create a `ReplicationConfigUpdate` object to be used when defining the replication configuration of Weaviate.
   *
   * See [the docs](https://weaviate.io/developers/weaviate/concepts/replication-architecture#replication-vs-sharding) for more details.
   *
   * @param {boolean} [options.asyncEnabled] Whether asynchronous replication is enabled.
   * @param {ReplicationDeletionStrategy} [options.deletionStrategy] The deletion strategy when replication conflicts are detected between deletes and reads.
   * @param {number} [options.factor] The replication factor.
   */
  replication: (options) => {
    return {
      asyncEnabled: options.asyncEnabled,
      deletionStrategy: options.deletionStrategy,
      factor: options.factor,
    };
  },
};
exports.reconfigure = reconfigure;
