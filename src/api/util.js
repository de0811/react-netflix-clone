export const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key, defaultVal) => {
    const data = JSON.parse(localStorage.getItem(key));
    if (isEmpty(data)) {
      return defaultVal;
    }
    return data;
  },
};

export function isEmpty(obj) {
  if (obj === null || typeof obj === "undefined") return true;
  if (obj === "" || obj === [] || obj === {}) return true;

  return false;
}

export function isNotEmpty(obj) {
  return !isEmpty(obj);
}

// 일정 길이 이상의 문자열이면 ... 하고 뒤에 붙여줌
export function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
