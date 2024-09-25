import express, { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import {
  createJobApplication,
  deleteApplication,
  getJobApplications,
  updateApplication,
} from "./jobApplications.services";

export default function defineJobApplicationRoutes(
  expressApp: express.Application
) {
  const jobApplicationRouter = express.Router();

  jobApplicationRouter.get(
    "/",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const query = request.query as unknown as {
          page: string;
          status: string;
          sort: string;
        };
        const data = await getJobApplications(query);
        response.status(httpStatus.OK).send(data);
      } catch (error) {
        next(error);
      }
    }
  );

  jobApplicationRouter.post(
    "/",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        try {
          const data = request.body as unknown as {
            jobTitle: string;
            companyName: string;
            status: string;
          };

          await createJobApplication(data);
          response
            .status(httpStatus.OK)
            .send({ message: "Job Application Created Successfully" });
        } catch (error) {
          next(error);
        }
      } catch (error) {
        next(error);
      }
    }
  );

  jobApplicationRouter.put(
    "/:id",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const data = request.body as unknown as {
          jobTitle: string;
          companyName: string;
          status: string;
        };

        const { id } = request.params as unknown as { id: string };

        await updateApplication(id, data);
        response
          .status(httpStatus.OK)
          .send({ message: "Updates Successfully" });
      } catch (error) {
        next(error);
      }
    }
  );

  jobApplicationRouter.delete(
    "/:id",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        try {
          const { id } = request.params as unknown as { id: string };
          await deleteApplication(id);
          response
            .status(httpStatus.OK)
            .send({ message: "Deleted Successfully" });
        } catch (error) {
          next(error);
        }
      } catch (error) {
        next(error);
      }
    }
  );

  expressApp.use("/api/v1/applications", jobApplicationRouter);
}
