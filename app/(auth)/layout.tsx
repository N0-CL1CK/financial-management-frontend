'use client'
import { Container } from "react-bootstrap";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<body>
			<Container
				fluid
				className="min-vh-100 d-flex justify-content-center align-items-center"
			>
				{children}
			</Container>
		</body>
	);
}