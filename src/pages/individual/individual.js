import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input'
import firebase from '../../firebase';
import $ from 'jquery';
import './individual.css';

const Individual = ({ handleUpdatedUser }) => {
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [learner, setLearner] = useState({});
    const [updatedUsr, setUpdatedUsr] = useState(0);  //create this with the purpose to be used as a dependancy for use effect so the page will re-render after the user was edited

    //initialize state variables which will be used to update learner's details
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [grade, setGrade] = useState('');

    //handle changes functions
    const handleChangeFN = (e) => {
        setFirstName(e.target.value);
    }
    const handleChangeLN = (e) => {
        setLastName(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangeGrade = (e) => {
        setGrade(e.target.value);
    }

    //handle submit update function and check inputs function
    const checkTheInputs = () => {
        let errors = ''; //build errors string msg for invalid inputs
        let usr = {};  //build learner object values for the empty inputs. 
                       //I tried to do it with state but since state is an asynchronous function, the code would be executed before state values would be updated 

        if(firstName.length === 0) {
            usr.firstName = learner.firstName;
        } else if(firstName.length < 2) {
            errors += 'First name should be at least 2 characters long';
        }

        if(lastName.length === 0) {
            usr.lastName = learner.lastName;
        } else if(lastName.length < 2) {
            errors += 'Last name should be at least 2 characters long';
        } 

        if(email.length === 0) {
            usr.email = learner.email;
        } else if(!email.includes('@')) {
            errors += 'Email format should be something@otherthing';
        } 

        if(!grade) {
           usr.grade = learner.grade;
        } else if(grade < 0 || grade > 10) {
            errors += 'Grade should be between 0 and 10';
        }

        return {errors, usr};
    }

    const handleUpdateSubmit = async () => {
        const db = firebase.firestore();

        const { usr, errors } = checkTheInputs(); 

        if(errors) {
            alert(errors);
        } else {
            await db.collection('learners')
                .doc(`${learner.id}`)
                .set({
                    'id': id,
                    'firstName': firstName ? firstName : usr.firstName,
                    'lastName': lastName ? lastName : usr.lastName,
                    'email': email ? email : usr.email,
                    'grade': grade ? grade : usr.grade
                });
            
            $('.learner').addClass('hidden');
            $('.updateLrnBtn').addClass('hidden');
            $('.editConfirmation').removeClass('hidden')
            setTimeout(() => {
                setUpdatedUsr(usr => usr + 1);
                handleUpdatedUser(); // re-render homepage if you go back
            }, 1000) 
        }
    }

    const goBack = () => {
        history.push('/');
    }

    //fetching data functions
    const getUserById = (id) => {
        setLoading(true);
        const db = firebase.firestore();
        const item = db.collection('learners').doc(`${id}`);
        item.get().then(doc => setLearner(doc.data()))
        setLoading(false)
    }
    
    useEffect(() => {
        getUserById(id);

        return() => { 
            setLearner({}); 
            setLoading(false) 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedUsr]);

    if(loading === true) {
        return <h1 className="loading">Loading...</h1>
    } else {
        return(
            <div className="individual-container">
                <h1 id="backBtn" onClick={ goBack } >GO BACK</h1>

                <div className="editConfirmation hidden">
                    <h1>Learner updated successfully.</h1>
                    <h2>Refreshing page...</h2>
                </div>

                <div className="learner" key={id} >
                    <div className='group'>
                        <h1 className="tdetail">First name: </h1>
                        <FormInput 
                            inputClassName={"width50"}
                            containerClassName={"width100"}
                            type={'text'}
                            placeholder={ learner.firstName }
                            name={ 'firstName' }
                            handleChange = { handleChangeFN }
                        />
                    </div>
                    <div className='group'>
                        <h1 className="tdetail">Last name: </h1>
                        <FormInput 
                            inputClassName={"width50"}
                            containerClassName={"width100"}
                            type={'text'}
                            placeholder={ learner.lastName }
                            name={ "learner.lastName"}
                            handleChange={ handleChangeLN }
                        />
                    </div>
                    <div className='group'>
                        <h1 className="tdetail">Email: </h1>
                        <FormInput 
                            inputClassName={"width50"}
                            containerClassName={"width100"}
                            type={'text'}
                            placeholder={ learner.email }
                            name={ 'email' }
                            handleChange={ handleChangeEmail }
                        />
                    </div>
                    <div className='group'>
                        <h1 className="tdetail">Grade: </h1>
                        <FormInput 
                            inputClassName={"width50"}
                            containerClassName={"width100"}
                            type={'number'}
                            placeholder={ learner.grade }
                            name={ 'grade' }
                            handleChange={ handleChangeGrade }
                        />
                    </div>
                </div>
            
                <button className="updateLrnBtn" onClick={ handleUpdateSubmit } >UPDATE DETAILS</button>
            </div>
        );
    }
} 

export default Individual;