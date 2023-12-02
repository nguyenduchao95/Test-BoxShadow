import './App.css';
import Header from "./components/Header/Header";
import {Container} from "@mui/material";
import BoxShadow from "./components/BoxShadow/BoxShadow";

function App() {
    return (
        <Container maxWidth="xl" sx={{marginBottom: '30px'}}>
            <Header/>
            <BoxShadow/>
        </Container>
    );
}

export default App;
