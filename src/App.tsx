import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {

  return (
    <div>
      <Alert>Kepp <span>go</span>going!</Alert>
      <Button onClick={()=>console.log("clicked")}>I can do it !</Button>
    </div> 
  );
}

export default App;
