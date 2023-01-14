import { useState } from "react";

const AddDoctor = (props) => {
  const [doctorName, setDoctorName] = useState("");

  const handleChangeName = (event) => {
    setDoctorName(event.target.value);
  };

  const handleAddDoctor = () => {
    props.onAddDoctor(doctorName);
  };

  return (
    <div>
      <input type="text" value={doctorName} onChange={handleChangeName} />
      <button onClick={handleAddDoctor}>Add Doctor</button>
    </div>
  );
};

export default AddDoctor;
