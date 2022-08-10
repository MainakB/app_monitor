// export const setCookie = (
//   cookieName: string,
//   cookieValue: string | number,
//   hourToExpire: number
// ) => {
//   let date = new Date();
//   date.setTime(date.getTime() + hourToExpire * 60 * 60 * 1000);
//   document.cookie =
//     cookieName + " = " + cookieValue + "; expires = " + date.toUTCString();
// };

export const getCookie = (cookieName: string) => {
  let name = cookieName + "=";
  const allCookieArray = document.cookie.split(";");
  for (var i = 0; i < allCookieArray.length; i++) {
    let temp = allCookieArray[i].trim();
    if (temp.indexOf(name) === 0)
      return temp.substring(name.length, temp.length);
  }
  return "";
};

// export const getCookieValue = (
//   cookieName: string,
//   cookievalue: string | number,
//   defaultValue: any
// ) => {
//   const cookieObj = getCookie(cookieName);
//   let defValue = defaultValue;
//   if (cookieObj !== "") {
//     let cookieValueToSet = JSON.parse(cookieObj);
//     defValue = cookieValueToSet[cookievalue];
//   }
//   return defValue;
// };

export const getEncryptedCookieValue = (
  cookieName: string,
  cookievalue: string,
  defaultValue: any
) => {
  const cookieObj = getCookie(cookieName);
  let defValue = defaultValue;
  if (cookieObj !== "") {
    let cookieValueToSet = JSON.parse(
      Buffer.from(cookieObj, "base64").toString("ascii")
    );
    defValue = cookieValueToSet[cookievalue];
  }
  return defValue;
};

export const setEncryptedCookie = (
  cookieName: string,
  cookieValue: string,
  hourToExpire: number
) => {
  let date = new Date();
  date.setTime(date.getTime() + hourToExpire * 60 * 60 * 1000);
  document.cookie =
    cookieName +
    " = " +
    Buffer.from(cookieValue).toString("base64") +
    "; expires = " +
    date.toUTCString();
};

export const deleteCookie = (cookiename: String) => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  const expires = ";expires=" + d;
  const name = cookiename;
  const value = "";
  document.cookie = name + "=" + value + expires + ";";
};

export const clearListCookiesAndLocalStorage = () => {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].split("=");
    deleteCookie(cookie[0]);
  }
  localStorage.clear();
  //   window.location = ""; // TO REFRESH THE PAGE
  window.location.reload();
};

export const clearAllCookies = () => {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].split("=");
    deleteCookie(cookie[0]);
  }
};
