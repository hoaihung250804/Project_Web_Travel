var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ITEMS_PER_PAGE = 5;
let currentPage = 1;
let totalPages = 1;
// Hàm fetch dữ liệu từ file JSON
function fetchTours() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("../javascript/data.json");
        if (!response.ok) {
            throw new Error("Failed to fetch tours");
        }
        const tours = yield response.json();
        return tours;
    });
}
// Hàm hiển thị danh sách các tour
function renderTours(tours, page = 1) {
    const contentSection = document.querySelector(".content-section");
    contentSection.innerHTML = ""; // Xóa nội dung cũ
    // Tính toán chỉ số bắt đầu và kết thúc cho trang hiện tại
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTours = tours.slice(startIndex, endIndex);
    paginatedTours.forEach(tour => {
        const tourItem = document.createElement("div");
        tourItem.classList.add("tour-item");
        tourItem.innerHTML = `
      <img src="${tour.images[0]}" alt="Tour ${tour.id}" />
      <div class="tour-info">
        <h3>DU LỊCH ${tour.name}</h3>
        <p>Thời gian: ${tour.duration}</p>
      </div>
      <div class="price-container">
        <p class="price">Giá từ: ${tour.price}</p>
        <button class="xem_them" onclick="window.location.href='tour-detail.html?id=${tour.id}'">Xem thêm</button>
      </div>
    `;
        contentSection.appendChild(tourItem);
    });
    renderPagination(tours.length);
}
// Hàm hiển thị pagination
function renderPagination(totalItems) {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}" id="prev-page">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  `;
    totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>
    `;
    }
    pagination.innerHTML += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}" id="next-page">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;
    attachPaginationEvents();
}
// Hàm gán sự kiện cho các nút pagination
function attachPaginationEvents() {
    const paginationLinks = document.querySelectorAll(".pagination .page-link");
    paginationLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const page = parseInt(e.target.getAttribute("data-page") || currentPage.toString());
            if (!isNaN(page) && page !== currentPage) {
                currentPage = page;
                initializeTours();
            }
        });
    });
}
// Hàm khởi tạo và gọi render tours
function initializeTours() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tours = yield fetchTours();
            renderTours(tours, currentPage);
        }
        catch (error) {
            console.error("Error fetching tours:", error);
        }
    });
}
// Gọi hàm khởi tạo
initializeTours();
