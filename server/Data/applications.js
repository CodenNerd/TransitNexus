let applications = [
  {
    id: 1,
    employer_id: 1,
    job_title: "driver",
    job_description: `kkfoksok`,
    job_requirements: ["SSCE", "Drivers License"],
    company_id: 11,
    application_start: `5/06/2019`,
    application_deadline: `5/07/2019`,
    applicants: [
      {
        id: 2,
        date_applied: `2/2/2019`,
        application_status: `accepted`
      },
      {
        id: 3,
        date_applied: `2/2/2019`,
        application_status: `pending`
      }
    ]
  },
  {
    id: 2,
    employer_id: 2,
    job_title: "driver",
    job_description: `kkfoksok`,
    job_requirements: ["SSCE", "Drivers License"],
    company_id: 8,
    application_start: `7/07/2019`,
    application_deadline: `5/08/2019`,
    applicants: [
        {
          id: 2,
          date_applied: `2/2/2019`,
          application_status: `accepted`
        },
        {
          id: 3,
          date_applied: `2/2/2019`,
          application_status: `pending`
        }
      ]
  }
];

export default applications;
