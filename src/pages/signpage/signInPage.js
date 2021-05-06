import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input';
import { useHistory } from 'react-router-dom';
import firebase from '../../firebase';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const signIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push('/')
            })
            .catch(err => {
                console.log(err);
            });
    } 
    
    return(
        <div className="singUp-container">
            <div className="signUp-form-container">
                <h1>SIGN IN</h1>
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
                <button className='signUpBtn' onClick={ signIn }>SIGN IN</button>
                <h2 className='haveAccount'>
                    Need an account? 
                    <span className='goToSignIn' onClick={() => { history.push('/')}}>
                        Sign up!
                    </span>
                </h2>
            </div>
        </div>
    )
}

export default SignInPage;