# DeltaHacks React Workshop

## Create a React App

1. Open a bash terminal in VS Code​.

1. To make sure you are not going to use an old version of `create-react-app`, run this command `npm uninstall -g create-react-app`.

   > **Note:** If the `create-react-app` command hangs and does nothing for over a minute, your create-react-app may be out of date. Cancel the process and run the following to uninstall it. Make sure you are installing using `npx` and `node version 16`, old versions of create-react-app installed globally (-g) are not working anymore:

1. Run the following command to create a react app: `npx create-react-app delta-hacks-react-workshop`​. Do not copy this command, type it yourself as copying can cause issues. We're also using this React app as a starting point for the Redux course project (up next).

1. Move to the directory that was just created: `cd delta-hacks-react-workshop`​, and open it up in your text editor.

1. Open `./src/index.js`. and examine the file. The line `ReactDOM.render(<App />, document.getElementById('root'));` mounts the App component onto the “root” element in index.html. The application stays on index.html the entire time.

1. Open `./src/App.js`. This is your top-most application component. A React application is a tree of components. All future components we write will be children or grandchildren of this component.

1. Look at the contents of `package.json` and the `node_modules` folder. (dependencies).

1. Run your React application: `npm start`​.

1. Replace the contents of `App.js` with the following:

   ```jsx
   function App(props) {
     return <h1>Hello, {props.name}</h1>;
   }

   export default App;
   ```

   Save the changes and fast refresh shall update the view in browser for you automatically.

1. Update ReactDOM.render() line in `index.js` to pass in the `name` prop.

```jsx
ReactDOM.render(
  <React.StrictMode>
    <App name="Delta Hacks" />
  </React.StrictMode>,
  document.getElementById("root")
);
```

Take a look at React DevTools and observe the component tree.

## Adding functionality to your app

Create a folder called `components` under the `src` folder. This is where the component files will be stored.

### 1. Show a list of doctors

**Goal**: Show a list of doctor names taken from `src/data/doctors.js`.

**Concepts**:

- Functional Components
- Using `useEffect` and `useState` hooks
- Using local state
- Using `key` prop for lists

1. ​Create a file called `DoctorsList.js` in the `src/components` folder.

2. Create a component for DoctorsList that renders the title of the list.

   ```jsx
   function DoctorsList() {
     return <h2>Doctors List</h2>;
   }

   export default DoctorsList;
   ```

3. Display the `DoctorsList` component in App.js.

   Note that React components need to return only one top-level component. The `<>` syntax is to denote a [React Fragment](https://reactjs.org/docs/fragments.html) to achieve this.

```jsx
import DoctorsList from "./components/DoctorsList";

function App(props) {
  return (
    <>
      <h1>Hello, {props.name}</h1>
      <DoctorsList />
    </>
  );
}
```

4. Back in `DoctorsList` component, we'll need to invoke an API to get the list of doctors, and then store that data in the local state of the component with the help of `useState` hook.

5. Set up the state for the list of doctors with the [`useState` hook](https://reactjs.org/docs/hooks-state.html).

```jsx
const [doctors, setDoctors] = useState([]);
```

**NOTE:** We are setting the list to be empty initially.

6. Make sure to also import the `useState` hook at the top.

   ```jsx
   import { useState } from "react";
   ```

7. Next, use the import the list of doctors in `src/data/doctors` inside the `useEffect` hook to mimic a service call to something like an api.

```jsx
import dataDoctors from '../data/doctors';
...
```

```jsx
useEffect(() => {
  setDoctors(dataDoctors);
}, []);
```

Check out the console in the browser. You should see the data printed there.

8. Now that we have the list of doctors, let's store them in the local component state using the `setDoctors` function that we had initialized in the previous steps. This will update the `doctors` variable with the data from the API.

   ```jsx
   ...
   const [doctors, setDoctors] = useState([]);
   ...
   useEffect(() => {
    setDoctors(dataDoctors);
   }, []);
   ```

9. Display the list of doctors taken from the local state.

```jsx
import { useEffect, useState } from "react";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setDoctors(dataDoctors);
  }, []);

  return (
    <>
      <h2>Doctors List</h2>
      {doctors.map((doctor) => (
        <div>{doctor.name}</div>
      ))}
    </>
  );
}

export default DoctorsList;
```

11. Go to your browser. You should see the `Doctors List` heading and the list of doctor names.

12. Check out the React DevTools and observe where the `doctors` array in state is for that component.

13. Uh oh! Do you see a warning in the console? Let's try to fix that. In `DoctorsList`, add the `key` prop to the repeating element:

```jsx
return (
  <>
    <h2>Doctors List</h2>
    {doctors.map((doctor) => (
      <div key={doctor.id}>{doctor.name}</div>
    ))}
  </>
);
```

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity

[Learn more about keys in lists here](https://reactjs.org/docs/lists-and-keys.html).

### 2. Creating a DoctorListItem component

**Goal**: Nothing new changes in the browser, but we are doing some refactoring.

**Concepts**:

- Functional component (arrow function)
- PropTypes
- Component tree and passing props

When working with React, we need to think in _components_. For example, in `DoctorsList`, right now we're only displaying the name. Next, we need to be able to click on the doctor and show details, or delete the doctor. That's a lot of functionality that is gonna clutter up the `DoctorsList` component.

To avoid that clutter, we can extract each doctor into a `DoctorListItem` component.

1.  Create a file called `DoctorListItem.js`.

1.  Create a `DoctorListItem` functional component.

    We can also destructure the props here to take in `id` and `name`:

    ```jsx
    function DoctorListItem({ id, name }) {
      return <div>{name}</div>;
    }

    export default DoctorListItem;
    ```

1.  Let's add PropTypes! [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) helps developers catch bugs using type checking. You will need to install `prop-types` as a dependency.

    ```sh
    npm i prop-types
    ```

    Then, import `PropTypes` in `DoctorListItem.js`:

    ```jsx
    import PropTypes from "prop-types";

    function DoctorListItem({ id, name }) {
      return <div>{name}</div>;
    }

    DoctorListItem.propTypes = {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    };

    export default DoctorListItem;
    ```

1.  Lastly, update `DoctorsList` to show the new component for `DoctorListItem`.

    ```jsx
    import DoctorListItem from './DoctorListItem';
    ...
    return (
      <>
        <h2>Doctors List</h2>
        {doctors.map((doctor) => (
          <DoctorListItem key={doctor.id} id={doctor.id} name={doctor.name} />
        ))}
      </>
    );
    ```

1.  In your browser, there should be no changes to what is displayed. However if you check the React DevTools, you'll see new components for `DoctorListItem`.

### 3. Add a doctor

**Goal**: A text input and button to add a doctor. Type a name and clicking on the button will log the name in your browser console.

**Concepts**:

- Controlled components
- Uncontrolled components
- useState, useRef hooks

Let's add functionality for adding a doctor to our list. In this exercise we'll add just the **name** for a doctor to keep things simple.

Note that there are 2 ways to handle this in React: [Uncontrolled](https://reactjs.org/docs/uncontrolled-components.html) or [Controlled Components](https://reactjs.org/docs/forms.html#controlled-components). We will look at both approaches.

First let's set up the UI components, the text input and button.

1. Create a file called `AddDoctor.js`.

2. Create an `AddDoctor` component. It should have a text input for the name and a button. Render the component in `DoctorsList`, just before displaying all of the doctors.

   ```jsx
   const AddDoctor = (props) => {
     return (
       <div>
         <input type="text" />
         <button>Add Doctor</button>
       </div>
     );
   };

   export default AddDoctor;
   ```

   In `DoctorsList.js`:

   ```jsx
   import AddDoctor from './AddDoctor';
   ...
   return (
     <>
       <h2>Doctors List</h2>
       <AddDoctor />
       ...
     </>
   );
   ```

3. You should see a text input and button in your browser.

#### Controlled Components

Let's first take a look at implementing this with [Controlled Components](https://reactjs.org/docs/forms.html#controlled-components).

1. In `AddDoctor`, set up the state for the name with the [`useState` hook](https://reactjs.org/docs/hooks-state.html).

   ```jsx
   const [doctorName, setDoctorName] = useState("");
   ```

1. Make sure to import the `useState` hook at the top.

   ```js
   import { useState } from "react";
   ```

1. Add an event handler to the input element whenever its value changes. Set its value to be the one stored in `doctorName` state.

   ```jsx
   const AddDoctor = (props) => {
     const [doctorName, setDoctorName] = useState("");

     const handleChangeName = (event) => {
       setDoctorName(event.target.value);
     };

     return (
       <div>
         <input type="text" value={doctorName} onChange={handleChangeName} />
         <button>Add Doctor</button>
       </div>
     );
   };
   ```

1. Add an event handler that will be triggered when the AddDoctor button is clicked (`onClick` prop for the `button` element). We want it to take the doctor name and pass it up to the `DoctorsList` component to add to the list of doctors. For now, we'll do a console.log to check that we have the correct value for the doctor name.

   In `AddDoctor.js`:

   ```jsx
   ...
   const handleAddDoctor = () => {
     console.log(doctorName);
   };

   return (
     <div>
       <input type='text' value={doctorName} onChange={handleChangeName} />
       <button onClick={handleAddDoctor}>Add Doctor</button>
     </div>
   );
   ```

1. Test the component! You should see whatever you typed into the input show up in the browser console after you click on the button.

#### Uncontrolled Components

Now, let's take a look at implementing this with [Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html).

1. Comment out the controlled component code so that you have a reference for it. Copy-paste the starting code again.

   ```jsx
   import React from "react";

   const AddDoctor = (props) => {
     return (
       <div>
         <input type="text" />
         <button>Add Doctor</button>
       </div>
     );
   };

   export default AddDoctor;
   ```

1. Set up the ref with the [`useRef` hook](https://reactjs.org/docs/hooks-reference.html#useref) and a `ref` prop on the `input` element.

   ```jsx
   const doctorNameInputRef = useRef(null);
   ...
   <input type='text' ref={doctorNameInputRef} />
   ```

1. Make sure to import the `useRef` hook at the top.

   ```js
   import { useRef } from "react";
   ```

1. Similar to a controlled component, we want to add an event handler that will be triggered when the AddDoctor button is clicked. To get the value from the ref, use `doctorNameInputRef.current.value`.

   ```jsx
   const handleAddDoctor = () => {
     console.log(doctorNameInputRef.current.value);
   };

   return (
     <div>
       <input type="text" ref={doctorNameInputRef} />
       <button onClick={handleAddDoctor}>Add Doctor</button>
     </div>
   );
   ```

1. Test the component! You should see whatever you typed into the input show up in the browser console after you click on the button.

React recommends using **controlled components** in forms, so we recommend commenting the code for uncontrolled components and using the controlled component going forward.

### 4. Adding a doctor to the list

**Goal**: When the Add Doctor button is clicked, the name is added to the bottom of our list of doctors.

**Concepts**:

- Passing a functions as props

With our input and button set up, we can now add a doctor to the list. We do this by passing in a prop from `DoctorsList` to `AddDoctor`.

`DoctorsList` is in charge of storing the state for our list of doctors, so we need to pass the `name` value from `AddDoctor` to `DoctorsList`.

1. In `AddDoctor.js`, replace the `console.log` with the call to the prop.

   ```js
   const handleAddDoctor = () => {
     props.onAddDoctor(doctorName); // using controlled name
   };
   ```

1. Pass the `onAddDoctor` prop to the `AddDoctor` component from the `DoctorsList`. We will be creating the `handleAddDoctor` function in the next step.

   ```jsx
   <AddDoctor onAddDoctor={handleAddDoctor} />
   ```

1. Set up the function to add a doctor to the `doctors` list in state.

   You can try using the POST method from the REST API here, or just set it directly in state.

   ```jsx
   const handleAddDoctor = (name) => {
     const newDoctor = { id: Date.now(), name: name };
     const newDoctorsList = [...doctors, newDoctor];
     setDoctors(newDoctorsList);
   };
   ```

1. Test your changes. You should see the new name get added to the end of the list.

1. Uh oh! We have a warning in the console. This time, it's about an invalid prop being specified. What could've caused that?

   Let's look in `DoctorsList`. The new doctor `id` is being specified as a `Number`, when it's in fact expecting a `String` (as the propTypes for `DoctorListItem` tell us). Let's correct that:

   ```jsx
   const handleAddDoctor = (name) => {
     const newDoctor = { id: Date.now().toString(), name: name };
     const newDoctorsList = [...doctors, newDoctor];
     setDoctors(newDoctorsList);
   };
   ```

1. **Bonus Individual exercise:** Try clearing the name input after a doctor is added to the list.

### 5. Delete a doctor

**Goal**: Each doctor has a delete icon beside their name. When the delete icon is clicked, the doctor is removed from the list.

**Concepts**:

- Nothing new, this will be review!
- Similar pattern to adding a doctor to the list

1.  Add the button to delete the doctor and the handler placeholder for when the button is clicked.

    ```jsx
    function DoctorListItem({ id, name, onDeleteDoctor }) {
      function handleDeleteDoctor() {
        console.log("TODO: delete doctor...");
      }

      return (
        <div>
          <button onClick={handleLoadDetails}>{name}</button>
          <button onClick={handleDeleteDoctor}>X</button>
          ...
        </div>
      );
    }

    export default DoctorListItem;
    ```

2.  The `DoctorsList` component is responsible for storing the state of the full list of doctors. So when a `DoctorListItem`'s delete button is clicked, the `DoctorsList` needs to know about that event and delete the doctor from its state.

    We will pass that deleteDoctor handler from the parent component (`DoctorsList`) to the child component (`DoctorsListItem`) as a prop.

    In `DoctorListItem.js`:

    ```jsx
    function handleDeleteDoctor() {
      onDeleteDoctor(id); // this is coming from props, it was destructured inline in the line above
    }
    ```

    In `DoctorList.js`, add the prop and the corresponding function.

    ```jsx
    const handleDeleteDoctor = (id) => {
      console.log(`TODO: Delete doctor with id ${id}`);
    };
    ...
    doctors.map(doctor => (
      <DoctorListItem
        key={doctor.id}
        id={doctor.id}
        name={doctor.name}
        onDeleteDoctor={handleDeleteDoctor}
      />
    ));
    ```

3.  Test in the browser! You should be seeing a console log of `TODO: Delete doctor with id: ?` with the appropriate doctor id.

4.  The REST API doesn't have a DELETE endpoint, so we'll fake it for our own purposes. Note that the data deletion will not be persistent.

    ```javascript
    const handleDeleteDoctor = (id) => {
      const newDoctorList = doctors.filter((doc) => doc.id !== id);
      setDoctors(newDoctorList);
    };
    ```
