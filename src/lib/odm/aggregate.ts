import { Aggregate, Model, PipelineStage } from 'mongoose'

export async function aggregate<D, R>(
  model: Model<D>,
  pipelines: PipelineStage[],
  options?: any
): Promise<Aggregate<Array<R>>> {
  return model.aggregate<R>(pipelines, options)
}
