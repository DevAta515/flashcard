import Card from "./components/Card"
import FormComponent from "./components/FormComponent"
import Carousel from "./components/Carousel"
import Image3 from "./assets/Image3.jpg"
function App() {

  return (
    <div
      style={{
        backgroundImage: `url(${Image3})`,
        backgroundSize: 'cover', // Makes sure the image covers the entire area
        backgroundPosition: 'center', // Centers the background image
        backgroundRepeat: 'no-repeat', // Ensures the image doesn’t repeat
        height: '100vh', // Makes sure it covers the entire viewport height
        width: '100vw', // Makes sure it covers the entire viewport width
      }}
    >
      <Carousel></Carousel>
    </div>
  )
}

export default App
