import { WeaviateNestedProperty, WeaviateProperty } from '../../../openapi/types.js';
import { InvertedIndexConfig, MultiTenancyConfig, ReplicationConfig } from '../../config/types/index.js';
import { DataType } from '../../types/index.js';
import { NonRefKeys, RefKeys } from '../../types/internal.js';

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type InvertedIndexConfigCreate = RecursivePartial<InvertedIndexConfig>;

export type InvertedIndexConfigUpdate = {
  bm25?: {
    b?: number;
    k1?: number;
  };
  cleanupIntervalSeconds?: number;
  stopwords?: {
    preset?: string;
    additions?: string[];
    removals?: string[];
  };
};

export type MultiTenancyConfigCreate = RecursivePartial<MultiTenancyConfig>;

export type NestedPropertyCreate<T = undefined> = T extends undefined
  ? {
      name: string;
      dataType: DataType;
      description?: string;
      nestedProperties?: NestedPropertyConfigCreate<T, DataType>[];
      indexInverted?: boolean;
      indexFilterable?: boolean;
      indexSearchable?: boolean;
      tokenization?: WeaviateNestedProperty['tokenization'];
    }
  : {
      [K in NonRefKeys<T>]: RequiresNested<DataType<T[K]>> extends true
        ? {
            name: K;
            dataType: DataType<T[K]>;
            nestedProperties: NestedPropertyConfigCreate<T[K], DataType<T[K]>>[];
          } & NestedPropertyConfigCreateBase
        : {
            name: K;
            dataType: DataType<T[K]>;
            nestedProperties?: NestedPropertyConfigCreate<T[K], DataType<T[K]>>[];
          } & NestedPropertyConfigCreateBase;
    }[NonRefKeys<T>];

export type NestedPropertyConfigCreate<T, D> = D extends 'object' | 'object[]'
  ? T extends (infer U)[]
    ? NestedPropertyCreate<U>
    : NestedPropertyCreate<T>
  : never;

export type RequiresNested<T> = T extends 'object' | 'object[]' ? true : false;

export type PropertyConfigCreateBase = {
  description?: string;
  indexInverted?: boolean;
  indexFilterable?: boolean;
  indexSearchable?: boolean;
  tokenization?: WeaviateProperty['tokenization'];
  skipVectorization?: boolean;
  vectorizePropertyName?: boolean;
};

export type NestedPropertyConfigCreateBase = {
  description?: string;
  indexInverted?: boolean;
  indexFilterable?: boolean;
  indexSearchable?: boolean;
  tokenization?: WeaviateNestedProperty['tokenization'];
};

export type PropertyConfigCreate<T> = T extends undefined
  ? {
      name: string;
      dataType: DataType;
      description?: string;
      nestedProperties?: NestedPropertyConfigCreate<T, DataType>[];
      indexInverted?: boolean;
      indexFilterable?: boolean;
      indexSearchable?: boolean;
      tokenization?: WeaviateProperty['tokenization'];
      skipVectorization?: boolean;
      vectorizePropertyName?: boolean;
    }
  : {
      [K in NonRefKeys<T>]: RequiresNested<DataType<T[K]>> extends true
        ? {
            name: K;
            dataType: DataType<T[K]>;
            nestedProperties: NestedPropertyConfigCreate<T[K], DataType<T[K]>>[];
          } & PropertyConfigCreateBase
        : {
            name: K;
            dataType: DataType<T[K]>;
            nestedProperties?: NestedPropertyConfigCreate<T[K], DataType<T[K]>>[];
          } & PropertyConfigCreateBase;
    }[NonRefKeys<T>];

/** The base class for creating a reference configuration. */
export type ReferenceConfigBaseCreate<T> = {
  /** The name of the reference. If no generic passed, the type is string. If a generic is passed, the type is a union of the keys labelled as CrossReference<T>. */
  name: T extends undefined ? string : RefKeys<T>;
  /** The description of the reference. */
  description?: string;
};

/** Use this type when defining a single-target reference for your collection. */
export type ReferenceSingleTargetConfigCreate<T> = ReferenceConfigBaseCreate<T> & {
  /** The collection that this reference points to. */
  targetCollection: string;
};

/** Use this type when defining a multi-target reference for your collection. */
export type ReferenceMultiTargetConfigCreate<T> = ReferenceConfigBaseCreate<T> & {
  /** The collection(s) that this reference points to. */
  targetCollections: string[];
};

export type ReferenceConfigCreate<T> =
  | ReferenceSingleTargetConfigCreate<T>
  | ReferenceMultiTargetConfigCreate<T>;

export type ReplicationConfigCreate = RecursivePartial<ReplicationConfig>;

export type ReplicationConfigUpdate = {
  asyncEnabled?: boolean;
  factor?: number;
};

export type ShardingConfigCreate = {
  virtualPerPhysical?: number;
  desiredCount?: number;
  desiredVirtualCount?: number;
};
