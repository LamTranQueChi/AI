

var danhSachThongBao = [];
var container = document.getElementById("notification-list");
var filters = document.querySelectorAll(".filter-btn");



function taiDuLieuThongBao() {

    danhSachThongBao = [

        {
            type: "ai",
            title: "AI phát hiện hồ sơ còn thiếu giấy tờ",
            content: "Hồ sơ Đăng ký kết hôn còn thiếu Giấy xác nhận tình trạng hôn nhân.",
            time: "Vừa xong",
            unread: true
        },

        {
            type: "hoso",
            title: "Hồ sơ đang được xử lý",
            content: "Hồ sơ Cấp lại CCCD đang được phòng chuyên môn xử lý.",
            time: "2 giờ trước",
            unread: true
        },

        {
            type: "system",
            title: "Thông báo hệ thống",
            content: "Hệ thống sẽ được bảo trì vào lúc 22:00.",
            time: "Hôm qua",
            unread: false
        }

    ];

}


// ===============================
// HIỂN THỊ THÔNG BÁO
// ===============================

function hienThiThongBao(loai) {

    var html = "";

    container.innerHTML = "";

    if (loai == null) {
        loai = "all";
    }

    var dem = 0;

    for (var i = 0; i < danhSachThongBao.length; i++) {

        if (loai == "all" || danhSachThongBao[i].type == loai) {

            dem++;

            html += "<div class='notification-card";

            if (danhSachThongBao[i].unread == true) {
                html += " unread";
            }

            html += "'>";

            html += "<div class='notification-content'>";

            html += "<div class='notification-header'>";

            html += "<h3>";
            html += danhSachThongBao[i].title;
            html += "</h3>";

            html += "<span>";
            html += danhSachThongBao[i].time;
            html += "</span>";

            html += "</div>";

            html += "<p>";
            html += danhSachThongBao[i].content;
            html += "</p>";

            html += "</div>";

            html += "</div>";

        }

    }

    if (dem == 0) {

        html =
            "<div class='empty-state'>" +
            "<h3>Chưa có thông báo</h3>" +
            "<p>Thông báo sẽ hiển thị tại đây.</p>" +
            "</div>";

    }

    container.innerHTML = html;

}


// ===============================
// ĐÁNH DẤU ĐÃ ĐỌC
// ===============================

function danhDauTatCaDaDoc() {

    for (var i = 0; i < danhSachThongBao.length; i++) {

        danhSachThongBao[i].unread = false;

    }

    hienThiThongBao("all");

}


// ===============================
// BỘ LỌC
// ===============================

for (var i = 0; i < filters.length; i++) {

    filters[i].addEventListener("click", function () {

        for (var j = 0; j < filters.length; j++) {

            filters[j].classList.remove("active");
            filters[j].classList.remove("btn-primary");
            filters[j].classList.add("btn-outline");

        }

        this.classList.add("active");
        this.classList.remove("btn-outline");
        this.classList.add("btn-primary");

        var loai = this.getAttribute("data-type");

        hienThiThongBao(loai);

    });

}


// ===============================
// NÚT ĐÁNH DẤU ĐÃ ĐỌC
// ===============================

var btnDaDoc = document.getElementById("btn-read-all");

if (btnDaDoc != null) {

    btnDaDoc.addEventListener("click", function () {

        danhDauTatCaDaDoc();

    });

}


// ===============================
// KHỞI TẠO
// ===============================

taiDuLieuThongBao();

hienThiThongBao("all");