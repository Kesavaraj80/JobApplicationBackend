import {
  createApplication,
  deleteApplicationById,
  getAllApplications,
  getApplicationsCount,
  updateJobApplicationById,
} from "./jobApplciations.repository";

export const createJobApplication = async (data: {
  jobTitle: string;
  companyName: string;
  status: string;
}) => {
  await createApplication({
    jobTitle: data.jobTitle,
    companyName: data.companyName,
    status: data.status,
    date: new Date(),
  });
};

export const getJobApplications = async (query: {
  page: string;
  status: string;
  sort: string;
}) => {
  const limit = 10;
  const skipCount = (Number(query.page ? query.page : 1) - 1) * limit;

  let dbQuery: Record<string, any> = {};

  if (query.status !== "null") {
    dbQuery["status"] = query.status;
  }

  const data = await getAllApplications(dbQuery, limit, skipCount);
  const totalCount = await getApplicationsCount(dbQuery);
  const totalPages = Math.ceil(totalCount / 10);

  return { data, totalPages };
};

export const deleteApplication = async (id: string) =>
  await deleteApplicationById(id);

export const updateApplication = async (
  id: string,
  data: {
    jobTitle: string;
    companyName: string;
    status: string;
  }
) => {
  await updateJobApplicationById(id, {
    jobTitle: data.jobTitle,
    companyName: data.companyName,
    status: data.status,
  });
};
