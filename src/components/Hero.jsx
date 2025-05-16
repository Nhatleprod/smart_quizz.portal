export default function HeroSection() {
  return (
    <section className="relative h-72 md:h-100">
      <img
        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1470&q=80"
        alt="Hero"
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute top-10 left-10 max-w-xl text-white">
        <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
          Website Luyện Đề{" "}
          <span className="underline decoration-blue-400">Trực Tuyến</span>
          <br /> Số 1 Việt Nam
        </h2>
      </div>
    </section>
  );
}
