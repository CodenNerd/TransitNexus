import mongoose from 'mongoose';

const ApplicationsSchema = mongoose.Schema(
{
    id: mongoose.Schema.Types.ObjectId,
    employer_id: String,
    job_title: String,
    job_description: String,
    job_requirements: [],
    company_id: String,
    application_start: String,
    application_deadline: String,
    applicants: []
  }
);

const ApplicationsModel = mongoose.model('Applications', ApplicationsSchema);
export default ApplicationsModel;