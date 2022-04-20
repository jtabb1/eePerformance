import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// import HomePage from "./components/HomePage";
import Login from "./pages/Login";
import UserShow from "./components/UserShow";
import DoneShow from "./components/DoneShow";
import UserContainer from "./components/UserContainer";
import TypeContainer from "./components/TypeContainer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
      <div className="app-container">

        <NavBar setUser={setUser} />

        <Switch>
        <Route exact path="/">
            <UserShow id={user.id} />
            {/* <HomePage /> */}
          </Route>

          <Route exact path="/dones">
            <DoneShow id={user.id} />
            {/* <HomePage /> */}
          </Route>

          <Route exact path="/users">
            <UserContainer user={user} />
          </Route>

          <Route exact path="/users/:id">
            <UserShow user={user} />
          </Route>

          <Route exact path="/types">
            <TypeContainer user={user} />
          </Route>

        </Switch>

      </div>
  );
}

export default App;
