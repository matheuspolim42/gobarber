import React, { useCallback } from "react";
import { Background, Container, Content, AnimationContainer } from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import logo from "../../assets/logo.svg";
import { IoPersonOutline, IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Formik, Field, FormikHelpers, Form } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';

interface FormValues {
    email: string;
    name: string;
    password: string;
}

const SignUp: React.FC = () => {
    const initialValues: FormValues = {
        email: "",
        name: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatorio'),
        email: Yup.string().required('Email Obrigatorio')
        .email('Digite e-mail valido'),
        password: Yup.string().min(6, 'No minimo 6 digitos').required("Senha Obrigatoria"),
    });

    const handleSubmit = useCallback((
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
      ) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
        }, 500);
      }, []);

    return (
        <>
            <Container>
                <Background />
                <Content>
                    <AnimationContainer>
                        <img src={logo} alt="Logo GoBarber" />
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}
                        validationSchema={validationSchema}>
                            <Form>
                                <h1>Faca seu cadastro</h1>
                                <Field 
                                    name="name" 
                                    type="name"
                                    placeholder="Nome"
                                    component={Input}
                                    icon={IoPersonOutline}
                                    />
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                    component={Input}
                                    icon={MdOutlineMailOutline} 
                                    />
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                    component={Input}
                                    icon={IoLockClosedOutline}
                                    />
                                <Button type="submit">Cadastrar</Button>
                                <Link to="/"><IoIosArrowRoundBack />Voltar para login</Link>
                            </Form>
                        </Formik>
                    </AnimationContainer>
                </Content>
            </Container>
        </>
    );
};

export default SignUp;