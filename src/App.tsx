import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {

  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div>
      {alertVisible && <Alert onClose={() => setAlertVisible(false)}>Keep <span>go</span>going!</Alert>}
      <Button onClick={()=>setAlertVisible(true)}>I can do it !</Button>
    </div> 
  );
}

export default App;
