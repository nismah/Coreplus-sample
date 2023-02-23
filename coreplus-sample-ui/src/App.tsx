import "./app.css";
import axios from "axios"
import React, { useEffect, useState } from "react"

const UsingAxios = () => {
  const [users, setUsers] = useState<any[]>([])
  const [supervisorsList, setSupervisors] = useState<any[]>([])
  const [practitionersList, setPractitioners] = useState<any[]>([])
  const [financialReport, setFinancialReport] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [appointmentDetails, setAppointmentDetails] = useState<any[]>([])
  let [inputList, setInputList] = useState([]);
  let [appointmentViewList, setAppointmentViewList] = useState([]);

  const fetchData = () => {
    axios.get("https://localhost:44348/practitioners").then(response => {
      setUsers(response.data)
    })
  }

  const fetchPractitionersSorted = () => {
    axios.get("https://localhost:44348/practitioners/sorted").then(response => {
      setPractitioners(response.data.practitioners)
      setSupervisors(response.data.supervisors)
    })
  }

  function showDate(id: any)
  {
    const test = document.getElementsByClassName("dateBox");
    for (let i = 0; i < test.length; i++) {
      test[i].setAttribute("hidden", "true");
    }
 let p = document.getElementById(id +"date");

 if (p != undefined) {
  if(p.hidden)
  {
  p.hidden = false;
}}
}

  function getReport(id: any)
  {
    inputList.splice(0, inputList.length);
    ClearAppointments();
    let startDate = (document.getElementById(id + 'start') as HTMLInputElement).value;
    let endDate = (document.getElementById(id + 'end') as HTMLInputElement).value
    let url = "https://localhost:44348/practitioners/getFinancialReport/";
    url += id;
    url += "?startDate=" + startDate +"&endDate=" + endDate;
    axios.get(url).then(response => {
      setFinancialReport(response.data)
    })
 
     SetValues(financialReport, id);  
  }

  function getPractitionerAppointments(id: any)
  {
    ClearAppointments();
    let url = "https://localhost:44348/practitioners/appointment/";
    url += id;
    console.log(url);
    axios.get(url).then(response => {
      setAppointments(response.data)
    })

    SetAppointmentsInView(appointments, id);
  }

  
  function getAppointmentDetails(id: any)
  {
    let url = "https://localhost:44348/practitioners/appointment/details/";
    url += id;
    console.log(url);
    axios.get(url).then(response => {
      setAppointmentDetails(response.data)
    })
  }

  function SetValues(financialReport, id)
  {
    setInputList(inputList.concat(<div><p id= {id + 'report'}>Revenue Per Month: {financialReport.revenuePerMonth}  Cost Per Month: {financialReport.costPerMonth}</p><button onClick ={() => getPractitionerAppointments(id)}>Get Appointments</button></div>));    
  }

  function SetAppointmentsInView(appointments, id)
  {
    setAppointmentViewList(appointmentViewList.concat(<div>Appointments<ul>{appointments.map(user => (<div><li>Date: {user.date}, ClientName: {user.client_name}, Duration: {user.duration}, Revenue:{user.revenue}, Cost: {user.cost}</li></div>))}</ul></div>));
  }

  function ClearAppointments()
  {
    appointmentViewList.splice(0, appointmentViewList.length);
  }

  useEffect(() => {
    fetchData(),
    fetchPractitionersSorted()
  }, [])

  return (
    <div className="h-screen w-full appshell">
      <div className="header flex flex-row items-center p-2 bg-primary shadow-sm">
        <p className="font-bold text-lg">coreplus</p>
      </div>
      <div className="supervisors">Supervisor practitioners
      {supervisorsList.length > 0 && (
        <ul>
          {supervisorsList.map(user => (
          <div>
            <li className="button" onClick={() => showDate(user.id)} key={user.id}>{user.name}</li>
        <div className="dateBox" id={user.id +"date"} hidden = {true}>
        <p>Start Date: </p>
        <input className="textBox" type="text" id={user.id + 'start'} placeholder="mm/dd/yyyy"></input>
        <p>End Date: </p>
        <input className="textBox" type="text" id={user.id + 'end'} placeholder="mm/dd/yyyy"></input>
        <button onClick={() => getReport(user.id)}>Get</button>
        </div>
        </div>
          ))}
        </ul>)}
        </div>
      <div className="praclist">Remaining Practitioners
      {practitionersList.length > 0 && (
        <ul>
          {practitionersList.map(user => (
             <div>
             <li className="button" onClick={() => showDate(user.id)} key={user.id}>{user.name}</li>
         <div className="dateBox" id={user.id +"date"} hidden = {true}>
         <p>Start Date: </p>
         <input className="textBox" type="text" id={user.id + 'start'} placeholder="mm/dd/yyyy"></input>
         <p>End Date: </p>
         <input className="textBox" type="text" id={user.id + 'end'} placeholder="mm/dd/yyyy"></input>
         <button onClick={() => getReport(user.id)}>Get</button>
         </div>
         </div>
          ))}
        </ul>)}
      </div>
      <div className="pracinfo">Practitioner Report UI
      <div>
      {inputList}
    </div>
    <div>
    {appointmentViewList}
    </div>
      </div>
    </div>      
  );
}

export default UsingAxios
