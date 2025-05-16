export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">E-Allbest</h3>
          <div className="flex space-x-3 text-blue-600 text-xl">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Về trang web</h4>
          <ul className="text-gray-700 space-y-1">
            <li>......</li>
            <li>......</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Thông tin doanh nghiệp</h4>
          <p>Công Ty TNHH ...</p>
          <p>Hotline: ...</p>
          <p>Địa chỉ: ...</p>
          <p>Email: ...</p>
        </div>
      </div>
    </footer>
  );
}
