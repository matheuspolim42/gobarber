import React, { useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Content, Background, Icon, AnimationContainer } from './styles';
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import logoImg from '../../assets/logo.svg';
import { Link, Navigate, useLocation } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import * as yup from 'yup';

interface SignInProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const initialValues: SignInProps = {
    email: '',
    password: ''
  };

  const { user, signIn } = useAuth();  
  const { createToast } = useToast();
  const location = useLocation();

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    password: yup.string().min(6, "Mínimo de 6 dígitos").required("Senha obrigatória"),
  });
 
  const handleSubmit = useCallback(async (data: SignInProps) => {
    try {
      await signIn(data);
    } catch (error) {
      createToast({
        type: "error",
        title: "Erro no login",
        description: "Algum erro foi causado ao fazer o login",
      });
    }
  }, [signIn, createToast]);  

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt='Logo GoBarber' />
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              >
              {({ errors, touched }) => (
                <Form>
                <h1>Sign In</h1>
                <Field name="email" placeholder="E-mail" component={Input} icon={MdOutlineEmail} />
                <Field name="password" placeholder="Senha" component={Input} icon={IoLockClosedOutline} />
                <Button onClick={() => {
                  if (!!user) {
                    return <Navigate to={"/dashboard"} state={{ from: location }} replace />
                  }
                }} type='submit'>Entrar</Button>
                <Link to='forgot'>Forget your password?</Link>
                </Form>
              )}
            </Formik>
            <Link to='/signup'>
              <Icon />
              Criar Conta
            </Link>
        </AnimationContainer>
      </Content>

        <Background />
      </Container>
    </>
  );
};

export default SignIn;
