import faker from "faker";

export default {
  API_ROOT: "https://localhost:5001",
  BANNERS: [
    "https://tea-3.lozi.vn/v1/images/resized/banner-mobile-2201-1637815646?w=266&type=o",
    "https://tea-3.lozi.vn/v1/images/resized/banner-mobile-2206-1637828227?w=266&type=o",
    "https://tea-3.lozi.vn/v1/images/resized/banner-mobile-2211-1637830694?w=266&type=o",
    "https://tea-3.lozi.vn/v1/images/resized/banner-mobile-1804-1621311479?w=266&type=o",
    "https://tea-3.lozi.vn/v1/images/resized/banner-mobile-2183-1637392406?w=266&type=o",
    "https://tea-3.lozi.vn/v1/images/resized/banner-mobile-2226-1638429741?w=266&type=o",
    "https://tea-3.lozi.vn/v1/images/resized/banner-mobile-1845-1622537721?w=266&type=o",
    "https://tea-3.lozi.vn/v1/images/resized/banner-mobile-1955-1623938524?w=266&type=o",
    "https://tea-3.lozi.vn/v1/images/resized/banner-mobile-1957-1623993489?w=266&type=o",
  ],
  SLICK_SETTINGS: {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
  },
  CATEGORIES: [
    "all",
    "food",
    "beverage",
    "vegan",
    "bakery",
    "noodles",
    "fast-food",
  ],
  BRANDS: [
    "https://demo2wpopal.b-cdn.net/ecolive/wp-content/uploads/2021/10/brand3.svg",
    "https://demo2wpopal.b-cdn.net/ecolive/wp-content/uploads/2021/10/brand4.svg",
    "https://demo2wpopal.b-cdn.net/ecolive/wp-content/uploads/2021/10/brand5.svg",
    "https://demo2wpopal.b-cdn.net/ecolive/wp-content/uploads/2021/10/brand6.svg",
    "https://demo2wpopal.b-cdn.net/ecolive/wp-content/uploads/2021/10/brand2.svg",
  ],
  ORDER_STATUS: [
    { text: "Đang lấy hàng", color: "#233E8B" },
    { text: "Đang vận chuyển", color: "#FF7800" },
    { text: "Đã giao", color: "#66DE93" },
  ],
};
