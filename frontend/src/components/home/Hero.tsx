import { Pause, Play } from 'lucide-react';
import NewArivale from './NewArivale';
import { useRef, useState } from 'react';
import Hot from './Hot';
import { Link } from 'react-router-dom';

function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <div className="relative w-full h-[calc(90vh-4rem)] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/animi.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-screen-3xl mx-auto px-6 lg:px-12 xl:px-16 w-full">
            <div className="max-w-xl">

              <h1 className="text-white text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                NEW VITAL NOW LIVE
              </h1>

              <p className="text-white text-base md:text-lg mb-8">
                She's versatile. She's iconic. And she's here.
              </p>

              <Link to="/products" className="inline-block bg-white text-black font-bold text-sm md:text-base px-8 py-3 rounded-full hover:bg-gray-100 transition-colors uppercase tracking-wide cursor-pointer">
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>


        <button
          onClick={togglePlayPause}
          className="absolute bottom-8 right-8 z-20 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full transition-all cursor-pointer"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>


      </div>

      <NewArivale />
      <Hot/>
    </>
  );
}

export default Home;
