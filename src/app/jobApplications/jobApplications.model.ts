import { Document, model, Model, Schema } from "mongoose";

export interface IApplications {
  jobTitle: string;
  companyName: string;
  date: Date | string;
  status: string;
}

export interface IApplicationsDoc extends IApplications, Document {}

interface IApplicationsModel extends Model<IApplicationsDoc> {}

const applicationsSchema = new Schema<IApplicationsDoc, IApplicationsModel>(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "UTC",
    },
  },
  {
    versionKey: "_docVersion",
    timestamps: { currentTime: () => new Date() },
  }
);

const Applications = model<IApplicationsDoc, IApplicationsModel>(
  "Applications",
  applicationsSchema
);

export default Applications;
