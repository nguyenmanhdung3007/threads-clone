import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// interceptors request (chặn trước gửi đi)
httpRequest.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    // đính accesstoken vào authorization của headers trong config gửi đi
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// BIẾN QUẢN LÝ TRẠNG THÁI REFRESH TOKEN
// isRefreshing: Cờ đánh dấu có đang refresh token không

let isRefreshing = false;

// queueJobs: Mảng chứa các request đang đợi refresh token hoàn thành
let queueJobs = [];

/**
 * GIẢI PHÓNG HÀNG ĐỢI
 */
function clearQueue(error = null) {
  queueJobs.forEach((job) => {
    if (error) {
      job.reject(error);
    } else {
      job.resolve();
    }
  });

  // xóa hàng đợi sau mỗi lần refresh
  queueJobs = [];
}

/**
 * HÀM GỬI REQUEST REFRESH TOKEN
 */

async function sendRefreshToken(config, refreshToken) {
  // Đánh dấu đang refresh để các request khác biết phải đợi
  isRefreshing = true;

  // Gọi API refresh token bằng axios thuần (không dùng httpRequest để tránh loop)
  // API này không cần access token, chỉ cần refresh token
  const response = await axios.post(`${config.baseURL}/auth/refresh-token`, {
    refresh_token: refreshToken,
  });

  // Lấy token mới từ response
  const { access_token, refresh_token } = response.data;

  // Lưu token mới vào localStorage
  // Các request sau sẽ tự động dùng token mới nhờ request interceptor
  localStorage.setItem("accessToken", access_token);
  localStorage.setItem("refreshToken", refresh_token);
}

/**
 * RESPONSE INTERCEPTOR CHÍNH - XỬ LÝ LỖI 401 VÀ REFRESH TOKEN
 */

axios.interceptors.response.use((response) => {
  return response.data;
});

// interceptor response (chặn sau phản hồi từ server)
httpRequest.interceptors.response.use(
  // FUNCTION 1: Xử lý response thành công
  (response) => response.data,
  // FUNCTION 2: Xử lý response lỗi
  async (error) => {
    // Lấy refresh token từ localStorage
    const refreshToken = localStorage.getItem("refreshToken");

    // Chỉ xử lý nếu:
    // - Lỗi 401 (Unauthorized - token hết hạn)
    // - Có refresh token (user đã đăng nhập)
    if (error.status === 401 && refreshToken) {
      // Lưu lại config của request bị lỗi để retry sau
      const original = error.config;

      try {
        // TRƯỜNG HỢP 1: CHƯA CÓ AI REFRESH, REQUEST NÀY SẼ REFRESH
        if (!isRefreshing) {
          // // Gọi API refresh token
          // await sendRefreshToken(original, refreshToken);
          // console.log(123);

          // // Refresh thành công => "Đánh thức" tất cả request đang đợi
          // // Gọi resolve() cho từng job trong queue
          // queueJobs.forEach((job) => job.resolve());

          try {
            await sendRefreshToken(original, refreshToken);
            console.log(123);

            // refresh thành công → đánh thức + clear queue
            clearQueue();
          } catch (error) {
            // refresh thất bại → reject + clear queue
            clearQueue(error);
            throw error;
          } finally {
            // BẮT BUỘC reset
            isRefreshing = false;
          }
        }
        // TRƯỜNG HỢP 2: ĐANG CÓ REQUEST KHÁC REFRESH TOKEN
        else {
          // Tạo Promise mới và đưa vào queue
          // Promise này sẽ đợi cho đến khi refresh xong
          await new Promise((resolve, reject) => {
            // Đưa resolve và reject vào queue
            // Khi refresh xong, sẽ gọi resolve() để "đánh thức" Promise này
            queueJobs.push({ resolve, reject });
          });
          // Khi thoát khỏi Promise => refresh đã xong => có token mới
        }

        // Sau khi có token mới (dù đợi hay tự refresh)
        // Retry request ban đầu với token mới
        // httpRequest.request() sẽ tự động thêm token mới vào header
        const retryRequest = await httpRequest.request(original);

        // Nếu retry thất bại (vẫn bị lỗi 401), reject ngay
        if (retryRequest.status === 401) {
          return Promise.reject(error);
        }

        return retryRequest;
      } catch (error) {
        // Nếu refresh thất bại (refresh token cũng hết hạn)
        // Reject tất cả request đang đợi trong queue
        queueJobs.forEach((job) => job.reject());

        // Trả về lỗi để code gọi API xử lý (thường là redirect về trang login)
        return Promise.reject(error);
      }
    }
    // Nếu không phải lỗi 401 hoặc không có refresh token
    // Trả về lỗi như bình thường

    return Promise.reject(error);
  }
);

export default httpRequest;
