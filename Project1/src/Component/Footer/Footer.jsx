function Footer() {
    return (
      <div className="bg-black p-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1 flex flex-col gap-8">
            <div className="font-bold text-5xl text-white">
              Real-time changes
            </div>
            <div className="text-white text-xl">
              See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.
            </div>
            <div>
              <div className="font-bold text-3xl text-gray-500">
                Version Control
              </div>
              <div className="text-gray-600">
                Experience real-time database and never stress
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#C9C2FE] h-[250px]"></div>
        </div>
      </div>
    );
  }
  
  export default Footer;
  