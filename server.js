const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();

// Middleware để parse JSON
app.use(express.json());

// Phục vụ các file tĩnh
app.use(express.static("."));

// API endpoint để cập nhật trạng thái
app.post("/update-status", async (req, res) => {
	try {
		const statusData = req.body;
		await fs.writeFile(
			"status.json",
			JSON.stringify(statusData, null, 2),
			"utf8"
		);
		res.json({ success: true });
	} catch (error) {
		console.error("Lỗi khi lưu trạng thái:", error);
		res.status(500).json({ error: "Không thể lưu trạng thái" });
	}
});

// API endpoint để lấy trạng thái
app.get("/get-status", async (req, res) => {
	try {
		const data = await fs.readFile("status.json", "utf8");
		res.json(JSON.parse(data));
	} catch (error) {
		if (error.code === "ENOENT") {
			res.json({ timestamp: null });
		} else {
			console.error("Lỗi khi đọc trạng thái:", error);
			res.status(500).json({ error: "Không thể đọc trạng thái" });
		}
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
