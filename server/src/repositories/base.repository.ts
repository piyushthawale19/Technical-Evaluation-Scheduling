import type { Model, FilterQuery, UpdateQuery } from "mongoose";

export class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  findById(id: string) {
    return this.model.findById(id);
  }

  findOne(filter: FilterQuery<T>) {
    return this.model.findOne(filter);
  }

  create(payload: Partial<T>) {
    return this.model.create(payload);
  }

  updateById(id: string, update: UpdateQuery<T>) {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  }

  findMany(filter: FilterQuery<T>) {
    return this.model.find(filter);
  }

  countDocuments(filter: FilterQuery<T>) {
    return this.model.countDocuments(filter);
  }
}
