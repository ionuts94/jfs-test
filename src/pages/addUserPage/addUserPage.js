import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input';
import firebase from '../../firebase';
import $ from 'jquery';
import './addUserPage.css';

const AddUserPage = ({ handleAddedUser }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [grade, setGrade] = useState('');

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangeGrade = (e) => {
        setGrade(e.target.value);
    }

    const checkInputs = () => {
        let errors = '';

        errors += firstName.length < 2 ? 'First name must be at least 2 characters long \n' : '';
        errors += lastName.length < 2 ? 'Last name must be at least 2 characters long \n' : '';
        errors += email.length < 3 ? 'Email must be at least 3 characters long \n' : '';
        errors += !email.includes("@") ? 'Email format should be something@otherthing \n' : '';
        errors += !grade || (grade < 0 || grade > 10) ? 'Grades should be between 0 and 10 \n' : '';

        return errors;
    }  

    const insertLearnerFunction = async () => {
        const db = firebase.firestore();
        const items = await db.collection('learners').get();

        const checkTheImputs = checkInputs();
        if(checkTheImputs) {
            alert(checkTheImputs);
        } else {
            await db.collection('learners')
                .doc(`${items.docs.length + 1}`)
                .set({
                    'id': items.docs.length + 1,
                    'firstName': firstName,
                    'lastName': lastName,
                    'email': email,
                    'grade': grade
                });
            
            $('.inputs-container').addClass('hidden');
            $('.addConfirmation').removeClass('hidden');
            setTimeout(()=> {
                history.push('/');
                handleAddedUser();
            }, 1000)
        }
    }

    const history = useHistory();

    const goBack = () => {
        history.push('/');
    }

    return(
        <div className="add-user-container">
            <h1 className="backBtn" onClick={ goBack } >GO BACK</h1>
            <div className="addConfirmation hidden">
                <h1>Learner inserted successfully.</h1>
                <h2>Redirecting...</h2>
            </div>
            <div className="inputs-container">
                <h1>ADD LEARNER</h1>
                <FormInput type="text" name="firstName" placeholder="First Name" handleChange={ handleChangeFirstName } />
                <FormInput type="text" name="lastName" placeholder="Last Name" handleChange={ handleChangeLastName } />
                <FormInput type="text" name="email" placeholder="Email" handleChange={ handleChangeEmail } />
                <FormInput type="number" name="grade" placeholder="Grade" handleChange={ handleChangeGrade } />
                <button className="insertLrnBtn" onClick={ insertLearnerFunction } >INSERT LEARNER</button>
            </div>
            
        </div>
    )
}

export default AddUserPage;