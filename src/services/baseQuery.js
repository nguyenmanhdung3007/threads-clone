import httpRequest from "../utils/httpRequest";

// custom base Query kết hợp axios
const baseQuery = async (args) => {
  // so sánh tham số nhận được đầu vào có phải là object không
  const isObject = typeof args === "object";

  // tùy chỉnh lại config theo type of args
  const config = {
    url: isObject ? args.url : args,
    method: isObject ? args.method : "GET",
  };

  if (isObject) {
    if (args.body) config.data = args.body;
    if (args.headers) config.headers = args.headers;
    if (args.params) config.params = args.params;
  }

  console.log(config);
  try {
    const response = await httpRequest(config);

    return { data: response };
  } catch (error) {
    console.log("Có lỗi xảy ra: ", error);
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      },
    };
  }
};

export default baseQuery;
