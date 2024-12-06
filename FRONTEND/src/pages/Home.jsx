import Hero from '../components/Header'
import ImageSlider from "../components/ImageSlider"; // Import the ImageSlider component
import { images } from '../assets/assets'; // Import the images array from assets.js
import Category from '../components/category/Category';
import Blog from '../components/blog/Blog';
import RecentBlog from '../components/RecentBlog/RecentBlog';
import VideoSection from '../components/VideoSection/VideoSection';
import AboutSection from '../components/AboutSection';
// import AboutImage from '../components/AboutImage';





const Home = () => {
  return (
    <div className='bg-customBg'>
      <Hero/> 
      <div className='mt-10'>
        
      <ImageSlider images={images} />
      
      </div>
      <Category/>
      <VideoSection/>
      <RecentBlog/>
 
      <Blog/>
      <AboutSection/>
      
    
    </div>

    
  )
}

export default Home