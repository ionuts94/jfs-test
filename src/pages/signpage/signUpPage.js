import React, { useState } from 'react';
import { useHistory } from 'react-router';
import FormInput from '../../components/form-input/form-input'
import firebase from '../../firebase';
import './signpage.css';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const history = useHistory();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleChangeCPassword = (e) => {
        setCPassword(e.target.value);
    }

    const signUp = () => {
        if(password === cPassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    
                })
                .catch(err => {
                    alert(err.message);
                }) 
        } else {
            alert("Passwords don't match");
        }
    }
 
    return(
        <div className="singUp-container">
            <div className="confirmCreateUsr hidden">
                <h1>User created successfully</h1>
                <h2>Redirecting to login...</h2>
            </div>
            <div className="signUp-form-container">
                <h1>SIGN UP</h1>
                <FormInput 
                    type={'email'}
                    placeholder={'Email'}
                    handleChange={ handleChangeEmail }
                    containerClassName={ 'width100' }
                />
                <FormInput 
                    type={'password'}
                    placeholder={"Password"}
                    handleChange={ handleChangePassword }
                    containerClassName={ 'width100' }
                />
                <FormInput 
                    type={'password'}
                    placeholder={'Confirm password'}
                    handleChange={ handleChangeCPassword }
                    containerClassName={ 'width100' }
                />
                <button className='signUpBtn' onClick={ signUp }>SIGN UP</button>
                <h2 className='haveAccount'>
                    Have an account already? 
                    <span className='goToSignIn' onClick={() => { history.push('/signInPage')}}>
                        Sign in!
                    </span>
                </h2>
            </div>
        </div>
    )
}

export default SignUpPage;