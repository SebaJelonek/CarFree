import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { enableAtom, isLoggedInAtom, titleAtom } from '../../../Atoms';
import Form from '../../Layout/Form/Form';
import InputField from '../../Layout/InputField/InputField';
import { useNavigate } from 'react-router-dom';

const passwordRegEx = RegExp(
  '(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}'
);

const Register: React.FC = () => {
  const [, setTitle] = useAtom(titleAtom);
  const [, toggle] = useAtom(enableAtom);
  const [isLogged] = useAtom(isLoggedInAtom);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [body, setBody] = useState({
    fullName,
    email,
    password,
  });

  const location = useNavigate();

  useEffect(() => {
    if (isLogged === true) {
      location('/');
    }
  }, [isLogged]);

  useEffect(() => {
    setBody({ fullName, email, password });

    if (
      fullName !== '' &&
      passwordRegEx.test(password) &&
      passwordCheck === password &&
      email.length < 250 &&
      email.includes('@')
    ) {
      toggle(true);
    } else if (fullName === '') {
      setTitle('Name can not be empty');
      toggle(false);
    } else if (!passwordRegEx.test(password)) {
      setTitle(
        'Password has to be at least 6 characters long has to include one digit and one special character'
      );
      toggle(false);
    } else if (passwordCheck !== password) {
      setTitle('Passwords do not match');
      toggle(false);
    } else if (email.length > 250) {
      setTitle('Email can not include above 250 characters');
      toggle(false);
    } else if (!email.includes('@')) {
      setTitle('Enter correct email');
      toggle(false);
    }
  }, [fullName, email, password, passwordCheck]);

  useEffect(() => () => setBody({ fullName: '', email: '', password: '' }), []);

  return (
    <Form url='http://localhost:1337/api/user/new' type='POST' body={body}>
      <InputField
        id='name'
        label='Imię'
        type='text'
        setValueText={setFullName}
      />
      <InputField
        id='email'
        label='E-mail'
        type='email'
        setValueText={setEmail}
      />
      <InputField
        id='password'
        label='Hasło'
        type='password'
        setValueText={setPassword}
      />
      <InputField
        id='passwordCheck'
        label='Powtórz hasło'
        type='password'
        setValueText={setPasswordCheck}
      />
    </Form>
  );
};

export default Register;
