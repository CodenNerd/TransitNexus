import { Router, json } from "express";
import users from "../Data/users";
import applications from "../Data/applications";
import companies from "../Data/companies";
import multer from "multer";
import fs from 'fs';

const storage = multer.diskStorage({
  
    destination: (req, file, cb)=>{
      cb(null, './uploadedcvs/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
  
})

const fileFilter = (req, file, cb) =>{
  if(file.mimetype === 'application/pdf'){
    cb(null, true);
  }
  else{
    cb(null,false);
  }
}
const uploadCV = multer({ 
  storage, 
  limits:{
  fileSize: 1024 *1024 * 50
  }, 
  fileFilter
 })

const api = Router();

api.post("/signup", (req, res) => {

  let { firstname, lastname, email, password } = req.body;
  let userdetail = {
    firstname,
    lastname,
    email,
    password
  };

  // loop to check whether user email already exists
  users.forEach(x => {
    if (email == x.email) {
      return res.status(401).send({
        error: "Email already exists in our database"
      });
    }
  });
  // if not, add user to the array

  users.push(userdetail);
  return res.status(200).send(userdetail);
});

api.post("/signin", (req, res) => {
  let { email, password } = req.body;

  users.forEach(x => {
    if (email == x.email && password == x.password) {
      return res.status(200).send({ x });
    }
  });

  return res.status(404).send({ response: "User not found" });
});

// from employers' perspective
// create new jobs
api.post("/applications", (req, res) => {
  let {
    employer_id,
    job_title,
    job_description,
    job_requirements,
    company_address,
    application_start,
    application_deadline
  } = req.body;
  // validate all user input

  // ensure application detail does not match 100% with any existing record
  applications.forEach(x => {
    if (
      employer_id == x.employer_id &&
      job_title == x.job_title &&
      job_description == x.job_description &&
      job_requirements == x.job_requirements &&
      company_address == x.company_address &&
      application_start == x.application_start &&
      application_deadline == x.application_deadline
    ) {
      return res
        .status(400)
        .send({ error: "You have already created this job opening", x });
    }
  });
  // add a new application
  let new_application = {
    id: applications.length + 1,
    employer_id,
    job_title,
    job_description,
    job_requirements,
    company_address,
    application_start,
    application_deadline,
    applicant: []
  };

  applications.push(new_application);
  res.status(200).send({ applications, j: req.body });
});
// view all applicants
api.get("/applications/:id/applicants", (req, res) => {
  let application = null;
  applications.forEach(x => {
    if (x.id == req.params.id) {
      application = x;
      return res.status(200).send({ applicants: application.applicants });
    }
  });
  return res.status(400).send({ error: "That application was not found" });
});
// view specific applicant
api.get("/applications/:appId/applicants/:id", (req, res) => {
  let applicant = null;

  for (let i = 0; i < applications.length; i++) {
    if (applications[i].id == req.params.appId) {
      for (let j = 0; j < applications[i].applicants.length; j++) {
        if (applications[i].applicants[j].id == req.params.id) {
          applicant = applications[i].applicants[j];
          return res.status(200).send({ applicant });
        }
      }
    }
  }
  return res.status(404).send({ error: "This applicant was not found" });
});
// accept or reject applicant //put application // new applicant
api.post("/applications/:appId/applicants", (req, res) => {
  for (let i = 0; i < applications.length; i++) {
    if (applications[i].id == req.params.appId) {
      let applicants = applications[i].applicants;
      for (let j = 0; j < applicants.length; j++) {
        if (applicants[j].id == req.body.id) {
          return res.status(400).send({
            response: "This applicant has already applied for this"
          });
        }
      }
      const date = new Date();
      let new_applicant = {
        id: req.body.id,
        date_applied: `${date.getDate()}/${date.getMonth()}/${date.getYear()}`,
        status: "pending"
      };
      applicants.push(new_applicant);
      return res.status(200).send({
        response: "The applicant was successfully added",
        applicants
      });
    }
  }
  return res.status(404).send({ error: "This applicant was not found" });
});

// apply for application // put application
api.put("/applications/:appId/applicant/:id",(req,res)=>{
    
    let applicant = applications[req.params.appId].applicant[req.params.id];
    if(!applicant){
        return res.status(404).send({ response: "This applicant is not found" });
    }
    
    applicant.status = req.body.status;
    
});

// new company
api.post("/company", (req, res) => {
  let company = {
    id: companies.length + 1,
    company_name: req.body.company_name,
    company_brief_description: req.body.company_brief_description,
    company_address: req.body.company_address,
    company_website: req.body.company_website
  };

  for (let i = 0; i < companies.length; i++) {
    if (companies[i].name == req.body.name) {
      return res.status(400).send({
        response: "There is already a company with that name of our database"
      });
    }
    if (companies[i].website == req.body.website) {
      return res.status(200).send({
        response: "The website name already exists for another company"
      });
    }
  }

  companies.push(company);
  return res.status(200).send({ response: "Added new company" });
});

api.get("/companies", (req, res) => {
  return res.status(200).send(companies);
});
// from drivers' perspective
//get all available applications/jobs
api.get("/applications", (req, res) => {
  return res.status(200).send(applications);
});
// get specific application
api.get("/applications/:id", (req, res) => {
  for (let i = 0; i < applications.length; i++) {
    if (applications[i].id == req.params.id) {
      return res.status(200).send(applications[i]);
    }
  }
  return res.status(404).send({ response: "That application was not found!" });
});

// get cv
api.get("/users/:id/cv", (req, res)=>{
  
})

// update cv
api.put("/users/:id/cv", uploadCV.single('userCV'),(req, res)=>{
  console.log(req.file);
  let user;
    for(let i = 0; i< users.length; i++){
      if (users[i].id == req.params.id){
        user = users[i];
        break;
      }
    }
    if (!user){
      res.status(404).send({message: "user not found"});
    }
    if(user.cv){

      try{
        fs.unlinkSync(user.cv);
        console.log(user.cv + 'file removed')
      }catch(err){          
        console.log(err);
        console.error(err);
      }
    }
    user.cv = req.file.path;
    console.log(user.cv);
     res.send({message:'CV updated'}) ;
});


export default api;
