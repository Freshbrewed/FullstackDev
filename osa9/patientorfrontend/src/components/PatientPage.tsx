import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatient } from "../state/reducer"



const PatientPage: React.FC = () => {

    const [{ patient, diagnosis }, dispatch] = useStateValue();
    const { id }  = useParams<{ id: string }>();


   
    useEffect(() => {
        const fetchPatientInfo = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                    );
                  // console.log("use effect", patient);
                 // dispatch({ type: "SET_PATIENT", payload: patient });
                 dispatch(setPatient(patient));
                  } catch (e) {
                    console.error(e);
                  }
                };
                if (!patient[id]) {
                  fetchPatientInfo();
                }

              },[patient, dispatch, id]);
      
    
   /* const test = Object.values(patient).map((patient: Patient) => 
      patient.entries.map((entry: Entry) => 
      entry.description
      )) */

      
      
          

    if (patient[id]) {
        return (
            <div>
                 <h2>{patient[id].name}</h2> 
                 <p>Date of birth: {patient[id].dateOfBirth}</p>
                 <p>SSN: {patient[id].ssn}</p>
                 <p>Occupation: {patient[id].occupation}</p>
                 <p>Gender: <b>{patient[id].gender}</b></p>
                 <div>
                   <h4>entries</h4>
                   <div>
                     {Object.values(patient).map((patient: Patient) => 
                       patient.entries.map((entry: Entry) => 
                       <div key={entry.id}>
                          {entry.date} {entry.description}
                          <ul>
                            {entry.diagnosisCodes?.map((code: string) =>
                            <li key={code}>
                              {code}: {diagnosis[code]?.name}
                            </li>
                            )}
                          </ul>
                        </div>
                      ))}
                   
                   </div>
                </div>
          </div>
        );
    }
    return <div>Loading...</div>;
};

export default PatientPage;