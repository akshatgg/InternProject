import { GoArrowRight } from "react-icons/go";
import gitLogo from "../../assets/github.png";
import driveLogo from "../../assets/drive.png";
import whatsapp from "../../assets/whatsapp.png";
import insta from "../../assets/insta.png";
import reactLogo from "../../assets/React.png";
import OrbitingCircles from "@/components/magicui/orbiting-circles";

function Home() {
  const logos = [reactLogo, gitLogo, driveLogo, whatsapp, insta];

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className="rings-container relative">
        {logos.map((logo, index) => {
          const radius = (index + 3) * 150; // Increased the multiplier for more gap

          return (
            <div
              key={index}
              className="rig"
              style={{
                width: `${radius * 2}px`, // Diameter (2 * radius)
                height: `${radius * 2}px`, // Diameter (2 * radius)
                borderWidth: "3px",
                borderColor: "#C9C2FE",
                borderStyle: "dashed",
                borderRadius: "50%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}

        {logos.map((logo, index) => {
          const radius = (index + 3) * 150; // Same increased multiplier for the orbit
          return (
            <OrbitingCircles
              key={index}
              className="size-[70px] border-none bg-transparent"
              radius={radius}
              duration={20 + index * 10}
              reverse
            >
              <img src={logo} alt="Logo" className="tehg" />
            </OrbitingCircles>
          );
        })}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-6xl font-bold mb-4">
          We've really sped up our workflow
        </div>
        <div className="flex flex-col items-center justify-center mb-6 px-4">
          <p className="font-semibold mb-2">
            We've really just released a new update! Check out all the new
            dashboard views. Pages now load faster.
          </p>
          <p className="mb-2">You can try us for free for 30 days</p>
          <p>Join 4,000+ companies already growing</p>
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
  );
}

export default Home;
