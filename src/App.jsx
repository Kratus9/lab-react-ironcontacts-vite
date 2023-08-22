import { useState } from "react";
import "./App.css";
import celebrities from "./contacts.json";

function App() {
  const [ contacts, setContacts ] = useState(celebrities.slice(0,5))

  const handleAddRandomContact = () => {
    let randomIndex = Math.floor(Math.random() * celebrities.length);
    let randomContact = celebrities[randomIndex];
    let clone = JSON.parse(JSON.stringify(contacts))
    clone.unshift(randomContact);
    setContacts(clone);
    let repeatedContact = contacts.find((eachContact) => {
      if (eachContact.id === randomContact.id) {
        return true
      }
    });

    if (repeatedContact !== undefined) {
      handleAddContact()
      return
    }
  }

  const handleSortByName = () => {
    let clone = JSON.parse(JSON.stringify(contacts))
    clone.sort((contact1, contact2) => {
      return contact1.name > contact2.name ? 1 : -1
    })

    setContacts(clone)
  }

  const handleSortByPopularity = () => {
    let clone = JSON.parse(JSON.stringify(contacts))
    clone.sort((contact1, contact2) => {
      return contact1.popularity > contact2.popularity ? 1 : -1
    })

    setContacts(clone)
  }

  const handleRemoveContact = (id) => {
    let filteredArr = contacts.filter((eachContact) => {
      if (eachContact.id === id) {
        return false
      }
      else {
        return true
      }
    })

    setContacts(filteredArr)
  }

  return (
    <div>
      <h1>IronContacts</h1>

        <button onClick={handleAddRandomContact}>Add Random Celebrity</button>
        <button onClick={handleSortByName}>Sort by name</button>
        <button onClick={handleSortByPopularity}>Sort by popularity</button>

            <div>
              <table>
                <thead>
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Popularity</th>
                  <th>Won a Oscar</th>
                  <th>Won a Emmy</th>
                </tr>
                </thead>
                  <tbody>
                    {contacts.map((eachContact, i) =>{
                      return (
                        <tr key={contacts.id}>
                          <td><img src={eachContact.pictureUrl} alt={eachContact.name} width={100}/></td>
                          <td>{eachContact.name}</td>
                          <td>{eachContact.popularity.toFixed(2)}</td>
                          <td>{eachContact.wonOscar ? "🏆" : null}</td>
                          <td>{eachContact.wonEmmy ? "🌟" : null}</td>
                          <button onClick={ () => handleRemoveContact(eachContact.id)}>Remove Contact</button>
                        </tr>
                    )})}
                  </tbody>
              </table>
            </div>
    </div>
  );
}



export default App;
