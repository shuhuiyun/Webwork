data = [];

//把資料存進去
function save() {
  var dataTxt = JSON.stringify(data); //陣列轉字串
  localStorage.setItem("dataItem", dataTxt); //存字串
  console.log(dataTxt);
}

//把資料取出來
function read() {
  var getData = localStorage.getItem("dataItem"); //取字串
  data = JSON.parse(getData) || []; //如果沒有資料就是空字串
}

//最上方當天日期
function day() {
  const currentDate = new Date(); // 獲得當前日期

  // 獲得星期幾的名稱
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];

  // 獲得日期
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // 注意月份是從0開始的，所以要加1
  const year = currentDate.getFullYear();

  // 格式化日期
  const formattedDate = month + "-" + day + "-" + year;

  // 顯示在頁面中
  //document.getElementById("dateDisplay").innerText = formattedDate;

  document.querySelector(".text__week").textContent = dayOfWeek;
  document.querySelector(".text__date").textContent = formattedDate;
}
day();

//改變.contain的高度
const containHight = document.querySelector(".contain");
function changeHight() {
  containHight.style.height = "100%";
}

//預設
const listContent = document.querySelector(".list");
const undone = document.querySelector(".undone");
const allBtn = document.querySelector(".all__btn");
const listItems = document.querySelectorAll(".list__item");
function updateData() {
  read();
  const undoneItems = data.filter((item) => !item.done); //篩選出未完成的項目
  undone.textContent = `${undoneItems.length} 個待完成項目`; //未完成的新陣列Text

  const listHTML = data
    .map(
      (item, index) => `<li class="${
        item.done ? "active" : "" //三元運算子
      }" data-number="${index}">
    <button class="check" ><i class="bi bi-check-lg" ></i></button
    ><span
      ><p>${item.project}</p>
      <div class="del__button ">
        <i class="bi bi-trash-fill "></i></div
    ></span>
  </li>`
    )
    .join(""); //組合起來

  listContent.innerHTML = listHTML;

  listItems.forEach((item) => {
    if (item.textContent == "全部") {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}
updateData();

//新增項目
const addText = document.querySelector(".input__text");
const addButton = document.querySelector(".btn");
function add() {
  const inputValue = addText.value.trim();
  if (inputValue == "") {
    alert("請輸入待辦事項");
  } else {
    data.push({ project: inputValue, done: false });
    addText.value = "";
    save();
    updateData();
  }
}
addButton.addEventListener("click", add);

//按下Enter
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && addText.value.trim() !== "") {
    add();
  }
});

//打勾單個項目
listContent.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (li !== null) {
    const dataItem = data[li.getAttribute("data-number")];
    dataItem.done = !dataItem.done; //三元運算符做切換
    save();
    updateData(); //這裡就會更新class="active"
    return;
  }
});

//刪除單個項目
listContent.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("bi-trash-fill") ||
    e.target.classList.contains("del__button")
  ) {
    const li = e.target.closest("li");
    const itemIndex = li.getAttribute("data-number");

    data.splice(itemIndex, 1);
    save();
    updateData();
  }
});

//清除已完成項目
const delAll = document.querySelector(".delAll");
delAll.addEventListener("click", function (e) {
  newData = data.filter((item) => {
    return item.done == false;
  });
  data = newData;
  save();
  updateData();
});

//篩選資料
const listBtn = document.querySelector(".list__btn");

listBtn.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  listItems.forEach((item) => item.classList.remove("active"));
  read();
  if (data.length == 0) {
    if (
      e.target.textContent == "全部" ||
      e.target.textContent == "待完成" ||
      e.target.textContent == "已完成"
    ) {
      li.classList.add("active");
    }
  } else {
    let str = "";

    data.forEach((item, index) => {
      const content = `<li class="${
        item.done ? "active" : ""
      }" data-number="${index}">
    <button class="check" ><i class="bi bi-check-lg" ></i></button
    ><span
      ><p>${item.project}</p>
      <div class="del__button ">
        <i class="bi bi-trash-fill "></i></div
    ></span>
  </li>`;

      if (e.target.textContent == "全部") {
        str += content;
      } else if (e.target.textContent == "待完成" && item.done == false) {
        str += content;
      } else if (e.target.textContent == "已完成" && item.done == true) {
        str += content;
      }
      listContent.innerHTML = str;
      li.classList.add("active");
    });
  }
});
