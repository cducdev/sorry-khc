document.addEventListener("DOMContentLoaded", () => {
	// Hiển thị ngày hiện tại
	const currentDate = new Date();
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const currentDateElement = document.getElementById("current-date");
	if (currentDateElement) {
		currentDateElement.textContent = currentDate.toLocaleDateString(
			"vi-VN",
			options
		);
	}

	// Hiển thị thông tin từ config
	const elements = {
		yourName: document.getElementById("your-name"),
		herName: document.getElementById("her-name"),
		herNameReward: document.getElementById("her-name-reward"),
		herNamePopup: document.getElementById("her-name-popup"),
		offenseList: document.getElementById("offense-list"),
		punishmentList: document.getElementById("punishment-list"),
	};

	// Cập nhật thông tin cơ bản
	if (elements.yourName) elements.yourName.textContent = config.yourName;
	if (elements.herName) elements.herName.textContent = config.herName;
	if (elements.herNameReward)
		elements.herNameReward.textContent = config.herName;
	if (elements.herNamePopup)
		elements.herNamePopup.textContent = config.herName;

	// Hiển thị danh sách tội danh
	function updateOffenseList() {
		if (!elements.offenseList) return;

		elements.offenseList.innerHTML = "";
		if (config.offenses && config.offenses.length > 0) {
			config.offenses.forEach((offense, index) => {
				const li = document.createElement("li");
				li.innerHTML = `
					<span class="offense-number">${index + 1}.</span>
					<span class="offense-text">${offense}</span>
				`;
				elements.offenseList.appendChild(li);
			});
		}
	}

	// Hiển thị danh sách mức phạt
	function updatePunishmentList() {
		if (!elements.punishmentList) return;

		elements.punishmentList.innerHTML = "";
		if (config.punishments && config.punishments.length > 0) {
			config.punishments.forEach((punishment) => {
				const li = document.createElement("li");
				li.innerHTML = `${punishment.icon} ${punishment.text}`;
				elements.punishmentList.appendChild(li);
			});
		}
	}

	// Khởi tạo hiển thị
	updateOffenseList();
	updatePunishmentList();

	// Thêm hiệu ứng confetti khi trang được tải
	createConfetti();

	// Thêm hiệu ứng hover cho các card
	const cards = document.querySelectorAll(
		".info-card, .offense-card, .defense-card, .punishment-card"
	);
	cards.forEach((card) => {
		card.addEventListener("mouseenter", () => {
			card.style.transform = "translateY(-5px)";
			card.style.boxShadow = "0 15px 30px var(--shadow-color)";
		});
		card.addEventListener("mouseleave", () => {
			card.style.transform = "translateY(0)";
			card.style.boxShadow = "0 5px 15px var(--shadow-color)";
		});
	});

	// Xử lý popup
	const popupModal = document.getElementById("popup-modal");
	const closeButton = document.querySelector(".close-button");

	// Đóng popup khi click nút đóng
	closeButton.addEventListener("click", () => {
		popupModal.classList.remove("show");
		document.body.style.overflow = "auto";
	});

	// Đóng popup khi click bên ngoài
	popupModal.addEventListener("click", (e) => {
		if (e.target === popupModal) {
			popupModal.classList.remove("show");
			document.body.style.overflow = "auto";
		}
	});

	// Xử lý nút ân xá
	const pardonButton = document.getElementById("pardon-button");
	const verdict = document.getElementById("verdict");

	pardonButton.addEventListener("click", async () => {
		// Thêm hiệu ứng gõ búa
		const hammerSound = new Audio(
			"https://www.soundjay.com/misc/sounds/hammer-1.mp3"
		);
		hammerSound
			.play()
			.catch((e) => console.log("Không thể phát âm thanh:", e));

		// Thêm hiệu ứng rung lắc cho container
		const container = document.querySelector(".container");
		container.style.animation = "shake 0.5s ease-in-out";
		setTimeout(() => {
			container.style.animation = "";
		}, 500);

		// Hiển thị kết quả với animation
		verdict.classList.remove("hidden");
		verdict.classList.add("show");

		// Thêm hiệu ứng confetti
		createConfetti();

		// Vô hiệu hóa nút sau khi nhấn
		pardonButton.disabled = true;
		pardonButton.style.background =
			"linear-gradient(45deg, #95a5a6, #7f8c8d)";
		pardonButton.innerHTML = `
			<span class="button-icon">✨</span>
			Đã xem xét xong
			<span class="button-icon">✨</span>
		`;

		// Lưu trạng thái ân xá
		const pardonData = {
			timestamp: new Date().toISOString(),
			yourName: config.yourName,
			herName: config.herName,
			offenses: config.offenses,
			punishments: config.punishments,
		};

		try {
			// Gửi dữ liệu đến server để lưu vào file
			const response = await fetch("/update-status", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(pardonData),
			});

			if (!response.ok) {
				throw new Error("Không thể lưu trạng thái");
			}
		} catch (error) {
			console.error("Lỗi khi lưu trạng thái:", error);
		}

		// Hiển thị popup sau 0.5 giây
		setTimeout(() => {
			popupModal.classList.add("show");
			document.body.style.overflow = "hidden"; // Ngăn scroll khi popup hiện
			createConfetti(); // Thêm confetti khi popup hiện
		}, 500);
	});

	// Xử lý thêm tội danh mới
	const editOffenseButton = document.getElementById("edit-offense");
	const offenseForm = document.getElementById("offense-form");
	const offenseItems = document.getElementById("offense-items");
	const addOffenseButton = document.getElementById("add-offense");
	const saveOffensesButton = document.getElementById("save-offenses");
	const cancelOffenseEditButton = document.getElementById(
		"cancel-offense-edit"
	);
	const newOffenseInput = document.getElementById("new-offense");

	let tempOffenses = [...config.offenses];

	// Hiển thị form chỉnh sửa
	editOffenseButton.addEventListener("click", () => {
		offenseForm.classList.remove("hidden");
		renderOffenseItems();
	});

	// Thêm tội danh mới
	addOffenseButton.addEventListener("click", () => {
		const text = newOffenseInput.value.trim();
		if (text) {
			tempOffenses.push(text);
			newOffenseInput.value = "";
			renderOffenseItems();
		}
	});

	// Hiển thị danh sách tội danh trong form
	function renderOffenseItems() {
		offenseItems.innerHTML = "";
		tempOffenses.forEach((offense, index) => {
			const div = document.createElement("div");
			div.className = "offense-item";
			div.innerHTML = `
				<span>${offense}</span>
				<button class="remove-button" data-index="${index}">×</button>
			`;
			offenseItems.appendChild(div);
		});

		// Thêm sự kiện xóa cho các nút
		document
			.querySelectorAll(".offense-item .remove-button")
			.forEach((button) => {
				button.addEventListener("click", () => {
					const index = parseInt(button.dataset.index);
					tempOffenses.splice(index, 1);
					renderOffenseItems();
				});
			});
	}

	// Lưu thay đổi tội danh
	saveOffensesButton.addEventListener("click", () => {
		config.offenses = [...tempOffenses];
		updateOffenseList();
		offenseForm.classList.add("hidden");
	});

	// Hủy thay đổi tội danh
	cancelOffenseEditButton.addEventListener("click", () => {
		tempOffenses = [...config.offenses];
		offenseForm.classList.add("hidden");
	});

	// Xử lý thêm mức phạt mới
	const editPunishmentButton = document.getElementById("edit-punishments");
	const punishmentForm = document.getElementById("punishment-form");
	const punishmentItems = document.getElementById("punishment-items");
	const addPunishmentButton = document.getElementById("add-punishment");
	const savePunishmentsButton = document.getElementById("save-punishments");
	const cancelPunishmentEditButton = document.getElementById("cancel-edit");
	const iconInput = document.getElementById("punishment-icon");
	const textInput = document.getElementById("punishment-text");

	let tempPunishments = [...config.punishments];

	// Hiển thị form chỉnh sửa mức phạt
	editPunishmentButton.addEventListener("click", () => {
		punishmentForm.classList.remove("hidden");
		renderPunishmentItems();
	});

	// Thêm mức phạt mới
	addPunishmentButton.addEventListener("click", () => {
		const icon = iconInput.value.trim();
		const text = textInput.value.trim();
		if (icon && text) {
			tempPunishments.push({ icon, text });
			iconInput.value = "";
			textInput.value = "";
			renderPunishmentItems();
		}
	});

	// Hiển thị danh sách mức phạt trong form
	function renderPunishmentItems() {
		punishmentItems.innerHTML = "";
		tempPunishments.forEach((punishment, index) => {
			const div = document.createElement("div");
			div.className = "punishment-item";
			div.innerHTML = `
				<span>${punishment.icon}</span>
				<span>${punishment.text}</span>
				<button class="remove-button" data-index="${index}">×</button>
			`;
			punishmentItems.appendChild(div);
		});

		// Thêm sự kiện xóa cho các nút
		document
			.querySelectorAll(".punishment-item .remove-button")
			.forEach((button) => {
				button.addEventListener("click", () => {
					const index = parseInt(button.dataset.index);
					tempPunishments.splice(index, 1);
					renderPunishmentItems();
				});
			});
	}

	// Lưu thay đổi mức phạt
	savePunishmentsButton.addEventListener("click", () => {
		config.punishments = [...tempPunishments];
		updatePunishmentList();
		punishmentForm.classList.add("hidden");
	});

	// Hủy thay đổi mức phạt
	cancelPunishmentEditButton.addEventListener("click", () => {
		tempPunishments = [...config.punishments];
		punishmentForm.classList.add("hidden");
	});

	// Thêm hiệu ứng hover cho các phần tử có class .card-icon
	document.querySelectorAll(".card-icon").forEach((icon) => {
		icon.addEventListener("mouseenter", () => {
			icon.style.transform = "scale(1.2) rotate(10deg)";
			icon.style.transition = "transform 0.3s ease";
		});
		icon.addEventListener("mouseleave", () => {
			icon.style.transform = "scale(1) rotate(0deg)";
		});
	});

	// Xử lý hộp quà
	const giftBox = document.getElementById("gift-box");
	const matchaLatte = document.getElementById("matcha-latte");

	if (giftBox && matchaLatte) {
		giftBox.addEventListener("click", () => {
			// Thêm hiệu ứng mở hộp
			giftBox.classList.add("open");

			// Thêm hiệu ứng confetti
			createConfetti();

			// Hiển thị matcha latte sau khi mở hộp
			setTimeout(() => {
				matchaLatte.classList.remove("hidden");
				matchaLatte.classList.add("show");

				// Thêm hiệu ứng confetti lần nữa
				createConfetti();
			}, 500);
		});
	}
});

// Thêm animation cho verdict và các hiệu ứng khác
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Hàm tạo hiệu ứng confetti
function createConfetti() {
	const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF9F1C", "#2EC4B6"];
	const shapes = ["✨", "🎉", "💫", "⭐", "🌟"];

	for (let i = 0; i < 50; i++) {
		const confetti = document.createElement("div");
		confetti.style.position = "fixed";
		confetti.style.fontSize = Math.random() * 20 + 10 + "px";
		confetti.style.left = Math.random() * 100 + "vw";
		confetti.style.top = -20 + "px";
		confetti.style.opacity = Math.random();
		confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
		confetti.style.pointerEvents = "none";
		confetti.style.zIndex = "9999";
		confetti.textContent =
			shapes[Math.floor(Math.random() * shapes.length)];
		confetti.style.color =
			colors[Math.floor(Math.random() * colors.length)];

		document.body.appendChild(confetti);

		const animation = confetti.animate(
			[
				{ transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
				{
					transform: `translate(${Math.random() * 100 - 50}px, ${
						window.innerHeight
					}px) rotate(${Math.random() * 360}deg)`,
					opacity: 0,
				},
			],
			{
				duration: Math.random() * 2000 + 2000,
				easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
			}
		);

		animation.onfinish = () => confetti.remove();
	}
}
