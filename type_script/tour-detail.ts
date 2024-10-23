interface Tour {
    id: number;
    name: string;
    duration: string;
    price: string;
    description: string;
    images: string[];
    short_description: string;
    gathering_location: string;
    gathering_time: string;
}

function goBack(): void {
    window.history.back();
}

function book() {
    const gatheringLocation = document.getElementById("tour-gathering_location")?.textContent;
    const gatheringTime = document.getElementById("tour-gathering_time")?.textContent;

    if (gatheringLocation && gatheringTime) {
        const successMessage = document.createElement("div");
        successMessage.innerHTML = `
            <div class="alert alert-success" role="alert">
                Đặt lịch thành công! 
                <br/>Điểm khởi hành: ${gatheringLocation.replace("Điểm khởi hành: ", "")}, 
                Thời gian: ${gatheringTime.replace("Thời gian khởi hành: ", "")}
            </div>
        `;
        document.body.appendChild(successMessage);
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 10000);
    }
}

function displayTourDetails(): void {
    const params = new URLSearchParams(window.location.search);
    const tourId = params.get("id");

    fetch("/travel_VN/javascript/data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((tours: Tour[]) => {
            const tour = tours.find((t) => t.id.toString() === tourId);
            if (tour) {
                const nameElement = document.getElementById("tour-name") as HTMLElement;
                const durationElement = document.getElementById("tour-duration") as HTMLElement;
                const priceElement = document.getElementById("tour-price") as HTMLElement;
                const descriptionElement = document.getElementById("tour-description") as HTMLElement;
                const shortDescriptionElement = document.getElementById("tour-short_description") as HTMLElement;
                const gatheringLocationElement = document.getElementById("tour-gathering_location") as HTMLElement;
                const gatheringTimeElement = document.getElementById("tour-gathering_time") as HTMLElement;
                const imagesContainer = document.getElementById("tour-images") as HTMLElement; // Phần chứa ảnh đầu tiên
                const showImagesContainer = document.getElementsByClassName("show-image")[0]; // Phần chứa tất cả ảnh

                if (nameElement && durationElement && priceElement && descriptionElement &&
                    shortDescriptionElement && gatheringLocationElement && gatheringTimeElement) {
                    nameElement.innerText = tour.name;
                    durationElement.innerText = `Thời gian: ${tour.duration}`;
                    priceElement.innerText = `Giá: ${tour.price}`;
                    descriptionElement.innerText = `Địa điểm du lịch: ${tour.description}`;
                    shortDescriptionElement.innerText = `Mô tả ngắn: ${tour.short_description}`;
                    gatheringLocationElement.innerText = `Điểm khởi hành: ${tour.gathering_location}`;
                    gatheringTimeElement.innerText = `Thời gian khởi hành: ${tour.gathering_time}`;
                    
                    // Hiển thị ảnh đầu tiên trong phần #tour-images
                    if (imagesContainer && tour.images.length > 0) {
                        const firstImage = document.createElement("img");
                        firstImage.src = tour.images[0];
                        firstImage.alt = `Tour Image 1`;
                        firstImage.className = "img-fluid"; // Thêm class để ảnh responsive
                        imagesContainer.appendChild(firstImage);
                    }

                    // Hiển thị tất cả các ảnh trong phần show-image
                    if (showImagesContainer) {
                        // Xóa nội dung cũ trước khi thêm mới
                        showImagesContainer.innerHTML = '';
                        
                        tour.images.forEach((image, index) => {
                            const imgElement = document.createElement("img");
                            imgElement.src = image;
                            imgElement.alt = `Tour Image ${index + 1}`;
                            imgElement.className = "img-fluid m-2"; // Thêm class để ảnh responsive và khoảng cách
                            showImagesContainer.appendChild(imgElement);
                        });
                    } else {
                        console.error("Không tìm thấy phần tử .show-image");
                    }
                }
            }
        })
        .catch((error) => {
            console.error("Error fetching tour details:", error);
        });
}



window.onload = displayTourDetails;
