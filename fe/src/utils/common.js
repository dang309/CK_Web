import seedrandom from "seedrandom";
import { filter } from "lodash";

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

  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);
  }

  applySortFilter(array, comparator, query) {
    if (!array || array.length === 0) return;
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  swapArrayIndex(arr, index1, index2) {
    if (!arr || arr.length === 0) return;
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
    return arr;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default new Common();
