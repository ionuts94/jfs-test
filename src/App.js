import { useState, useEffect } from 'react';
import HomePage from './pages/homepage/homepage'
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Individual from './pages/individual/individual';
import firebase from './firebase';
import Header from './components/header/header';
import AddUserPage from './pages/addUserPage/addUserPage';
import SignPage from './pages/signpage/signpage';

function App() {
  const [logedUsr, setLogedUsr] = useState(false);
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addedUser, setAddedUser] = useState(0); //used to re-render after adding a user

  const ref = firebase.firestore().collection('learners').orderBy('id', 'asc');

  const getLearners = () => {
    setLoading(true);
    ref.get()
      .then(item => {
        const items = item.docs.map((doc) => doc.data());
        setLearners(items);
        setLoading(false);
      })
  }

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        setLogedUsr(true);
      } else {
        setLogedUsr(false);
      }
    })
  }

  const handleRerender = () => {
    setAddedUser(user => user + 1);
  } 
  
  useEffect(() => {
      authListener();
      getLearners();

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedUser]);




  if(!logedUsr) {
    return <SignPage />
  } else {
      if(loading) {
        return <h1 className="loading">Loading...</h1>  // display loading while fetching data
      } else {
          return (
            <div className="App">
              <Header />
              <Switch>
                <Route path="/" exact component={() => <HomePage learners={ learners } />} />
                <Route path="/individual/:id" exact component={ () => <Individual handleUpdatedUser={ handleRerender } /> } />
                <Route path='/add' exact component={ ()=> <AddUserPage handleAddedUser={ handleRerender } />} />
              </Switch>
            </div>
          );
      }
  }
}

export default App;
