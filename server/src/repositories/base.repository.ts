import type { Model, FilterQuery, UpdateQuery } from "mongoose";

type InferDocumentType<M> = M extends Model<infer T> ? T : any;

export class BaseRepository<M extends Model<any>> {
  constructor(protected readonly model: M) {}

  findById(id: string) {
    return this.model.findById(id);
  }

  findOne(filter: FilterQuery<InferDocumentType<M>>) {
    return this.model.findOne(filter);
  }

  create(payload: Partial<InferDocumentType<M>> | any) {
    return this.model.create(payload);
  }

  updateById(id: string, update: UpdateQuery<InferDocumentType<M>>) {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  }

  findMany(filter: FilterQuery<InferDocumentType<M>>) {
    return this.model.find(filter);
  }

  countDocuments(filter: FilterQuery<InferDocumentType<M>>) {
    return this.model.countDocuments(filter);
  }
}
