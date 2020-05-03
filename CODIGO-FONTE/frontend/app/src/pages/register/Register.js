import React from 'react';

import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col
} from "reactstrap";

import SimpleFooter from '../../components/Footers/SimpleFooter';
const Register = () => {
	const handleSubmit = values => {
		alert('Ainda não :(')
	}

	return (
		<>
			<section className="section section-shaped section-lg">
				<div className="shape shape-style-1 bg-gradient-default">
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>

				<Container className="pt-lg-2">
					<Row className="mb-5 justify-content-center">
						<a href="/">
							<img
								alt="..."
								className="img-fluid"
								src={require("../../assets/img/brand/logo-2-branco.png")}
								style={{ width: "170px" }}
							/>
						</a>
						<h2 className="text-white mt-2 ml-3">Registrar</h2>
					</Row>
					<Row className="justify-content-center">
						<Col lg="8">
							<Card className="bg-secondary shadow border-0">
								<CardHeader className="bg-white pb-5">
									<div className="text-muted text-center mb-3">
										<small>Criar sua conta com</small>
									</div>
									<div className="btn-wrapper text-center">
										<Button
											className="btn-neutral btn-icon ml-1"
											color="default"
											onClick={e => alert('Ainda não :(')}
										>
											<span className="btn-inner--icon mr-1">
												<img
													alt="..."
													src={require("../../assets/img/svg/google.svg")}
												/>
											</span>
											<span className="btn-inner--text">Google</span>
										</Button>
									</div>
								</CardHeader>
								<CardBody className="px-lg-5 py-lg-5">
									<div className="text-center text-muted mb-4">
										<small>Cirar uma conta com suas credenciais</small>
									</div>
									<Form role="form"
										onSubmit={handleSubmit}
									>
										<Row>
											<Col md={6}>
												<FormGroup>
													<InputGroup className="input-group-alternative">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="fa fa-user" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Nome"
															type="text"
															id="personName"
															required
														/>
													</InputGroup>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup>
													<InputGroup className="input-group-alternative">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="fa fa-user" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Sobrenome"
															type="text"
															id="personLastName"
															required
														/>
													</InputGroup>
												</FormGroup>
											</Col>
										</Row>
										<FormGroup className="mb-3">
											<InputGroup className="input-group-alternative">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="ni ni-email-83" />
													</InputGroupText>
												</InputGroupAddon>
												<Input placeholder="E-mail"
													type="email"
													id="email"
													required />
											</InputGroup>
										</FormGroup>
										<Row>
											<Col md={6}>
												<FormGroup>
													<InputGroup className="input-group-alternative">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="ni ni-lock-circle-open" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Senha"
															type="password"
															autoComplete="off"
															id="password"
															required
														/>
													</InputGroup>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup>
													<InputGroup className="input-group-alternative">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="ni ni-lock-circle-open" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Confirmar senha"
															type="password"
															autoComplete="off"
															id="confirmPassword"
															required
														/>
													</InputGroup>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col md={6}>
												<FormGroup>
													<InputGroup className="input-group-alternative">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="fa fa-calendar" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Data de nascimento"
															type="date"
															id="personBirthDay"
															required
														/>
													</InputGroup>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup>
													<InputGroup className="input-group-alternative">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="fa fa-id-card-o" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="CPF"
															type="text"
															id="personCpf"
															required
														/>
													</InputGroup>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col md={12}>
												<small className="text-muted">Gênero</small>
												<Row className="ml-1">
													<div className="custom-control custom-radio mb-3 mr-2">
														<input
															className="custom-control-input"
															id="genderMale"
															name="gender-group"
															type="radio"
															value={1}
															defaultChecked
														/>
														<label className="custom-control-label" htmlFor="genderMale">
															Masculino
          									</label>
													</div>
													<div className="custom-control custom-radio mb-3 mr-2">
														<input
															className="custom-control-input"
															id="genderFemale"
															name="gender-group"
															type="radio"
															value={2}
														/>
														<label className="custom-control-label" htmlFor="genderFemale">
															Feminino
          									</label>
													</div>
													<div className="custom-control custom-radio mb-3 mr-2">
														<input
															className="custom-control-input"
															id="genderOther"
															name="gender-group"
															type="radio"
															value={3}
														/>
														<label className="custom-control-label" htmlFor="genderOther">
															Outro
          									</label>
													</div>
												</Row>
											</Col>
										</Row>
										<div className="text-center">
											<Button
												className="my-4"
												color="primary"
												type="submit"
											>
												Criar conta
											</Button>
										</div>
									</Form>
								</CardBody>
							</Card>
							<Row className="mt-3">
								<Col xs="12">
									<a
										className="text-light"
										href="/login"
									>
										<small>Já tenho uma conta</small>
									</a>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</section>
			<SimpleFooter />
		</>)
}

export default Register;