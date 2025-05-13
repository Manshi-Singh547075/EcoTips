const Stats = () => {
  return (
    <div className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Impact Together</h2>
          <p className="text-green-200 text-lg">Small changes add up to big results</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-neutral-dark font-medium">Tips Shared</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl font-bold text-primary mb-2">12K+</div>
            <div className="text-neutral-dark font-medium">Community Members</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl font-bold text-primary mb-2">45K+</div>
            <div className="text-neutral-dark font-medium">Tips Implemented</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl font-bold text-primary mb-2">85%</div>
            <div className="text-neutral-dark font-medium">Report Positive Change</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
