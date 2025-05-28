const StatsSection = () => {
  const stats = [
    { label: "Documents Verified", value: "10,000+" },
    { label: "Certificates Issued", value: "5,000+" },
    { label: "News Articles", value: "2,500+" },
    { label: "Active Users", value: "1,200+" },
  ];

  return (
    <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
