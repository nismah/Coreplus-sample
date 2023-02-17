import "./app.css";
import axios from "axios"
import React, { useEffect, useState } from "react"

const UsingAxios = () => {
  const [users, setUsers] = useState<any[]>([])
  const [supervisorsList, setSupervisors] = useState<any[]>([])
  const [practitionersList, setPractitioners] = useState<any[]>([])
  const [financialReport, setFinancialReport] = useState<any[]>([])

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

  function change()
  {
    console.log("change");
  }

  function showDate(id: any)
  {
 let p = document.getElementById(id +"date");

 if(p?.hasAttribute("hidden"))
 {
  p?.removeAttribute("hidden"); 
 }
 else
 {
  p?.setAttribute("hidden", "true");
 }
  }

  function getReport(id: any)
  {
    let p = (document.getElementById(id) as HTMLInputElement).value
    let url = "https://localhost:44348/practitioners/getFinancialReport/";
    url += id;
    url += "?startDate=" + p +"&endDate=" + p
    console.log(url);
    axios.get(url).then(response => {
      setFinancialReport(response.data)
      console.log(response);
    })

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
        <div id={user.id +"date"} hidden = {true}>
        <p>Date: </p>
        <input type="text" id={user.id} placeholder=" mm/dd/yyyy"></input>
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
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>)}
      </div>
      <div className="pracinfo">Practitioner Report UI

      </div>
    </div>      
  );
}

export default UsingAxios
