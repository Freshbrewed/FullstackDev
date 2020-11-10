import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField, DiagnosisSelection, SelectFieldType, TypeOption } from "../AddPatientModal/FormField";
import {  Diagnosis, HospitalEntry } from "../types";



export type EntryFormValues = Omit<HospitalEntry,"id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
  { value: "HealthCheck", label: "HealthCheck" }
];


// eslint-disable-next-line react/prop-types
export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        type: "Hospital",
        specialist: "",
        description: "",
        diagnosisCodes: Array<Diagnosis['code']>(),
        discharge: { 
          date: "",
          criteria: "" 
      }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
                
        if (!values.date || !Date.parse(values.date)) {
          errors.date = "Incorret formatting! Please use YYYY-MM-DD date format.";
        }
        if (!values.type) {
          errors.type = "Currently supporting only Hospital -type.";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.discharge.date || !Date.parse(values.discharge.date)) {
         errors["discharge.date"] = "Incorret formatting! Please use YYYY-MM-DD date format.";
        //  values.discharge.date = "Incorret formatting! Please use YYYY-MM-DD date format.";
        }
        if (!values.discharge.criteria) {
         errors["discharge.criteria"] = requiredError;
        // values.discharge.criteria = requiredError;
        }
        return errors; 
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
              <SelectFieldType
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />     
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;