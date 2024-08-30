import './Home.css';
import { GoArrowRight } from 'react-icons/go';
import gitLogo from "../../assets/github.png";
import driveLogo from '../../assets/drive.png';
import whatsapp from '../../assets/whatsapp.png';
import insta from "../../assets/insta.png";
import react from "../../assets/React.png";
function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="rings-container relative">
        {[1, 2, 3, 4, 5, 6].map((ring, index) => (
          <div
            key={index}
            className="rig"
            style={{
              width: `${(index + 2) * 15}vw`,
              height: `${(index + 2) * 15}vw`,
              borderWidth: '3px',
              borderColor: '#C9C2FE',
              borderStyle: 'dashed',
              borderRadius: '50%'
            }}
          />
        ))}

        {[react, gitLogo, driveLogo, whatsapp, insta].map((logo, index) => (
          <div
            key={index}
            className="absolute orbit-container"
            style={{
              // '--radius': `${(index + 2) * 7.5}vw`, 
              // '--duration': `${15 + index * 2}s`,   
              width: `${(index + 2) * 15}vw`,
              height: `${(index + 2) * 15}vw`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'orbit 15s linear infinite',
            }}
          >
            <img
              src={logo}
              alt="Logo"
              className='tehg'
              style={{
                width: '50px',
                height: '50px',
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)'
                
              }}
            />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-6xl font-bold mb-4">
            We've really sped up our workflow
          </div>
          <div className="flex flex-col items-center justify-center mb-6 px-4">
            <p className="font-semibold mb-2">
              We've really just released a new update! Check out all the new dashboard views. Pages now load faster.
            </p>
            <p className="mb-2">
              You can try us for free for 30 days
            </p>
            <p>
              Join 4,000+ companies already growing
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              className="flex items-center justify-center font-bold p-4 text-lg border rounded-lg hover:bg-gray-300 transition duration-300"
              aria-label="Start Learning Today"
            >
              <GoArrowRight className="mr-2" /> Start Learning Today
            </button>
            <button
              className="bg-[#7F6EFC] p-4 text-white text-lg rounded-xl hover:bg-[#6A5BCE] transition duration-300"
              aria-label="Join Now"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


