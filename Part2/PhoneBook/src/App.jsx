/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import library from "./services/server";

const Person = ({ person, setPersons }) => {
  const { name, id } = person;

  const deleteHandler = () => {
    const ans = window.confirm("Do you really want to delete?");
    if (ans) {
      library
        .remove(id)
        .then(() => library.getAll())
        .then((response) => setPersons(response.data));
    }
  };
  return (
    <div>
      <p key={name}>{name}</p>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
};
const Persons = ({ persons, filter, setPersons }) => {
  // console.log(persons);
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <Person key={person.name} person={person} setPersons={setPersons} />
    ));
};

const Filter = ({ filter, setFilter }) => {
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };
  return (
    <>
      Search Filter : <input value={filter} onChange={filterHandler} />
    </>
  );
};

const SuccessMessage = ({ name, operation }) => {
  return (
    <p className="success">
      {operation} {name}
    </p>
  );
};

const ErrorMessage = () => {
  return <p className="error">This message was already deleted </p>;
};

const Form = ({
  newName,
  persons,
  setNewName,
  setNewNumber,
  setPersons,
  newNumber,
}) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [operation, setOperation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const clearInputField = () => {
      setNewName("");
      setNewNumber("");
    };
    const personExists = persons.find((person) => person.name === newName);
    const numberSame = persons.find(
      (person) => person.number === newNumber && person.name === newName
    );

    // [Case 1] : Person does not exist
    if (!personExists) {
      const newObject = {
        name: newName,
        number: newNumber,
      };
      library.create(newObject).then((response) => {
        setSuccess(true);
        setOperation("Added");
        setTimeout(() => {
          setSuccess(false);
          clearInputField();
        }, 5000);
        setPersons(persons.concat(response));
      });
    }
    // [Case 2] : Person does exist but we got a updated number
    else if (personExists && !numberSame) {
      const ans = confirm(
        `${newName} is already added to phonebook, replace the old number ?`
      );
      if (ans) {
        const newObject = {
          id: personExists.id,
          name: newName,
          number: newNumber,
        };
        library
          .update(newObject, personExists.id)
          .then((response) => {
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
              clearInputField();
            }, 2000);
            setOperation("Updated");
            setPersons(response);
          })
          .catch(() => {
            setError(true);
            setTimeout(() => {
              setError(false);
              clearInputField();
            }, 2000);

            library.getAll().then((response) => setPersons(response.data));
          });
      }
    } else {
      alert("We already have a entry with same name and number");
    }
  };
  const nameInputHandler = (e) => {
    setNewName(e.target.value);
  };

  const numberInputHandler = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {success ? (
        <SuccessMessage name={newName} operation={operation} />
      ) : (
        <></>
      )}
      {error ? <ErrorMessage /> : <></>}
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>
              <input value={newName} onChange={nameInputHandler} />
            </td>
          </tr>

          <tr>
            <td>Number:</td>
            <td>
              <input value={newNumber} onChange={numberInputHandler} />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">add</button>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    library.getAll().then((response) => {
      // console.log(response.data);
      setPersons(response.data);
    });
  };

  useEffect(hook, []); // will fetch every time the component renders.

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Filter</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <br />

      <h2>Add a new name</h2>
      <Form
        newName={newName}
        persons={persons}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  );
};

export default App;
