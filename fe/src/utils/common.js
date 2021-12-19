import seedrandom from "seedrandom";

class Common {
  a11yProps(name, index) {
    return {
      id: `tab-${name}-${index}`,
      "aria-controls": `tabpanel-${name}-${index}`,
    };
  }
  randomInRange(min, max, seed = "") {
    return Math.floor(seedrandom(seed)() * (max - min + 1) + min);
  }
  formatterPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "decimal",
    }).format(price);
  }
}

export default new Common();
