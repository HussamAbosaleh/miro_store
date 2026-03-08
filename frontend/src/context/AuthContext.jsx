import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

const [user, setUser] = useState(null);
const [token, setToken] = useState(null);

useEffect(() => {

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

if (storedUser && storedUser !== "undefined") {
try {
setUser(JSON.parse(storedUser));
} catch {
setUser(null);
}
}

if (storedToken) {
setToken(storedToken);
}

}, []);

const login = (data) => {

setUser(data.user);
setToken(data.token);

localStorage.setItem("user", JSON.stringify(data.user));
localStorage.setItem("token", data.token);

};

const logout = () => {

setUser(null);
setToken(null);

localStorage.removeItem("user");
localStorage.removeItem("token");

};

return (

<AuthContext.Provider value={{ user, token, login, logout }}>
{children}
</AuthContext.Provider>

);

}