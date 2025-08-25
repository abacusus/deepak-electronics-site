import TopHeader from './components/TopHeader'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import './App.css'
import LogoMarquee from './components/LogoMarquee'
import Storep from './components/Storep'
import { Import, Store } from 'lucide-react'
import BigSearchBar from './components/BigSearchBar'

function App() {

  return (
    <>
      <TopHeader />
      <Navbar />
      <Carousel />
      <br></br><br></br>
      
      <BigSearchBar />
      
     <br></br>

     <br></br>
     
      
      
      
      <LogoMarquee />
      <br></br>
      <br></br>
      <Storep />
      <Footer />
    </>
  )
}

export default App
