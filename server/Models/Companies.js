import mongoose from 'mongoose';

const CompaniesSchema = mongoose.Schema(
{
    id: mongoose.Schema.Types.ObjectId(),
    company_name: String,
    company_brief_description: String,
    company_address: String,
    company_website: String
  }
);

const CompaniesModel = mongoose.model('Companies', CompaniesSchema);
export default CompaniesModel;