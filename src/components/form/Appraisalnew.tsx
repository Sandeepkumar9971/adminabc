"use client"
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const roles = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  PARTICIPANT: "PARTICIPANT",
  PEER: "PEER",
  JUNIOR: "JUNIOR",
};

const appraisalQuestions = [
  { id: 1, question: "How do you rate your performance this year?" },
  { id: 2, question: "What are your strengths?" },
  { id: 3, question: "What areas can you improve in?" },
];

const formSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  strengths: z.string().min(1, "Strengths are required"),
  improvements: z.string().min(1, "Improvement area is required"),
});



const AppraisalForm = ({ role, participantName }:any) => {
  const [submittedData, setSubmittedData] = useState<any>({});

  

  const handleSubmit = (values:any) => {
    console.log("Submitted Values:", values);
  };

  return (
    <div className="appraisal-form">
      <h2>{role} Appraisal for {participantName}</h2>
      
      <Formik
        initialValues={{
          rating: submittedData?.rating || "",
          strengths: submittedData?.strengths || "",
          improvements: submittedData?.improvements || "",
        }}
        validationSchema={toFormikValidationSchema(formSchema)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            <div className="form-group">
              <label>Rating (1 to 5)</label>
              <Field
                name="rating"
                type="number"
                className="input"
                placeholder="Enter your rating"
              />
              <ErrorMessage
                name="rating"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="form-group">
              <label>Strengths</label>
              <Field
                name="strengths"
                type="text"
                className="input"
                placeholder="Enter your strengths"
              />
              <ErrorMessage
                name="strengths"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="form-group">
              <label>Areas of Improvement</label>
              <Field
                name="improvements"
                type="text"
                className="input"
                placeholder="Enter your areas of improvement"
              />
              <ErrorMessage
                name="improvements"
                component="div"
                className="text-red-500"
              />
            </div>

           
            

            <div className="form-group">
              <button type="submit" className="submit-btn">
                Submit Appraisal
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const Appraisalnew = () => {
  const userRole = roles.MANAGER;
  const participantName = "Vikas";

  return (
    <div>
      {/* Pending UI And Submission */}
      <AppraisalForm role={userRole} participantName={participantName} />
    </div>
  );
};

export default Appraisalnew;
