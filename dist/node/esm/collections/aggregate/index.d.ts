/// <reference types="node" resolution-mode="require"/>
import Connection from '../../connection/index.js';
import { ConsistencyLevel } from '../../data/index.js';
import { Aggregator } from '../../graphql/index.js';
import { DbVersionSupport } from '../../utils/dbVersion.js';
import { FilterValue } from '../filters/index.js';
export type AggregateBaseOptions<T, M> = {
  filters?: FilterValue;
  returnMetrics?: M;
};
export type AggregateGroupByOptions<T, M> = AggregateOptions<T, M> & {
  groupBy: (keyof T & string) | GroupByAggregate<T>;
};
export type GroupByAggregate<T> = {
  property: keyof T & string;
  limit?: number;
};
export type AggregateOptions<T, M> = AggregateBaseOptions<T, M>;
export type AggregateBaseOverAllOptions<T, M> = AggregateBaseOptions<T, M>;
export type AggregateNearOptions<T, M> = AggregateBaseOptions<T, M> & {
  certainty?: number;
  distance?: number;
  objectLimit?: number;
  targetVector?: string;
};
export type AggregateGroupByNearOptions<T, M> = AggregateNearOptions<T, M> & {
  groupBy: (keyof T & string) | GroupByAggregate<T>;
};
export type AggregateBoolean = {
  count?: number;
  percentageFalse?: number;
  percentageTrue?: number;
  totalFalse?: number;
  totalTrue?: number;
};
export type AggregateDate = {
  count?: number;
  maximum?: number;
  median?: number;
  minimum?: number;
  mode?: number;
};
export type AggregateNumber = {
  count?: number;
  maximum?: number;
  mean?: number;
  median?: number;
  minimum?: number;
  mode?: number;
  sum?: number;
};
export type AggregateReference = {
  pointingTo?: string;
};
export type AggregateText = {
  count?: number;
  topOccurrences?: {
    occurs?: number;
    value?: number;
  }[];
};
export type MetricsInput<N extends string> =
  | MetricsBoolean<N>
  | MetricsInteger<N>
  | MetricsNumber<N>
  | MetricsText<N>
  | MetricsDate<N>;
export type PropertiesMetrics<T> = T extends undefined
  ? MetricsInput<string> | MetricsInput<string>[]
  : MetricsInput<keyof T & string> | MetricsInput<keyof T & string>[];
export type MetricsBase<N extends string, K extends 'boolean' | 'date' | 'integer' | 'number' | 'text'> = {
  kind: K;
  propertyName: N;
};
export type Option<A> = {
  [key in keyof A]: boolean;
};
export type BooleanKeys = 'count' | 'percentageFalse' | 'percentageTrue' | 'totalFalse' | 'totalTrue';
export type DateKeys = 'count' | 'maximum' | 'median' | 'minimum' | 'mode';
export type NumberKeys = 'count' | 'maximum' | 'mean' | 'median' | 'minimum' | 'mode' | 'sum';
export type MetricsBoolean<N extends string> = MetricsBase<N, 'boolean'> &
  Partial<{
    [key in BooleanKeys]: boolean;
  }>;
export type MetricsDate<N extends string> = MetricsBase<N, 'date'> &
  Partial<{
    [key in DateKeys]: boolean;
  }>;
export type MetricsInteger<N extends string> = MetricsBase<N, 'integer'> &
  Partial<{
    [key in NumberKeys]: boolean;
  }>;
export type MetricsNumber<N extends string> = MetricsBase<N, 'number'> &
  Partial<{
    [key in NumberKeys]: boolean;
  }>;
export type MetricsText<N extends string> = MetricsBase<N, 'text'> & {
  count?: boolean;
  topOccurrences?: {
    occurs?: boolean;
    value?: boolean;
  };
  minOccurrences?: number;
};
export type AggregateMetrics<M> = {
  [K in keyof M]: M[K] extends true ? number : never;
};
export type MetricsProperty<T> = T extends undefined ? string : keyof T & string;
export declare const metrics: <T>() => {
  aggregate: <P extends MetricsProperty<T>>(property: P) => MetricsManager<T, P>;
};
export interface Metrics<T> {
  /**
     * Define the metrics to be returned based on a property when aggregating over a collection.
  
      Use this `aggregate` method to define the name to the property to be aggregated on.
      Then use the `text`, `integer`, `number`, `boolean`, `date_`, or `reference` methods to define the metrics to be returned.
  
      See [the docs](https://weaviate.io/developers/weaviate/search/aggregate) for more details!
     */
  aggregate: <P extends MetricsProperty<T>>(property: P) => MetricsManager<T, P>;
}
export declare class MetricsManager<T, P extends MetricsProperty<T>> {
  private propertyName;
  constructor(property: P);
  private map;
  /**
   * Define the metrics to be returned for a BOOL or BOOL_ARRAY property when aggregating over a collection.
   *
   * If none of the arguments are provided then all metrics will be returned.
   *
   * @param {('count' | 'percentageFalse' | 'percentageTrue' | 'totalFalse' | 'totalTrue')[]} metrics The metrics to return.
   * @returns {MetricsBoolean<P>} The metrics for the property.
   */
  boolean(
    metrics?: ('count' | 'percentageFalse' | 'percentageTrue' | 'totalFalse' | 'totalTrue')[]
  ): MetricsBoolean<P>;
  /**
   * Define the metrics to be returned for a DATE or DATE_ARRAY property when aggregating over a collection.
   *
   * If none of the arguments are provided then all metrics will be returned.
   *
   * @param {('count' | 'maximum' | 'median' | 'minimum' | 'mode')[]} metrics The metrics to return.
   * @returns {MetricsDate<P>} The metrics for the property.
   */
  date(metrics?: ('count' | 'maximum' | 'median' | 'minimum' | 'mode')[]): MetricsDate<P>;
  /**
   * Define the metrics to be returned for an INT or INT_ARRAY property when aggregating over a collection.
   *
   * If none of the arguments are provided then all metrics will be returned.
   *
   * @param {('count' | 'maximum' | 'mean' | 'median' | 'minimum' | 'mode' | 'sum')[]} metrics The metrics to return.
   * @returns {MetricsInteger<P>} The metrics for the property.
   */
  integer(
    metrics?: ('count' | 'maximum' | 'mean' | 'median' | 'minimum' | 'mode' | 'sum')[]
  ): MetricsInteger<P>;
  /**
   * Define the metrics to be returned for a NUMBER or NUMBER_ARRAY property when aggregating over a collection.
   *
   * If none of the arguments are provided then all metrics will be returned.
   *
   * @param {('count' | 'maximum' | 'mean' | 'median' | 'minimum' | 'mode' | 'sum')[]} metrics The metrics to return.
   * @returns {MetricsNumber<P>} The metrics for the property.
   */
  number(
    metrics?: ('count' | 'maximum' | 'mean' | 'median' | 'minimum' | 'mode' | 'sum')[]
  ): MetricsNumber<P>;
  /**
   * Define the metrics to be returned for a TEXT or TEXT_ARRAY property when aggregating over a collection.
   *
   * If none of the arguments are provided then all metrics will be returned.
   *
   * @param {('count' | 'topOccurrencesOccurs' | 'topOccurrencesValue')[]} metrics The metrics to return.
   * @param {number} [minOccurrences] The how many top occurrences to return.
   * @returns {MetricsText<P>} The metrics for the property.
   */
  text(
    metrics?: ('count' | 'topOccurrencesOccurs' | 'topOccurrencesValue')[],
    minOccurrences?: number
  ): MetricsText<P>;
}
type KindToAggregateType<K> = K extends 'text'
  ? AggregateText
  : K extends 'date'
  ? AggregateDate
  : K extends 'integer'
  ? AggregateNumber
  : K extends 'number'
  ? AggregateNumber
  : K extends 'boolean'
  ? AggregateBoolean
  : K extends 'reference'
  ? AggregateReference
  : never;
export type AggregateType = AggregateBoolean | AggregateDate | AggregateNumber | AggregateText;
export type AggregateResult<T, M extends PropertiesMetrics<T> | undefined = undefined> = {
  properties: T extends undefined
    ? Record<string, AggregateType>
    : M extends MetricsInput<keyof T & string>[]
    ? {
        [K in M[number] as K['propertyName']]: KindToAggregateType<K['kind']>;
      }
    : M extends MetricsInput<keyof T & string>
    ? {
        [K in M as K['propertyName']]: KindToAggregateType<K['kind']>;
      }
    : undefined;
  totalCount: number;
};
export type AggregateGroupByResult<
  T,
  M extends PropertiesMetrics<T> | undefined = undefined
> = AggregateResult<T, M> & {
  groupedBy: {
    prop: string;
    value: string;
  };
};
declare class AggregateManager<T> implements Aggregate<T> {
  connection: Connection;
  groupBy: AggregateGroupBy<T>;
  name: string;
  dbVersionSupport: DbVersionSupport;
  consistencyLevel?: ConsistencyLevel;
  tenant?: string;
  private constructor();
  query(): Aggregator;
  base(
    metrics?: PropertiesMetrics<T>,
    filters?: FilterValue,
    groupBy?: (keyof T & string) | GroupByAggregate<T>
  ): Aggregator;
  metrics(metrics: MetricsInput<(keyof T & string) | string>): string;
  static use<T>(
    connection: Connection,
    name: string,
    dbVersionSupport: DbVersionSupport,
    consistencyLevel?: ConsistencyLevel,
    tenant?: string
  ): AggregateManager<T>;
  nearImage<M extends PropertiesMetrics<T>>(
    image: string | Buffer,
    opts?: AggregateNearOptions<T, M>
  ): Promise<AggregateResult<T, M>>;
  nearObject<M extends PropertiesMetrics<T>>(
    id: string,
    opts?: AggregateNearOptions<T, M>
  ): Promise<AggregateResult<T, M>>;
  nearText<M extends PropertiesMetrics<T>>(
    query: string | string[],
    opts?: AggregateNearOptions<T, M>
  ): Promise<AggregateResult<T, M>>;
  nearVector<M extends PropertiesMetrics<T>>(
    vector: number[],
    opts?: AggregateNearOptions<T, M>
  ): Promise<AggregateResult<T, M>>;
  overAll<M extends PropertiesMetrics<T>>(opts?: AggregateOptions<T, M>): Promise<AggregateResult<T, M>>;
  do: <M extends PropertiesMetrics<T> | undefined = undefined>(
    query: Aggregator
  ) => Promise<AggregateResult<T, M>>;
  doGroupBy: <M extends PropertiesMetrics<T> | undefined = undefined>(
    query: Aggregator
  ) => Promise<AggregateGroupByResult<T, M>[]>;
}
export interface Aggregate<T> {
  /** This namespace contains methods perform a group by search while aggregating metrics. */
  groupBy: AggregateGroupBy<T>;
  /**
   * Aggregate metrics over the objects returned by a near image vector search on this collection.
   *
   * At least one of `certainty`, `distance`, or `object_limit` must be specified here for the vector search.
   *
   * This method requires a vectorizer capable of handling base64-encoded images, e.g. `img2vec-neural`, `multi2vec-clip`, and `multi2vec-bind`.
   *
   * @param {string | Buffer} image The image to search on. This can be a base64 string, a file path string, or a buffer.
   * @param {AggregateNearOptions<T, M>} [opts] The options for the request.
   * @returns {Promise<AggregateResult<T, M>[]>} The aggregated metrics for the objects returned by the vector search.
   */
  nearImage<M extends PropertiesMetrics<T>>(
    image: string | Buffer,
    opts?: AggregateNearOptions<T, M>
  ): Promise<AggregateResult<T, M>>;
  /**
   * Aggregate metrics over the objects returned by a near object search on this collection.
   *
   * At least one of `certainty`, `distance`, or `object_limit` must be specified here for the vector search.
   *
   * This method requires that the objects in the collection have associated vectors.
   *
   * @param {string} id The ID of the object to search for.
   * @param {AggregateNearOptions<T, M>} [opts] The options for the request.
   * @returns {Promise<AggregateResult<T, M>[]>} The aggregated metrics for the objects returned by the vector search.
   */
  nearObject<M extends PropertiesMetrics<T>>(
    id: string,
    opts?: AggregateNearOptions<T, M>
  ): Promise<AggregateResult<T, M>>;
  /**
   * Aggregate metrics over the objects returned by a near vector search on this collection.
   *
   * At least one of `certainty`, `distance`, or `object_limit` must be specified here for the vector search.
   *
   * This method requires that the objects in the collection have associated vectors.
   *
   * @param {number[]} query The text query to search for.
   * @param {AggregateNearOptions<T, M>} [opts] The options for the request.
   * @returns {Promise<AggregateResult<T, M>[]>} The aggregated metrics for the objects returned by the vector search.
   */
  nearText<M extends PropertiesMetrics<T>>(
    query: string | string[],
    opts?: AggregateNearOptions<T, M>
  ): Promise<AggregateResult<T, M>>;
  /**
   * Aggregate metrics over the objects returned by a near vector search on this collection.
   *
   * At least one of `certainty`, `distance`, or `object_limit` must be specified here for the vector search.
   *
   * This method requires that the objects in the collection have associated vectors.
   *
   * @param {number[]} vector The vector to search for.
   * @param {AggregateNearOptions<T, M>} [opts] The options for the request.
   * @returns {Promise<AggregateResult<T, M>[]>} The aggregated metrics for the objects returned by the vector search.
   */
  nearVector<M extends PropertiesMetrics<T>>(
    vector: number[],
    opts?: AggregateNearOptions<T, M>
  ): Promise<AggregateResult<T, M>>;
  /**
   * Aggregate metrics over all the objects in this collection without any vector search.
   *
   * @param {AggregateOptions<T, M>} [opts] The options for the request.
   * @returns {Promise<AggregateResult<T, M>[]>} The aggregated metrics for the objects in the collection.
   */
  overAll<M extends PropertiesMetrics<T>>(opts?: AggregateOptions<T, M>): Promise<AggregateResult<T, M>>;
}
export interface AggregateGroupBy<T> {
  /**
   * Aggregate metrics over the objects returned by a near image vector search on this collection.
   *
   * At least one of `certainty`, `distance`, or `object_limit` must be specified here for the vector search.
   *
   * This method requires a vectorizer capable of handling base64-encoded images, e.g. `img2vec-neural`, `multi2vec-clip`, and `multi2vec-bind`.
   *
   * @param {string | Buffer} image The image to search on. This can be a base64 string, a file path string, or a buffer.
   * @param {AggregateGroupByNearOptions<T, M>} [opts] The options for the request.
   * @returns {Promise<AggregateGroupByResult<T, M>[]>} The aggregated metrics for the objects returned by the vector search.
   */
  nearImage<M extends PropertiesMetrics<T>>(
    image: string | Buffer,
    opts?: AggregateGroupByNearOptions<T, M>
  ): Promise<AggregateGroupByResult<T, M>[]>;
  /**
   * Aggregate metrics over the objects returned by a near object search on this collection.
   *
   * At least one of `certainty`, `distance`, or `object_limit` must be specified here for the vector search.
   *
   * This method requires that the objects in the collection have associated vectors.
   *
   * @param {string} id The ID of the object to search for.
   * @param {AggregateGroupByNearOptions<T, M>} [opts] The options for the request.
   * @returns {Promise<AggregateGroupByResult<T, M>[]>} The aggregated metrics for the objects returned by the vector search.
   */
  nearObject<M extends PropertiesMetrics<T>>(
    id: string,
    opts?: AggregateGroupByNearOptions<T, M>
  ): Promise<AggregateGroupByResult<T, M>[]>;
  /**
   * Aggregate metrics over the objects returned by a near text vector search on this collection.
   *
   * At least one of `certainty`, `distance`, or `object_limit` must be specified here for the vector search.
   *
   * This method requires a vectorizer capable of handling text, e.g. `text2vec-contextionary`, `text2vec-openai`, etc.
   *
   * @param {string | string[]} query The text to search for.
   * @param {AggregateGroupByNearOptions<T, M>} [opts] The options for the request.
   * @returns {Promise<AggregateGroupByResult<T, M>[]>} The aggregated metrics for the objects returned by the vector search.
   */
  nearText<M extends PropertiesMetrics<T>>(
    query: string | string[],
    opts: AggregateGroupByNearOptions<T, M>
  ): Promise<AggregateGroupByResult<T, M>[]>;
  /**
   * Aggregate metrics over the objects returned by a near vector search on this collection.
   *
   * At least one of `certainty`, `distance`, or `object_limit` must be specified here for the vector search.
   *
   * This method requires that the objects in the collection have associated vectors.
   *
   * @param {number[]} vector The vector to search for.
   * @param {AggregateGroupByNearOptions<T, M>} [opts] The options for the request.
   * @returns {Promise<AggregateGroupByResult<T, M>[]>} The aggregated metrics for the objects returned by the vector search.
   */
  nearVector<M extends PropertiesMetrics<T>>(
    vector: number[],
    opts?: AggregateGroupByNearOptions<T, M>
  ): Promise<AggregateGroupByResult<T, M>[]>;
  /**
   * Aggregate metrics over all the objects in this collection without any vector search.
   *
   * @param {AggregateGroupByOptions<T, M>} [opts] The options for the request.
   * @returns {Promise<AggregateGroupByResult<T, M>[]>} The aggregated metrics for the objects in the collection.
   */
  overAll<M extends PropertiesMetrics<T>>(
    opts?: AggregateGroupByOptions<T, M>
  ): Promise<AggregateGroupByResult<T, M>[]>;
}
declare const _default: typeof AggregateManager.use;
export default _default;
