import Applications, { IApplications } from "./jobApplications.model";

export const createApplication = async (data: IApplications) =>
  await Applications.create(data);

export const getAllApplications = async (
  query: Record<string, any>,
  limit: number,
  skip: number
) => {
  return await Applications.find(query).limit(limit).skip(skip);
};

export const getApplicationsCount = async (query: Record<string, any>) =>
  await Applications.countDocuments(query);

export const deleteApplicationById = async (id: string) =>
  await Applications.deleteOne({ _id: id });

export const updateJobApplicationById = async (
  id: string,
  data: Partial<IApplications>
) => await Applications.updateOne({ _id: id }, data);
