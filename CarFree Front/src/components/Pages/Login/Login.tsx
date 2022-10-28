import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { enableAtom, isLoggedInAtom, titleAtom } from '../../../Atoms';
import Form from '../../Layout/Form/Form';
import InputField from '../../Layout/InputField/InputField';
import { useNavigate } from 'react-router-dom';
import Message from '../../Layout/Message/Message';

const passwordRegEx = RegExp(
  '(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}'
);

const Login: React.FC = () => {
  const [, toggle] = useAtom(enableAtom);
  const [, setTitle] = useAtom(titleAtom);
  const [isLogged] = useAtom(isLoggedInAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [body, setBody] = useState({
    email,
    password,
  });

  const location = useNavigate();

  useEffect(() => {
    if (isLogged === true) {
      location(`/`);
    }
  }, [isLogged]);

  useEffect(() => {
    toggle(false);
    if (!email.includes('@')) {
      setTitle('Enter correct email');
    } else if (!passwordRegEx.test(password)) {
      setTitle('Enter correct password');
    } else {
      toggle(true);
      setBody({ email, password });
    }
  }, [email, password]);

  return (
    <div>
      <Form
        url='https://carfree-back.onrender.com/api/user/login'
        type='POST'
        body={body}
      >
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
      </Form>
      {/* <Message /> */}
    </div>
  );
};

export default Login;
