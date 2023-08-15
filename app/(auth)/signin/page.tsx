'use client';

import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { Button, Col, Form, InputGroup, Toast, ToastContainer } from "react-bootstrap";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingCode, setLoadingCode] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const { push } = useRouter();

    const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    async function handleCode() {
        try {
            setLoadingCode(true);

            const response = await fetch('/api/code', {
                method: 'POST',
                body: JSON.stringify({ email })
            });

            const { message } = await response.json();
            
            setToastMessage(message);
            setShowToast(true);
        } catch (err) {

        } finally {
            setLoadingCode(false);
        }
    }

    async function handleSubmit(e: any) {
        setLoading(true)
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append('email', email);
            formData.append('password', password);
            formData.append('code', code);

            const response = await fetch('/api/signin', {
                method: 'POST',
                body: formData
            })

            const { message } = await response.json();

            if (response.ok) {
                setLoading(false)
                push('/dashboard')
            } else {
                setLoading(false)
                setToastMessage(message)
                setShowToast(true)
            }
            
        } catch (err) {

        }
    }

    return (
        <>
            <Col className="m-0 rounded-4 py-5 bg-gray-600/5 text-gray-200" style={{ maxHeight: '500px', maxWidth: "500px", padding: '2rem' }}>
                <Form onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                    <p className="text-3xl font-medium mb-5">Login</p>
                    </div>
                    <Form.Group className="mb-4" controlId="email">
                        <Form.Control
                            type="email"
                            style={{ height: '3rem' }}
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="password">
                        <Form.Control
                        type="password"
                        style={{ height: '3rem' }}
                        placeholder="Senha"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="code">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                maxLength={6}
                                style={{ height: '3rem' }}
                                placeholder="Código"
                                required
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <Button
                                disabled={!validEmail.test(email)}
                                type="button"
                                variant={validEmail.test(email) ? "outline-primary" : "outline-secondary"}
                                style={{ width: "35%", height: '3rem' }}
                                onClick={handleCode}
                            >
                                {!loadingCode ? 'Solicitar código': <LoadingSpinner variant="primary"/>}
                            </Button>
                        </InputGroup>
                    </Form.Group>
                
                    <div className="flex justify-center">
                        <Button
                            disabled={!(validEmail.test(email) && password?.length >= 8 && code?.length == 6)}
                            type="submit"
                            variant={(validEmail.test(email) && password?.length >= 8 && code?.length == 6) ? "outline-success" : "outline-secondary" }
                            className="w-50 rounded mt-4" style={{ height: '3rem' }}
                        >
                            {!loading ? 'Entrar': <LoadingSpinner variant="primary"/>}
                        </Button>
                    </div>
                </Form>
            </Col>
            <ToastContainer
                className="p-4"
                position={"top-end"}
                style={{ zIndex: 1, position: "fixed" }}
            >
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={4500}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Notificação</strong>
                        <small>Agora</small>
                    </Toast.Header>
                    <Toast.Body style={{ color: "black" }}>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
    </>
    )
}