const productList = [

{ 
    id: 1, 
    name: "SOFA CAO CẤP",
    category: "ghesofa", 
    price: "8.500.000 VNĐ", 
    image: "../assets/images/sp1.png", 
    stock: 2,
    shortDesc: "Thiết kế hiện đại, sang trọng cho phòng khách.", 
    fullDesc: "Ghế sofa hiện đại với thiết kế sang trọng, chất liệu cao cấp mang lại cảm giác thoải mái và đẳng cấp cho không gian phòng khách. Sản phẩm được làm từ chất liệu bền bỉ, mềm mại và phù hợp với nhiều phong cách nội thất hiện đại.", 
    material: "Khung gỗ tự nhiên kết hợp nệm bọc vải cao cấp",
    weight: "85kg",
    size: "220cm x 90cm x 85cm",
    productLink: "chi-tiet.html?id=1" 
},

{
    id: 2,
    name: "BÀN GỖ TỰ NHIÊN",
    category: "ban",
    price: "2.889.000 VNĐ",
    image: "../assets/images/sp2.png",
    stock: 20,
    shortDesc: "Bàn gỗ tự nhiên với thiết kế tối giản và độ bền cao.",
    fullDesc: "Bàn gỗ tự nhiên cao cấp với thiết kế tối giản, tinh tế và độ bền vượt trội. Sản phẩm được chế tác từ gỗ tự nhiên chắc chắn, mang đến vẻ đẹp sang trọng và ấm cúng cho không gian sống hiện đại. Phù hợp làm bàn ăn, bàn làm việc hoặc trang trí nội thất theo phong cách tối giản.",
    material: "Gỗ tự nhiên phủ sơn PU chống trầy",
    weight: "70kg",
    size: "140cm x 70cm x 75cm",
    productLink: "chi-tiet.html?id=2"
},

{
    id: 3,
    name: "TỦ TRANG TRÍ",
    category: "tu",
    price: "5.239.000 VNĐ",
    image: "../assets/images/sp3.png",
    stock: 20,
    shortDesc: "Tủ trang trí hiện đại giúp tăng tính thẩm mỹ cho căn phòng.",
    fullDesc: "Tủ trang trí hiện đại với thiết kế tinh tế, giúp tăng tính thẩm mỹ và tạo điểm nhấn sang trọng cho không gian sống. Sản phẩm được làm từ chất liệu cao cấp, có nhiều ngăn tiện dụng để trưng bày sách, đồ decor hoặc vật dụng cá nhân. Phù hợp với phòng khách, phòng ngủ hoặc không gian nội thất hiện đại.",
    material: "Gỗ MDF chống ẩm phủ melamine cao cấp",
    weight: "81kg",
    size: "120cm x 50cm x 180cm",
    productLink: "chi-tiet.html?id=3"
},

{
    id: 4,
    name: "GHẾ THƯ GIÃN",
    category: "ghesofa",
    price: "3.500.000 VNĐ",
    image: "../assets/images/sp4.png",
    stock: 22,
    shortDesc: "Ghế thư giãn mềm mại mang lại cảm giác thoải mái khi sử dụng.",
    fullDesc: "Ghế thư giãn cao cấp với thiết kế hiện đại, đệm ngồi êm ái và kiểu dáng tinh tế mang lại cảm giác thoải mái tối đa khi sử dụng. Sản phẩm phù hợp để đặt tại phòng khách, phòng ngủ hoặc góc đọc sách, giúp không gian trở nên sang trọng và ấm cúng hơn. Chất liệu bền đẹp kết hợp khung chắc chắn đảm bảo độ bền và sự tiện nghi lâu dài.",
    material: "Khung gỗ tự nhiên kết hợp nệm bọc vải cao cấp",
    weight: "93kg",
    size: "80cm x 75cm x 95cm",
    productLink: "chi-tiet.html?id=4"
},

{
    id: 5,
    name: "KỆ TIVI",
    category: "trangtri",
    price: "6.300.000 VNĐ",
    image: "../assets/images/sp5.png",
    stock: 4,
    shortDesc: "Kệ tivi hiện đại phù hợp nhiều phong cách nội thất.",
    fullDesc: "Kệ tivi hiện đại với thiết kế tối giản, sang trọng và tinh tế, phù hợp với nhiều phong cách nội thất khác nhau. Sản phẩm được làm từ chất liệu cao cấp, bền đẹp, tích hợp nhiều ngăn lưu trữ tiện lợi giúp sắp xếp thiết bị điện tử và đồ trang trí gọn gàng. Mang đến không gian phòng khách hiện đại, ấm cúng và đầy tính thẩm mỹ.",
    material: "Gỗ MDF chống ẩm phủ melamine cao cấp",
    weight: "95kg",
    size: "180cm x 40cm x 50cm",
    productLink: "chi-tiet.html?id=5"
},

{
    id: 6,
    name: "ĐÈN TRANG TRÍ",
    category: "trangtri",
    price: "2.969.000 VNĐ",
    image: "../assets/images/sp6.png",
    stock: 34,
    shortDesc: "Đèn trang trí tạo điểm nhấn sang trọng cho không gian sống.",
    fullDesc: "Đèn trang trí mang đến vẻ đẹp tinh tế và hiện đại cho không gian sống, đèn trang trí này không chỉ giúp chiếu sáng mà còn tạo điểm nhấn sang trọng cho ngôi nhà của bạn. Thiết kế cao cấp kết hợp ánh sáng dịu nhẹ giúp phòng khách, phòng ngủ hay quán cà phê trở nên ấm cúng và cuốn hút hơn. Sản phẩm phù hợp với nhiều phong cách nội thất, bền đẹp theo thời gian và dễ dàng lắp đặt.",
    material: "Khung kim loại sơn tĩnh điện kết hợp chụp đèn mica cao cấp",
    weight: "8kg",
    size: "40cm x 40cm x 60cm",
    productLink: "chi-tiet.html?id=6"
},

{
    id: 7,
    name: "GIƯỜNG HIỆN ĐẠI",
    category: "giuong",
    price: "13.519.000 VNĐ",
    image: "../assets/images/sp7.png",
    stock: 1,
    shortDesc: "Giường ngủ hiện đại với thiết kế tinh tế và chắc chắn.",
    fullDesc: "Giường ngủ hiện đại sở hữu thiết kế hiện đại mang phong cách nội thất cao cấp, chiếc giường này được chế tác từ chất liệu gỗ bền đẹp với đường nét hoàn thiện tinh xảo, tạo cảm giác sang trọng và đẳng cấp cho không gian phòng ngủ. Khung giường chắc chắn, chịu lực tốt, kết hợp đầu giường bản lớn giúp tăng sự thoải mái khi sử dụng. Tông màu gỗ ấm áp dễ dàng phối hợp với nhiều phong cách nội thất từ hiện đại đến luxury. Không chỉ mang lại vẻ đẹp thẩm mỹ, sản phẩm còn đem đến trải nghiệm nghỉ ngơi thư giãn, êm ái và bền bỉ theo thời gian — lựa chọn lý tưởng cho những ai muốn nâng tầm không gian sống.",
    material: "Gỗ MDF lõi xanh chống ẩm phủ veneer óc chó cao cấp",
    weight: "103kg",
    size: "180cm x 200cm x 110cm",
    productLink: "chi-tiet.html?id=7"
},

{
    id: 8,
    name: "BÀN LÀM VIỆC",
    category: "ban",
    price: "3.999.000 VNĐ",
    image: "../assets/images/sp8.png",
    stock: 2,
    shortDesc: "Bàn làm việc tối giản phù hợp học tập và làm việc.",
    fullDesc: "Bàn làm việc hiện đại với thiết kế tối giản và tinh tế, mang lại không gian học tập và làm việc gọn gàng, chuyên nghiệp hơn. Mặt bàn rộng rãi giúp dễ dàng bố trí laptop, sách vở và các phụ kiện cần thiết trong quá trình sử dụng. Sản phẩm được hoàn thiện từ chất liệu bền đẹp với kết cấu chắc chắn, phù hợp cho phòng ngủ, góc học tập hoặc văn phòng hiện đại. Kiểu dáng thanh lịch cùng gam màu trang nhã giúp bàn dễ dàng phối hợp với nhiều phong cách nội thất khác nhau.",
    material: "Gỗ MDF chống ẩm phủ melamine cao cấp",
    weight: "65kg",
    size: "120cm x 60cm x 75cm",
    productLink: "chi-tiet.html?id=8"
},

{
    id: 9,
    name: "SOFA GÓC CAO CẤP",
    category: "ghesofa",
    price: "9.549.000 VNĐ",
    image: "../assets/images/sp9.png",
    stock: 12,
    shortDesc: "Sofa góc hiện đại giúp tối ưu không gian phòng khách.",
    fullDesc: "Sofa góc hiện đại với thiết kế sang trọng và tinh tế, giúp tối ưu diện tích và tạo điểm nhấn nổi bật cho không gian phòng khách. Sản phẩm sở hữu kiểu dáng rộng rãi, đệm ngồi êm ái cùng tựa lưng thoải mái mang lại trải nghiệm thư giãn tối đa khi sử dụng. Chất liệu cao cấp kết hợp khung chắc chắn giúp đảm bảo độ bền lâu dài và tăng tính thẩm mỹ cho không gian sống. Thiết kế hiện đại dễ dàng phù hợp với nhiều phong cách nội thất từ căn hộ đến nhà phố cao cấp.",
    material: "Vải cao cấp bọc ngoài, khung gỗ tự nhiên",
    weight: "134kg",
    size: "180cm x 150cm x 85cm",
    productLink: "chi-tiet.html?id=9"
},

{
    id: 10,
    name: "BÀN ĂN HIỆN ĐẠI",
    category: "ban",
    price: "3.799.000 VNĐ",
    image: "../assets/images/sp10.png",
    stock: 39,
    shortDesc: "Bàn ăn hiện đại mang lại sự sang trọng cho phòng bếp.",
    fullDesc: "Bàn ăn hiện đại với thiết kế tinh tế và sang trọng, giúp không gian phòng bếp trở nên nổi bật và ấm cúng hơn. Mặt bàn rộng rãi kết hợp kết cấu chắc chắn mang lại sự thoải mái trong những bữa ăn gia đình hoặc tiếp khách. Sản phẩm được hoàn thiện từ chất liệu cao cấp với độ bền cao, dễ dàng vệ sinh và sử dụng lâu dài. Kiểu dáng hiện đại cùng gam màu thanh lịch giúp bàn ăn dễ dàng kết hợp với nhiều phong cách nội thất khác nhau, tạo nên không gian sống tiện nghi và đẳng cấp.",
    material: "Gỗ MDF chống ẩm phủ melamine cao cấp",
    weight: "79kg",
    size: "160cm x 80cm x 75cm",
    productLink: "chi-tiet.html?id=10"
},

{
    id: 11,
    name: "BÌNH DECOR NGHỆ THUẬT",
    category: "trangtri",
    price: "1.319.000 VNĐ",
    image: "../assets/images/sp11.png",
    stock: 6,
    shortDesc: "Bình decor hiện đại phù hợp nhiều phong cách nội thất.",
    fullDesc: "Bình decor nghệ thuật mang phong cách hiện đại với kiểu dáng độc đáo, giúp tăng tính thẩm mỹ cho phòng khách và không gian sống.",
    material: "Composite phủ sơn giả đá",
    weight: "8kg",
    size: "Ø40 x HH60 cm",
    productLink: "chi-tiet.html?id=11"
},

{
    id: 12,
    name: "ĐÈN CÂY HIỆN ĐẠI",
    category: "trangtri",
    price: "900.000 VNĐ",
    image: "../assets/images/sp12.png",
    stock: 7,
    shortDesc: "Đèn cây sang trọng tạo ánh sáng ấm áp cho không gian.",
    fullDesc: "Đèn cây hiện đại với thiết kế tối giản và ánh sáng dịu nhẹ giúp phòng khách trở nên sang trọng và thư giãn hơn.",
    material: "Khung kim loại sơn tĩnh điện",
    weight: "12kg",
    size: "45cm x 45cm x 170cm",
    productLink: "chi-tiet.html?id=12"
},

{
    id: 13,
    name: "GƯƠNG TREO TƯỜNG",
    category: "trangtri",
    price: "899.000 VNĐ",
    image: "../assets/images/sp13.png",
    stock: 5,
    shortDesc: "Gương treo tường hiện đại giúp mở rộng không gian.",
    fullDesc: "Gương treo tường cao cấp với khung kim loại sang trọng giúp tạo chiều sâu và tăng vẻ đẹp hiện đại cho căn phòng.",
    material: "Kính cường lực kết hợp khung nhôm",
    weight: "14kg",
    size: "80cm x 4cm x 120cm",
    productLink: "chi-tiet.html?id=13"
},

{
    id: 14,
    name: "KỆ DECOR MINI",
    category: "trangtri",
    price: "1.299.000 VNĐ",
    image: "../assets/images/sp14.png",
    stock: 4,
    shortDesc: "Kệ decor nhỏ gọn giúp trưng bày vật dụng tinh tế.",
    fullDesc: "Kệ decor hiện đại với thiết kế nhỏ gọn phù hợp để trưng bày sách, tượng hoặc cây trang trí trong không gian sống.",
    material: "Gỗ MDF chống ẩm phủ melamine",
    weight: "35kg",
    size: "60cm x 30cm x 120cm",
    productLink: "chi-tiet.html?id=14"
},

{
    id: 15,
    name: "TƯỢNG DECOR TRỪU TƯỢNG",
    category: "trangtri",
    price: "1.199.000 VNĐ",
    image: "../assets/images/sp15.png",
    stock: 6,
    shortDesc: "Tượng decor nghệ thuật mang phong cách hiện đại.",
    fullDesc: "Tượng decor trừu tượng giúp không gian nội thất trở nên sang trọng và có chiều sâu nghệ thuật hơn.",
    material: "Composite cao cấp phủ sơn nhám",
    weight: "25kg",
    size: "25cm x 25cm x 60cm",
    productLink: "chi-tiet.html?id=15"
},

{
    id: 16,
    name: "BÀN CON",
    category: "ban",
    price: "1.199.000 VNĐ",
    image: "../assets/images/sp16.png",
    stock: 3,
    shortDesc: "Bàn con hiện đại với thiết kế tối giản.",
    fullDesc: "Bàn con cao cấp với kiểu dáng hiện đại, phù hợp để trang trí và sử dụng trong phòng khách sang trọng.",
    material: "Gỗ MDF phủ veneer óc chó",
    weight: "36kg",
    size: "90cm x 50cm x 45cm",
    productLink: "chi-tiet.html?id=16"
},

{
    id: 17,
    name: "ĐỒNG HỒ TREO TƯỜNG",
    category: "trangtri",
    price: "1.559.000 VNĐ",
    image: "../assets/images/sp17.png",
    stock: 10,
    shortDesc: "Đồng hồ hiện đại tạo điểm nhấn cho không gian sống.",
    fullDesc: "Đồng hồ treo tường phong cách luxury giúp không gian trở nên nổi bật và hiện đại hơn.",
    material: "Kim loại sơn tĩnh điện",
    weight: "13kg",
    size: "Đường kính 70cm x Dày 5cm",
    productLink: "chi-tiet.html?id=17"
},

{
    id: 18,
    name: "BÌNH HOA DECOR LỚN",
    category: "trangtri",
    price: "8.999.000 VNĐ",
    image: "../assets/images/sp18.png",
    stock: 5,
    shortDesc: "Bình hoa lớn tạo điểm nhấn sang trọng cho phòng khách.",
    fullDesc: "Bình hoa decor kích thước lớn với thiết kế hiện đại giúp không gian nội thất trở nên đẳng cấp hơn.",
    material: "Gốm sứ phủ men cao cấp",
    weight: "15kg",
    size: "Ø50 x H120cm",
    productLink: "chi-tiet.html?id=18"
},

{
    id: 19,
    name: "ĐÈN THẢ TRẦN",
    category: "trangtri",
    price: "2.199.000 VNĐ",
    image: "../assets/images/sp19.png",
    stock: 8,
    shortDesc: "Đèn thả hiện đại phù hợp không gian luxury.",
    fullDesc: "Đèn thả trần cao cấp mang phong cách hiện đại với ánh sáng ấm áp giúp không gian trở nên sang trọng và cuốn hút.",
    material: "Kim loại kết hợp mica cao cấp",
    weight: "10kg",
    size: "80cm x 80cm x 50cm",
    productLink: "chi-tiet.html?id=19"
},

{
    id: 20,
    name: "GHẾ DECOR ĐƠN",
    category: "ghesofa",
    price: "1.999.000 VNĐ",
    image: "../assets/images/sp20.png",
    stock: 8,
    shortDesc: "Ghế decor hiện đại tạo điểm nhấn sang trọng.",
    fullDesc: "Ghế decor đơn với thiết kế mềm mại và tinh tế giúp không gian phòng khách trở nên nổi bật hơn.",
    material: "Khung gỗ tự nhiên bọc nệm vải",
    weight: "22kg",
    size: "75cm x 70cm x 85cm",
    productLink: "chi-tiet.html?id=20"
},

{
    id: 21,
    name: "KỆ SÁCH DECOR",
    category: "trangtri",
    price: "2.600.000 VNĐ",
    image: "../assets/images/sp21.png",
    stock: 19,
    shortDesc: "Kệ sách hiện đại giúp không gian gọn gàng hơn.",
    fullDesc: "Kệ sách decor cao cấp với thiết kế hiện đại và nhiều ngăn tiện lợi để trưng bày sách và vật dụng trang trí.",
    material: "Gỗ MDF lõi xanh chống ẩm",
    weight: "72kg",
    size: "120cm x 35cm x 190cm",
    productLink: "chi-tiet.html?id=21"
},

{
    id: 22,
    name: "LỌ HOA TỐI GIẢN",
    category: "trangtri",
    price: "699.000 VNĐ",
    image: "../assets/images/sp22.png",
    stock: 12,
    shortDesc: "Lọ hoa phong cách tối giản hiện đại.",
    fullDesc: "Lọ hoa decor với gam màu trung tính và kiểu dáng tinh tế giúp không gian trở nên nhẹ nhàng và hiện đại hơn.",
    material: "Gốm phủ men nhám",
    weight: "4kg",
    size: "Miệng 12cm x Bụng 20cm x Cao 35cm",
    productLink: "chi-tiet.html?id=22"
},

{
    id: 23,
    name: "TỦ DECOR HIỆN ĐẠI",
    category: "tu",
    price: "4.900.000 VNĐ",
    image: "../assets/images/sp23.png",
    stock: 17,
    shortDesc: "Tủ decor sang trọng với nhiều ngăn tiện lợi.",
    fullDesc: "Tủ decor hiện đại giúp tăng tính thẩm mỹ và lưu trữ vật dụng gọn gàng cho không gian sống.",
    material: "Gỗ MDF phủ melamine chống trầy",
    weight: "73kg",
    size: "150cm x 40cm x 180cm",
    productLink: "chi-tiet.html?id=23"
},

{
    id: 24,
    name: "ĐÈN BÀN DECOR",
    category: "trangtri",
    price: "2.650.000 VNĐ",
    image: "../assets/images/sp24.png",
    stock: 10,
    shortDesc: "Đèn bàn hiện đại tạo ánh sáng ấm áp.",
    fullDesc: "Đèn bàn decor với thiết kế sang trọng và ánh sáng dịu nhẹ phù hợp cho phòng ngủ hoặc phòng khách.",
    material: "Kim loại kết hợp thủy tinh",
    weight: "6kg",
    size: "40cm x 40cm x 65cm",
    productLink: "chi-tiet.html?id=24"
},

{
    id: 25,
    name: "TRANH TREO TƯỜNG",
    category: "trangtri",
    price: "1.300.000 VNĐ",
    image: "../assets/images/sp25.png",
    stock: 6,
    shortDesc: "Tranh nghệ thuật hiện đại cho không gian sống.",
    fullDesc: "Tranh treo tường phong cách hiện đại giúp không gian nội thất trở nên tinh tế và sang trọng hơn.",
    material: "Canvas cao cấp khung gỗ",
    weight: "7kg",
    size: "Ngang 100cm x Cao 140cm",
    productLink: "chi-tiet.html?id=25"
},

{
    id: 26,
    name: "MÔ HÌNH DECOR NGHỆ THUẬT",
    category: "trangtri",
    price: "2.850.000 VNĐ",
    image: "../assets/images/sp26.png",
    stock: 19,
    shortDesc: "Mô hình decor hiện đại tạo điểm nhấn sang trọng.",
    fullDesc: "Mô hình trang trí nghệ thuật với thiết kế tinh tế, phù hợp đặt tại phòng khách, kệ sách hoặc bàn làm việc giúp không gian thêm hiện đại và đẳng cấp.",
    material: "Composite cao cấp",
    weight: "15kg",
    size: "35cm x 20cm x 50cm",
    productLink: "chi-tiet.html?id=26"
},

{
    id: 27,
    name: "KỆ TREO TƯỜNG",
    category: "trangtri",
    price: "399.000 VNĐ",
    image: "../assets/images/sp27.png",
    stock: 7,
    shortDesc: "Kệ treo tường hiện đại tiết kiệm diện tích.",
    fullDesc: "Kệ treo tường tối giản giúp trưng bày vật dụng trang trí và tối ưu không gian hiệu quả.",
    material: "Gỗ MDF chống ẩm",
    weight: "12kg",
    size: "100 cm x 20cm x 5cm",
    productLink: "chi-tiet.html?id=27"
},

{
    id: 28,
    name: "GHẾ BAR HIỆN ĐẠI",
    category: "ghesofa",
    price: "699.000 VNĐ",
    image: "../assets/images/sp28.png",
    stock: 26,
    shortDesc: "Ghế bar sang trọng phù hợp quầy bếp hiện đại.",
    fullDesc: "Ghế bar hiện đại với thiết kế thanh lịch và đệm ngồi êm ái mang đến trải nghiệm sử dụng thoải mái.",
    material: "Khung kim loại bọc da PU",
    weight: "14kg",
    size: "45cm x 45cm x 100cm",
    productLink: "chi-tiet.html?id=28"
},

{
    id: 29,
    name: "BÌNH HOA GỐM LỚN",
    category: "trangtri",
    price: "4.519.000 VNĐ",
    image: "../assets/images/sp29.png",
    stock: 34,
    shortDesc: "Bình hoa lớn phong cách luxury hiện đại.",
    fullDesc: "Bình hoa decor kích thước lớn giúp không gian trở nên nổi bật và đẳng cấp hơn.",
    material: "Gốm sứ cao cấp",
    weight: "16kg",
    size: "55cm x 55cm x 135cm",
    productLink: "chi-tiet.html?id=29"
},

{
    id: 30,
    name: "TỦ RƯỢU HIỆN ĐẠI",
    category: "tu",
    price: "7.979.000 VNĐ",
    image: "../assets/images/sp30.jpg",
    stock: 2,
    shortDesc: "Tủ rượu hiện đại với thiết kế sang trọng.",
    fullDesc: "Tủ rượu cao cấp với hệ thống đèn LED hiện đại giúp không gian phòng khách trở nên nổi bật và đẳng cấp hơn.",
    material: "Gỗ MDF phủ veneer óc chó",
    weight: "96kg",
    size: "160cm x 40cm x 200cm",
    productLink: "chi-tiet.html?id=30"
},

{
    id: 31,
    name: "LỌ DECOR NGHỆ THUẬT",
    category: "trangtri",
    price: "2.429.000 VNĐ",
    image: "../assets/images/sp31.png",
    stock: 45,
    shortDesc: "Lọ decor nghệ thuật mang phong cách tối giản.",
    fullDesc: "Lọ decor hiện đại với kiểu dáng độc đáo giúp tạo điểm nhấn nổi bật cho không gian sống.",
    material: "Composite phủ sơn nhám",
    weight: "7kg",
    size: "Ø35cm x 80cm",
    productLink: "chi-tiet.html?id=31"
},

{
    id: 32,
    name: "KỆ TIVI LUXURY",
    category: "trangtri",
    price: "7.539.000 VNĐ",
    image: "../assets/images/sp32.png",
    stock: 35,
    shortDesc: "Kệ tivi cao cấp phong cách hiện đại.",
    fullDesc: "Kệ tivi luxury với thiết kế sang trọng giúp phòng khách trở nên đẳng cấp và hiện đại hơn.",
    material: "Gỗ MDF lõi xanh phủ veneer",
    weight: "92kg",
    size: "220cm x 40cm x 55cm",
    productLink: "chi-tiet.html?id=32"
},

{
    id: 33,
    name: "ĐÈN DECOR TREO TƯỜNG",
    category: "trangtri",
    price: "2.299.000 VNĐ",
    image: "../assets/images/sp33.png",
    stock: 68,
    shortDesc: "Đèn treo tường tạo ánh sáng nghệ thuật.",
    fullDesc: "Đèn decor treo tường hiện đại giúp tạo chiều sâu và điểm nhấn cho không gian nội thất.",
    material: "Kim loại phủ sơn tĩnh điện",
    weight: "7kg",
    size: "25cm x 20cm x 70cm",
    productLink: "chi-tiet.html?id=33"
},

{
    id: 34,
    name: "BÀN TRÀ HIỆN ĐẠI",
    category: "ban",
    price: "4.199.000 VNĐ",
    image: "../assets/images/sp34.png",
    stock: 30,
    shortDesc: "Bàn trà sang trọng phù hợp phòng khách hiện đại.",
    fullDesc: "Bàn trà hiện đại với thiết kế tối giản và chất liệu cao cấp giúp không gian trở nên tinh tế hơn.",
    material: "Mặt đá kết hợp gỗ MDF",
    weight: "42kg",
    size: "100cm x 60cm x 40cm",
    productLink: "chi-tiet.html?id=34"
},

{
    id: 35,
    name: "TỦ GIÀY HIỆN ĐẠI",
    category: "tu",
    price: "6.819.000 VNĐ",
    image: "../assets/images/sp35.png",
    stock: 14,
    shortDesc: "Tủ giày hiện đại giúp không gian gọn gàng.",
    fullDesc: "Tủ giày cao cấp với thiết kế tối giản và nhiều ngăn tiện lợi phù hợp cho không gian sống hiện đại.",
    material: "Gỗ MDF chống ẩm phủ melamine",
    weight: "74kg",
    size: "140cm x 35cm x 120cm",
    productLink: "chi-tiet.html?id=35"
},

{
    id: 36,
    name: "BÌNH HOA SÀN LỚN",
    category: "trangtri",
    price: "5.100.000 VNĐ",
    image: "../assets/images/sp36.png",
    stock: 32,
    shortDesc: "Bình hoa sàn lớn tạo điểm nhấn luxury.",
    fullDesc: "Bình hoa sàn cao cấp với thiết kế hiện đại giúp không gian phòng khách trở nên sang trọng và nghệ thuật hơn.",
    material: "Gốm sứ phủ men cao cấp",
    weight: "22kg",
    size: "60cm x 60cm x 150cm",
    productLink: "chi-tiet.html?id=36"
},

{
    id: 37,
    name: "KỆ RƯỢU MINI",
    category: "trangtri",
    price: "3.950.000 VNĐ",
    image: "../assets/images/sp37.png",
    stock: 23,
    shortDesc: "Kệ rượu nhỏ gọn phong cách hiện đại.",
    fullDesc: "Kệ rượu mini với thiết kế sang trọng phù hợp trưng bày rượu và vật dụng decor cao cấp.",
    material: "Gỗ MDF phủ veneer",
    weight: "38kg",
    size: "80cm x 35cm x 140cm",
    productLink: "chi-tiet.html?id=37"
},

{
    id: 38,
    name: "ĐÈN NGỦ DECOR",
    category: "trangtri",
    price: "1.950.000 VNĐ",
    image: "../assets/images/sp38.png",
    stock: 47,
    shortDesc: "Đèn ngủ hiện đại tạo không gian ấm áp.",
    fullDesc: "Đèn ngủ decor với thiết kế tinh tế và ánh sáng dịu nhẹ giúp mang lại cảm giác thư giãn.",
    material: "Kim loại kết hợp thủy tinh",
    weight: "5kg",
    size: "35cm x 35cm x 60cm",
    productLink: "chi-tiet.html?id=38"
},

{
    id: 39,
    name: "TƯỢNG DECOR LUXURY",
    category: "trangtri",
    price: "3.150.000 VNĐ",
    image: "../assets/images/sp39.png",
    stock: 51,
    shortDesc: "Tượng decor cao cấp phong cách luxury.",
    fullDesc: "Tượng decor nghệ thuật với thiết kế hiện đại giúp không gian sống trở nên sang trọng và nổi bật hơn.",
    material: "Composite phủ giả đá",
    weight: "15kg",
    size: "30cm x 30cm x 75cm",
    productLink: "chi-tiet.html?id=39"
},

{
    id: 40,
    name: "THẢM TRANG TRÍ CAO CẤP",
    category: "trangtri",
    price: "1.850.000 VNĐ",
    image: "../assets/images/sp40.png",
    stock: 6,
    shortDesc: "Thảm trải sàn tối giản mang lại cảm giác ấm cúng và sang trọng.",
    fullDesc: "Thảm trang trí cao cấp với chất liệu mềm mại và thiết kế hiện đại, phù hợp cho phòng khách, phòng ngủ hoặc không gian decor giúp tăng tính thẩm mỹ và sự tinh tế cho nội thất.",
    material: "Len cashmere cao cấp mềm mại",
    weight: "15kg",
    size: "200cm x 300cm",
    productLink: "chi-tiet.html?id=40"
},

{
    id: 41,
    name: "GIƯỜNG GỖ SỒI HIỆN ĐẠI",
    category: "giuong",
    price: "12.500.000 VNĐ",
    image: "../assets/images/sp41.png",
    stock: 18,
    shortDesc: "Giường ngủ gỗ sồi hiện đại và chắc chắn.",
    fullDesc: "Giường ngủ hiện đại với thiết kế tinh tế, phù hợp nhiều phong cách nội thất cao cấp.",
    material: "Gỗ sồi tự nhiên",
    weight: "95kg",
    size: "180cm x 200cm x Cao 110cm",
    productLink: "chi-tiet.html?id=41"
},

{
    id: 42,
    name: "GIƯỜNG BỌC NỆM LUXURY",
    category: "giuong",
    price: "15.900.000 VNĐ",
    image: "../assets/images/sp42.png",
    stock: 5,
    shortDesc: "Giường ngủ bọc nệm sang trọng.",
    fullDesc: "Giường ngủ phong cách luxury với phần đầu giường bọc nệm cao cấp tạo cảm giác êm ái.",
    material: "Khung gỗ tự nhiên bọc nệm",
    weight: "110kg",
    size: "200cm x 220cm x Cao 120cm",
    productLink: "chi-tiet.html?id=42"
},

{
    id: 43,
    name: "GIƯỜNG TỐI GIẢN",
    category: "giuong",
    price: "9.800.000 VNĐ",
    image: "../assets/images/sp43.png",
    stock: 17,
    shortDesc: "Giường ngủ phong cách tối giản hiện đại.",
    fullDesc: "Giường ngủ thiết kế tối giản phù hợp căn hộ hiện đại và không gian nhỏ gọn.",
    material: "Gỗ MDF lõi xanh",
    weight: "84kg",
    size: "160cm x 200cm x Cao 100cm",
    productLink: "chi-tiet.html?id=43"
},

{
    id: 44,
    name: "GIƯỜNG GỖ ÓC CHÓ",
    category: "giuong",
    price: "17.500.000 VNĐ",
    image: "../assets/images/sp44.png",
    stock: 25,
    shortDesc: "Giường ngủ gỗ óc chó cao cấp.",
    fullDesc: "Giường ngủ cao cấp với gam màu gỗ óc chó sang trọng và hiện đại.",
    material: "Gỗ óc chó tự nhiên",
    weight: "120kg",
    size: "180cm x 200cm x Cao 115cm",
    productLink: "chi-tiet.html?id=44"
},

{
    id: 45,
    name: "GIƯỜNG NGỦ CHÂU ÂU",
    category: "giuong",
    price: "16.199.000 VNĐ",
    image: "../assets/images/sp45.png",
    stock: 1,
    shortDesc: "Giường ngủ phong cách Châu Âu hiện đại.",
    fullDesc: "Thiết kế sang trọng với các đường nét mềm mại mang phong cách nội thất Châu Âu cao cấp.",
    material: "Gỗ tự nhiên phủ veneer",
    weight: "118kg",
    size: "200cm x 220cm x Cao 125cm",
    productLink: "chi-tiet.html?id=45"
},

{
    id: 46,
    name: "GHẾ SOFA ĐƠN",
    category: "ghesofa",
    price: "3.199.000 VNĐ",
    image: "../assets/images/sp46.png",
    stock: 18,
    shortDesc: "Ghế sofa đơn hiện đại.",
    fullDesc: "Ghế sofa đơn với thiết kế hiện đại phù hợp phòng khách hoặc góc thư giãn.",
    material: "Khung gỗ bọc nệm vải",
    weight: "25kg",
    size: "80cm x 75cm x Cao 90cm",
    productLink: "chi-tiet.html?id=46"
},

{
    id: 47,
    name: "GHẾ GỖ TỰ NHIÊN",
    category: "ghesofa",
    price: "619.000 VNĐ",
    image: "../assets/images/sp47.png",
    stock: 36,
    shortDesc: "Ghế gỗ phong cách tối giản.",
    fullDesc: "Ghế gỗ hiện đại với thiết kế chắc chắn và tinh tế.",
    material: "Gỗ sồi tự nhiên",
    weight: "18kg",
    size: "45cm x 50cm x Cao 85cm",
    productLink: "chi-tiet.html?id=47"
},

{
    id: 48,
    name: "GHẾ THƯ GIÃN CAO CẤP",
    category: "ghesofa",
    price: "3.199.000 VNĐ",
    image: "../assets/images/sp48.png",
    stock: 25,
    shortDesc: "Ghế thư giãn sang trọng.",
    fullDesc: "Ghế thư giãn hiện đại với đệm ngồi mềm mại và kiểu dáng tinh tế.",
    material: "Khung thép bọc nệm cao cấp",
    weight: "30kg",
    size: "90cm x 85cm x Cao 100cm",
    productLink: "chi-tiet.html?id=48"
},

{
    id: 49,
    name: "GHẾ ĂN HIỆN ĐẠI",
    category: "ghesofa",
    price: "1.888.000 VNĐ",
    image: "../assets/images/sp49.png",
    stock: 44,
    shortDesc: "Ghế ăn hiện đại cho phòng bếp.",
    fullDesc: "Ghế ăn với thiết kế tối giản phù hợp bàn ăn hiện đại.",
    material: "Khung kim loại sơn tĩnh điện",
    weight: "12kg",
    size: "45cm x 50cm x Cao 90cm",
    productLink: "chi-tiet.html?id=49"
},

{
    id: 50,
    name: "GHẾ DA LUXURY",
    category: "ghesofa",
    price: "3.299.000 VNĐ",
    image: "../assets/images/sp50.png",
    stock: 12,
    shortDesc: "Ghế da cao cấp phong cách luxury.",
    fullDesc: "Ghế da sang trọng phù hợp không gian nội thất hiện đại và đẳng cấp.",
    material: "Da PU cao cấp kết hợp khung gỗ",
    weight: "28kg",
    size: "85cm x 80cm x Cao 95cm",
    productLink: "chi-tiet.html?id=50"
},

{
    id: 51,
    name: "TỦ QUẦN ÁO HIỆN ĐẠI",
    category: "tu",
    price: "8.579.000 VNĐ",
    image: "../assets/images/sp51.png",
    stock: 18,
    shortDesc: "Tủ quần áo hiện đại nhiều ngăn tiện lợi.",
    fullDesc: "Tủ quần áo thiết kế hiện đại giúp tối ưu không gian lưu trữ.",
    material: "Gỗ MDF chống ẩm",
    weight: "105kg",
    size: "180cm x 60cm x Cao 220cm",
    productLink: "chi-tiet.html?id=51"
},

{
    id: 52,
    name: "TỦ ĐẦU GIƯỜNG",
    category: "tu",
    price: "2.959.000 VNĐ",
    image: "../assets/images/sp52.png",
    stock: 6,
    shortDesc: "Tủ đầu giường nhỏ gọn hiện đại.",
    fullDesc: "Tủ đầu giường tiện lợi với thiết kế tối giản và tinh tế.",
    material: "Gỗ MDF phủ melamine",
    weight: "24kg",
    size: "50cm x 40cm x Cao 55cm",
    productLink: "chi-tiet.html?id=52"
},

{
    id: 53,
    name: "TỦ TRƯNG BÀY CAO CẤP",
    category: "tu",
    price: "8.199.000 VNĐ",
    image: "../assets/images/sp53.png",
    stock: 4,
    shortDesc: "Tủ trưng bày sang trọng.",
    fullDesc: "Tủ trưng bày hiện đại giúp tăng tính thẩm mỹ cho không gian sống.",
    material: "Kính cường lực kết hợp gỗ MDF",
    weight: "89kg",
    size: "140cm x 40cm x Cao 200cm",
    productLink: "chi-tiet.html?id=53"
},

{
    id: 54,
    name: "TỦ HỒ SƠ VĂN PHÒNG",
    category: "tu",
    price: "4.859.000 VNĐ",
    image: "../assets/images/sp54.png",
    stock: 6,
    shortDesc: "Tủ hồ sơ tiện lợi cho văn phòng.",
    fullDesc: "Thiết kế nhiều ngăn giúp lưu trữ tài liệu gọn gàng và chuyên nghiệp.",
    material: "Gỗ công nghiệp phủ melamine",
    weight: "66kg",
    size: "100cm x 40cm x Cao 180cm",
    productLink: "chi-tiet.html?id=54"
},

{
    id: 55,
    name: "TỦ BẾP HIỆN ĐẠI",
    category: "tu",
    price: "13.900.000 VNĐ",
    image: "../assets/images/sp55.png",
    stock: 5,
    shortDesc: "Tủ bếp hiện đại và sang trọng.",
    fullDesc: "Tủ bếp với thiết kế hiện đại giúp tối ưu không gian sử dụng.",
    material: "Gỗ MDF lõi xanh chống ẩm",
    weight: "130kg",
    size: "260cm x 60cm x Cao 240cm",
    productLink: "chi-tiet.html?id=55"
},

{
    id: 56,
    name: "BÀN TRANG ĐIỂM",
    category: "ban",
    price: "4.500.000 VNĐ",
    image: "../assets/images/sp56.png",
    stock: 19,
    shortDesc: "Bàn trang điểm hiện đại cho phòng ngủ.",
    fullDesc: "Bàn trang điểm thiết kế tinh tế với gương và ngăn lưu trữ tiện lợi.",
    material: "Gỗ MDF phủ veneer",
    weight: "42kg",
    size: "100cm x 45cm x Cao 140cm",
    productLink: "chi-tiet.html?id=56"
},

{
    id: 57,
    name: "BÀN HỌC SINH",
    category: "ban",
    price: "2.300.000 VNĐ",
    image: "../assets/images/sp57.png",
    stock: 25,
    shortDesc: "Bàn học nhỏ gọn hiện đại.",
    fullDesc: "Bàn học thiết kế tối giản phù hợp học tập và làm việc tại nhà.",
    material: "Gỗ MDF chống ẩm",
    weight: "30kg",
    size: "120cm x 55cm x Cao 75cm",
    productLink: "chi-tiet.html?id=57"
},

{
    id: 58,
    name: "BÀN LÀM VIỆC CHỮ L",
    category: "ban",
    price: "5.900.000 VNĐ",
    image: "../assets/images/sp58.png",
    stock: 2,
    shortDesc: "Bàn chữ L hiện đại tối ưu góc làm việc.",
    fullDesc: "Thiết kế rộng rãi giúp bố trí thiết bị làm việc tiện lợi hơn.",
    material: "Gỗ MDF kết hợp khung thép",
    weight: "55kg",
    size: "160cm x 140cm x Cao 75cm",
    productLink: "chi-tiet.html?id=58"
},

{
    id: 59,
    name: "BÀN CON",
    category: "ban",
    price: "1.950.000 VNĐ",
    image: "../assets/images/sp59.png",
    stock: 10,
    shortDesc: "Bàn con nhỏ gọn cho phòng khách.",
    fullDesc: "Bàn con hiện đại giúp tăng tính tiện nghi và thẩm mỹ.",
    material: "Mặt đá kết hợp chân kim loại",
    weight: "18kg",
    size: "50cm x 50cm x Cao 55cm",
    productLink: "chi-tiet.html?id=59"
},

{
    id: 60,
    name: "BÀN HỌP HIỆN ĐẠI",
    category: "ban",
    price: "12.800.000 VNĐ",
    image: "../assets/images/sp60.png",
    stock: 10,
    shortDesc: "Bàn họp hiện đại cho văn phòng.",
    fullDesc: "Bàn họp thiết kế sang trọng phù hợp không gian văn phòng chuyên nghiệp.",
    material: "Gỗ công nghiệp phủ melamine",
    weight: "95kg",
    size: "240cm x 120cm x Cao 75cm",
    productLink: "chi-tiet.html?id=60"
},

{
    id: 61,
    name: "TỦ TRANG ĐIỂM",
    category: "tu",
    price: "3.300.000 VNĐ",
    image: "../assets/images/sp61.png",
    stock: 9,
    shortDesc: "Tủ trang điểm hiện đại.",
    fullDesc: "Tủ trang điểm thiết kế tinh tế với nhiều ngăn tiện lợi.",
    material: "Gỗ MDF chống ẩm",
    weight: "30kg",
    size: "150cm x 55cm x Cao 130cm",
    productLink: "chi-tiet.html?id=61"
},

{
    id: 62,
    name: "RÈM CỬA CAO CẤP",
    category: "trangtri",
    price: "2.450.000 VNĐ",
    image: "../assets/images/sp62.png",
    stock: 35,
    shortDesc: "Rèm cửa hiện đại chống nắng hiệu quả.",
    fullDesc: "Rèm cửa thiết kế sang trọng với chất liệu dày dặn, giúp chống nắng và tạo không gian ấm cúng cho phòng khách hoặc phòng ngủ.",
    material: "Vải polyester cao cấp",
    weight: "12kg",
    size: "Ngang 250cm x Cao 270cm",
    productLink: "chi-tiet.html?id=62"
},

{
    id: 63,
    name: "RÈM CỬA 2 LỚP",
    category: "trangtri",
    price: "3.100.000 VNĐ",
    image: "../assets/images/sp63.png",
    stock: 30,
    shortDesc: "Rèm cửa 2 lớp sang trọng.",
    fullDesc: "Rèm cửa 2 lớp gồm lớp voan và lớp chống nắng, phù hợp cho không gian hiện đại và tăng tính thẩm mỹ cho căn phòng.",
    material: "Vải bố + voan cao cấp",
    weight: "15kg",
    size: "Ngang 300cm x Cao 280cm",
    productLink: "chi-tiet.html?id=63"
}

];
