import DoctorsList from "./components/DoctorsList";
import "./App.css";

function App(props) {
  return (
    <>
      <h1> Hello, {props.name}</h1>
      <DoctorsList />
    </>
  );
}

export default App;
