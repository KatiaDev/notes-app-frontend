import React, { useEffect } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import NotesList from "./pages/NotesList";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import Note from "./pages/Note";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import { getNotesAction } from "./actions/notesActions";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/auth/check-auth`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            setIsAuthenticated(true);
            break;
          default:
            setIsAuthenticated(false);
            break;
        }
      })
      .catch((err)=>{
        console.log('Error: ', err);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotesAction());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogOutClick = (e) => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    //return history.push("/");
  };

  return (
    <div>
      <Box>
        <Box mt="3">
          <Text fontFamily="Great Vibes" fontSize="72px" align="center">
            Notes
          </Text>
        </Box>
        <Flex justifyContent="center" alignItems="center">
          <Box>
            <NavLink exact to="/">
              <Button colorScheme="teal" variant="ghost">
                Home
              </Button>
            </NavLink>
          </Box>
          <Box>
            <NavLink exact to="/notes-list">
              <Button colorScheme="teal" variant="ghost">
                My Notes
              </Button>
            </NavLink>
          </Box>
          <Box>
            <NavLink exact to="/add-note">
              <Button colorScheme="teal" variant="ghost">
                Add Note
              </Button>
            </NavLink>
          </Box>
          <Box>
            {isAuthenticated ? (
              <Button
                colorScheme="teal"
                variant="ghost"
                onClick={handleLogOutClick}
              >
                Logout
              </Button>
            ) : (
              <Button colorScheme="teal" variant="ghost">
                Login
              </Button>
            )}
          </Box>
        </Flex>
        <Switch>
          <PrivateRoute
            path="/notes-list"
            isAuthenticated={isAuthenticated}
            render={(props) => <NotesList {...props} />}
          />
          <PrivateRoute
            path="/note/:id"
            isAuthenticated={isAuthenticated}
            render={(props) => <Note {...props} />}
          />
          <PrivateRoute
            path="/edit-note/:id"
            isAuthenticated={isAuthenticated}
            render={(props) => <EditNote {...props} />}
          />
          <PrivateRoute
            path="/add-note"
            isAuthenticated={isAuthenticated}
            render={(props) => <AddNote {...props} />}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          />
          <Route path="/register" render={(props) => <Register {...props} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" component={Home} />
        </Switch>
      </Box>
    </div>
  );
}

export default App;
