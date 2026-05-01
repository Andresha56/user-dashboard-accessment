import { Routes, Route } from "react-router-dom";
import { UsersList } from "@pages/usersList";
import { UserDetails } from "@pages/userDetails";

function App() {
    return (
        <Routes>
            <Route path="/" element={<UsersList />} />
            <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
    );
}

export default App;
