import React, { useState } from "react";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import { Button } from "../styles";

import '../styles/NavBar.css'

function NavBar({ setUser }) {
  const [doneMode, setDoneMode] = useState(true);

  function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  
  function toggleDoneMode() {
    setDoneMode(!doneMode);
  }

  function makeDoneMode() {
    const path = doneMode ? "/dones" : "/";
    const text = doneMode ? "Dones" : "To-do's";
    // setDoneMode(!doneMode);
    return (
      <Link to={path}>
        <Button onClick={toggleDoneMode}>
          {text}
        </Button>
      </Link>
    );
  }
  
  return (
    <Wrapper>
      <Logo>
        <Link to="/">To-do's</Link>
      </Logo>
      <Nav>
        {makeDoneMode()}
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Trattatello", fantasy;
  font-size: 3rem;
  color: blue;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;
