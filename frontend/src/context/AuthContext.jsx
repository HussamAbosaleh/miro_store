import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

const [user, setUser] = useState(null);

useEffect(() => {

try{

const storedUser = localStorage.getItem("user");

if(storedUser){
setUser(JSON.parse(storedUser));
}

}catch{
console.error("Failed to load user from storage");
}

}, []);

const login = (data) => {

setUser(data);

localStorage.setItem("user", JSON.stringify(data));

};

const logout = () => {

setUser(null);

localStorage.removeItem("user");

};

return (

<AuthContext.Provider value={{ user, login, logout }}>
{children}
</AuthContext.Provider>

);

}