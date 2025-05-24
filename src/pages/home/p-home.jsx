
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TestGrid from "../../components/TestGrid";
const categories = [
  {
    id: 1,
    title: "Math",
    img: "https://img.freepik.com/free-vector/maths-realistic-chalkboard-background_23-2148159115.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: 2,
    title: "English",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxHf-IR1dxTkKdCotzEx_CrM3iK6H1W42-JA&s",
  },
  {
    id: 3,
    title: "Chemistry",
    img: "https://img.freepik.com/free-vector/hand-drawn-chemistry-background_23-2148164901.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: 4,
    title: "Physics",
    img: "https://ramjas.du.ac.in/college/web/dept/physics.jpg",
  },
];
const filters = [
  "Tất cả",
  "Toán",
  "Tiếng Anh",
  "Vật Lý",
  "Toeic",
  "HSK1",
  "HSK2",
];
export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="w-full p-4 mt-16">
                {/* Section 1: Hero */}
                <section className="relative w-full h-20 md:h-[550px]">
                    <img
                    src="https://iuoss.com/wp-content/uploads/2020/12/5I7A9500-scaled.jpg"
                    alt="Hero"
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                    <h2 className="text-5xl md:text-5xl text-blue-700 font-extrabold drop-shadow-lg mt-20 mb-4">
                        Chào mừng bạn đến với E-Allbest
                    </h2>
                    <h2 className="text-3xl md:text-3xl text-blue-500 font-extrabold drop-shadow-lg">
                        Website Luyện Đề{" "}
                        <span className="underline decoration-blue-400">Trực Tuyến</span>
                        <br /> Số 1 Việt Nam
                    </h2>
                    </div>
                </section>

                {/* các môn học */}
                <section className="relative z-10 -mt-20 px-4">
                    <div className="p-6">
                    <div className="flex justify-center flex-wrap gap-4">
                        {categories.map((cat,idx) => (
                        <div
                            key={cat.id}
                            className="w-[210px] h-[300px] bg-amber-300 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow"
                        >
                            <img
                            src={cat.img}
                            alt={cat.title}
                            className="w-full h-full object-cover"
                            />
                        </div>
                        ))}
                    </div>
                    </div>
                </section>

                {/* Button dưới cùng */}
                <div className="flex justify-center mt-4">
                    <button className="rounded-sm text-white bg-blue-700 p-3  font-semibold flex items-center space-x-1 hover:scale-105 hover:bg-blue-800 transition duration-500 cursor-pointer">
                    Khám phá thêm ➜
                    </button>
                </div>
            </main>
            <section className="mt-8 px-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-gray-700 font-bold text-2xl">
                    Thư viện đề thi
                    </div>
                </div>

                <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
                    {filters.map((f, i) => (
                    <button
                        key={i}
                        className={`px-4 py-1 rounded-full whitespace-nowrap text-base font-semibold ${
                        i === 0 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                    >
                        {f}
                    </button>
                    ))}
                    <span className="ml-2 text-gray-500">.....</span>
                </div>
            </section>
            <TestGrid/>
            <div className="h-[200px] w-full">
                <img
                src="https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-taobao-july-cool-sky-promotion-poster-banner-background-image_157029.jpg" 
                alt="Banner"
                className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <Footer />
        </div>
    );
}