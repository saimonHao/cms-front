import React from 'react';
import { Container, Row, Col, Card, CardBody, Alert } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
// import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Input, Field, Form } from '@availity/form';
import * as yup from 'yup';
import '@availity/yup';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { loginActions } from 'redux/reducer/login/login.actions';

//* Import css modules if need
// import classes from './LoginForm.module.scss';

interface Props {
	error?: string;
}

const Login = (props): JSX.Element => {

	const dispatch = useAppDispatch();
	const error = useAppSelector(state => state.login.error)
	console.log(error);
	const history = useHistory();
	const handleValidSubmit = (values) => {
		const { email, password } = values;
		dispatch({ type: 'LOGIN_REQUESTED', email, password })
		// history.push('/welcome');
	}
	return (
		<div className="account-pages my-5 pt-sm-5">
			<Container>
				<Row className="justify-content-center">
					<Col md={8} lg={6} xl={5}>
						<Card className="overflow-hidden">
							<div className="bg-primary bg-soft">
								<Row>
									<Col xs={7}>
										<div className="text-primary p-4">
											<h5 className="text-primary">Welcome Back !</h5>
											<p>Sign in to continue to Skote.</p>
										</div>
									</Col>
									<Col className="col-5 align-self-end">{/* <img src={profile} alt="" className="img-fluid" /> */}</Col>
								</Row>
							</div>
							<CardBody className="pt-0">
								{/* <div>
									<Link to="/" className="auth-logo-light">
										<div className="avatar-md profile-user-wid mb-4">
											<span className="avatar-title rounded-circle bg-light">
												<img src={logo} alt="" className="rounded-circle" height="34" />
											</span>
										</div>
									</Link>
								</div> */}
								<div className="p-2">
									<Form onSubmit={(values) => { handleValidSubmit(values) }}
										initialValues={{
											email: '',
											password: '',
										}}
										validationSchema={yup.object().shape({
											email: yup
												.string()
												.isRequired(true, 'Email is Required.'),
											// .matches(/^\d{8}$/, 'Member ID must be 8 digits.'),
											password: yup
												.string()
												.isRequired(true, 'Password is Required.')
											// .matches(
											// 	/^\d{5}(?:-\d{4})?$/,
											// 	'Valid Zip Code Formats: 12345 or 12345-6789'
											// ),
										})}
									>
										{error ? <Alert color="danger">{error}</Alert> : null}
										<Field name="email" type="text" label="Email" />
										<Field name="password" type="text" label="password" />
										<div className="mt-3 d-grid">
											<button className="btn btn-primary btn-block" type="submit">
												Log In
											</button>
										</div>
									</Form>
									{/* <AvForm
										className="form-horizontal"
										onValidSubmit={(e, v) => {
											handleValidSubmit(e, v);
										}}
									>
										{props.error ? <Alert color="danger">{props.error}</Alert> : null}

										<div className="mb-3">
											<AvField
												name="email"
												label="Email"
												value="admin@themesbrand.com"
												className="form-control"
												placeholder="Enter email"
												type="email"
												required
											/>
										</div>

										<div className="mb-3">
											<AvField
												name="password"
												label="Password"
												value="123456"
												type="password"
												required
												placeholder="Enter Password"
											/>
										</div>

										<div className="form-check">
											<input type="checkbox" className="form-check-input" id="customControlInline" />
											<label className="form-check-label" htmlFor="customControlInline">
												Remember me
											</label>
										</div>

										<div className="mt-3 d-grid">
											<button className="btn btn-primary btn-block" type="submit">
												Log In
											</button>
										</div>

										<div className="mt-4 text-center">
											<Link to="/forgot-password" className="text-muted">
												<i className="mdi mdi-lock me-1" />
												Forgot your password?
											</Link>
										</div>
									</AvForm> */}
								</div>
							</CardBody>
						</Card>
						{/* <div className="mt-5 text-center">
							<p>
								Don&#39;t have an account ?{' '}
								<Link to="/register" className="fw-medium text-primary">
									{' '}
									Signup now{' '}
								</Link>{' '}
							</p>
							<p>
								© {new Date().getFullYear()} Skote. Crafted with <i className="mdi mdi-heart text-danger" /> by
								Themesbrand
							</p>
						</div> */}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Login;
