import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";



const PatientPage: React.FC = () => {
   // const [ patient, setPatient ] = useState();
    const [{ patient }, dispatch] = useStateValue();
    const { id }  = useParams<{ id: string }>();
    //const [ newId, setId ] = useState("");   



    console.log(id);
    
    
   // console.log(patient[id]);
    
    
    //const { newid } = useParams<{ newid: string }>();
   // console.log(newid); 

    useEffect(() => {
        const fetchPatientInfo = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                    );
                   console.log("use effect", patient);
                  dispatch({ type: "SET_PATIENT", payload: patient });
                  } catch (e) {
                    console.error(e);
                  }
                };
                if (!patient[id]) fetchPatientInfo();

              },[patient, dispatch, id]);
      

              

    if (patient[id]) {
        return (
            <div>
                 <h2>{patient[id].name}</h2> 
                 <p>Date of birth: {patient[id].dateOfBirth}</p>
                 <p>SSN: {patient[id].ssn}</p>
                 <p>Occupation: {patient[id].occupation}</p>
                 <p>Gender: <b>{patient[id].gender}</b></p>
            </div>

        );
    }
    return <div>Loading...</div>;
};

export default PatientPage;