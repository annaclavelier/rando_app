import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Home = () => {
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

export default Home