import {
  ModuleConfig,
  RerankerCohereConfig,
  RerankerJinaAIConfig,
  RerankerVoyageAIConfig,
} from '../config/types/index.js';

export default {
  /**
   * Create a `ModuleConfig<'reranker-cohere', RerankerCohereConfig>` object for use when reranking using the `reranker-cohere` module.
   *
   * See the [documentation](https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/reranker-cohere) for detailed usage.
   *
   * @param {RerankerCohereConfig} [config] The configuration for the `reranker-cohere` module.
   * @returns {ModuleConfig<'reranker-cohere', RerankerCohereConfig>} The configuration object.
   */
  cohere: (
    config?: RerankerCohereConfig
  ): ModuleConfig<'reranker-cohere', RerankerCohereConfig | undefined> => {
    return {
      name: 'reranker-cohere',
      config: config,
    };
  },
  /**
   * Create a `ModuleConfig<'reranker-jinaai', RerankerJinaAIConfig>` object for use when reranking using the `reranker-jinaai` module.
   *
   * See the [documentation](https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/reranker-jinaai) for detailed usage.
   *
   * @param {RerankerJinaAIConfig} [config] The configuration for the `reranker-jinaai` module.
   * @returns {ModuleConfig<'reranker-jinaai', RerankerJinaAIConfig | undefined>} The configuration object.
   */
  jinaai: (
    config?: RerankerJinaAIConfig
  ): ModuleConfig<'reranker-jinaai', RerankerJinaAIConfig | undefined> => {
    return {
      name: 'reranker-jinaai',
      config: config,
    };
  },
  /**
   * Create a `ModuleConfig<'reranker-transformers', Record<string, never>>` object for use when reranking using the `reranker-transformers` module.
   *
   * See the [documentation](https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/reranker-transformers) for detailed usage.
   *
   * @returns {ModuleConfig<'reranker-transformers', Record<string, never>>} The configuration object.
   */
  transformers: (): ModuleConfig<'reranker-transformers', Record<string, never>> => {
    return {
      name: 'reranker-transformers',
      config: {},
    };
  },
  /**
   * Create a `ModuleConfig<'reranker-voyageai', RerankerVoyageAIConfig>` object for use when reranking using the `reranker-voyageai` module.
   *
   * See the [documentation](https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/reranker-voyageai) for detailed usage.
   *
   * @param {RerankerVoyageAIConfig} [config] The configuration for the `reranker-voyage-ai` module.
   * @returns {ModuleConfig<'reranker-voyage-ai', RerankerVoyageAIConfig | undefined>} The configuration object.
   */
  voyageAI: (
    config?: RerankerVoyageAIConfig
  ): ModuleConfig<'reranker-voyageai', RerankerVoyageAIConfig | undefined> => {
    return {
      name: 'reranker-voyageai',
      config: config,
    };
  },
};
