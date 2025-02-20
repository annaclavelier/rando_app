import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="container-fluid">
        <Navbar />
      </div>
      <div className="container-fluid p-0">
        <Hero />
      </div>
    </>
  );
}

export default App;
