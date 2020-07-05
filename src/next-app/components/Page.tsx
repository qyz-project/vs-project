import React from 'react'
import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Head from 'next/head'

export default function Page (props: { children?: JSX.Element | never[] }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true"></script>
      </Head>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">VS Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link href="/">
                <a>Weather</a>
              </Link>
            </Nav.Link>
            <NavDropdown title="SmartHome" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link href="/room?id=8">
                  <a>Livingroom</a>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/room?id=8">
                  <a>Bedroom</a>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/device">
                  <a>Devices</a>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/mode">
                  <a>Mode</a>
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {props?.children ? props.children : undefined}
    </>
  )
}
