import { ArrayCreators } from "../array/array-types";
import { UniversalCreators } from "../universal/universal-types";
import { StringCreators } from "../string/string-types";
import { ObjectCreators } from "../object/object-types";
import { NumberCreators } from "../number/number-types";
import { BooleanCreators } from "../boolean/boolean-types";
import { RiducerDict, CustomCreators } from "../custom/custom-types";

export * from "../universal/universal-types";
export * from "../custom/custom-types";

export type CreateFn<T> = (passedType?: string) => T;

export type WrappedWithCreate<T, C> = T & { create: CreateFn<C> };

export type CreateAPI<
  LeafT,
  TreeT,
  RiducerDictT extends RiducerDict<TreeT>
> = Creators<LeafT, TreeT, RiducerDictT> &
  CreateFn<Creators<LeafT, TreeT, RiducerDictT>>;

export type TypedCreators<
  LeafT,
  TreeT
> = NonNullable<LeafT> extends Array<unknown>
  ? ArrayCreators<NonNullable<LeafT>, TreeT>
  : NonNullable<LeafT> extends number
  ? NumberCreators<NonNullable<LeafT>, TreeT>
  : NonNullable<LeafT> extends string
  ? StringCreators<NonNullable<LeafT>, TreeT>
  : NonNullable<LeafT> extends boolean
  ? BooleanCreators<NonNullable<LeafT>, TreeT>
  : NonNullable<LeafT> extends {}
  ? ObjectCreators<NonNullable<LeafT>, TreeT>
  : {};

export type Creators<
  LeafT,
  TreeT,
  RiducerDictT extends RiducerDict<TreeT>
> = UniversalCreators<LeafT, TreeT> &
  TypedCreators<LeafT, TreeT> &
  CustomCreators<LeafT, TreeT, RiducerDictT>;
