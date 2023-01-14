import { useState, useEffect } from "react";
import dataDoctors from "../data/doctors";
import AddDoctor from "./AddDoctor";
import DoctorListItem from "./DoctorListItem";

// Arrow notation function
const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (dataDoctors) {
      setDoctors(dataDoctors);
    }
  }, []);

  const handleAddDoctor = (name) => {
    const newDoctor = { id: Date.now(), name };
    const newDoctorsList = [...doctors, newDoctor];
    setDoctors(newDoctorsList);
  };

  return (
    <>
      <h2>Doctors List</h2>
      <AddDoctor onAddDoctor={handleAddDoctor} />
      {doctors.map((doctor) => (
        <DoctorListItem key={doctor.id} id={doctor.id} name={doctor.name} />
      ))}
    </>
  );
};

// // This is the same function in regular function notation
// function DoctorsList() {
//   return <h2>Doctors List</h2>;
// }

export default DoctorsList;
