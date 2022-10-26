import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { enableAtom, titleAtom } from '../../../Atoms';
import Form from '../../Layout/Form/Form';
import InputField from '../../Layout/InputField/InputField';

const Login: React.FC = () => {
  const [, toggle] = useAtom(enableAtom);
  const [, setTitle] = useAtom(titleAtom);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [body, setBody] = useState({
    email,
    password,
  });

  useEffect(() => {
    toggle(false);
    if (!email.includes('@')) {
      setTitle('Enter correct email');
    } else if (password.length < 6) {
      setTitle('Password has to be at least 6 characters long');
    } else {
      toggle(true);
      setBody({ email, password });
    }
  }, [email, password]);

  return (
    <Form url='http://localhost:1337/api/car/new' type='POST' body={body}>
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
  );
};

export default Login;
