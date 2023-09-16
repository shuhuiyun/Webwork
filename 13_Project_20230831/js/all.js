//圖表1

var ctx = document.getElementById("myChart");
var chart = new Chart(ctx, {
  type: "bar", // 圖表類型
  data: {
    labels: ["多肉植物", "仙人掌", "黃金葛"], //顯示區間名稱
    datasets: [
      {
        label: "多肉植物",
        data: [45, 30, 25, 10], // 資料
        backgroundColor: [
          "rgba(127, 178, 45, 0.2)", // 第一個 bar 顏色
          "rgba(196, 201, 40, 0.2)",
          "rgba(191, 177, 38, 0.2)",
        ],
        borderColor: [
          "rgba(127, 178, 45, 1)",
          "rgba(196, 201, 40, 1)",
          "rgba(191, 177, 38, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  Option: {
    maintainAspectRatio: false,
  },
});
