const jsonA: any = {
  common: {
    loading: "Loading",
    theme: {
      dark: "Dark mode",
      light: "Light mode",
      switch: "Toggle color scheme mode",
    },
    homePage: "Homepage",
    requestConfirm: "Request confirmation",
    afk: {
      title: "Standby mode",
      description: "Switched to standby mode to reduce unnecessary",
      hint: "Hover over this site to reconnect.",
      comeback: "Hey, welcome back! Reconnecting",
    },
  },
};

const jsonB: any = {
  "phổ thông": {
    "Đang tải": "Đang tải",
    "Chủ đề": {
      Dark: "Chế độ tối",
      "Ánh sáng": "Chế độ ánh sáng",
      SWITCH: "Chuyển đổi chế độ SPREVEM SPRENSE",
    },
    home_page: "trang chủ",
    request_confirm: "xác nhận yêu cầu",
    AFK: {
      "Tiêu đề": "Chế độ chờ",
      "Mô tả": "Chuyển sang chế độ chờ để giảm không cần thiết",
      "Gợi ý": "Di chuột qua trang web này để kết nối lại.",
      "trở lại": "Này, chào mừng bạn quay lại! Kết nối lại",
    },
  },
};

const mergeJson = () => {
  const A = Object.keys(jsonA).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [jsonB[key] || key]: jsonA[key] },
    }),
    {}
  );
  console.log(Object.getOwnPropertyNames(jsonA));
};

export default mergeJson;
