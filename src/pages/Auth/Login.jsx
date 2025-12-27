import { useGetUserInfoQuery, useLoginMutation } from "@/services/auth/authApi";
import { useDispatch } from "react-redux";

import { Link, useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/schemas/loginSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const [loginFunc, response] = useLoginMutation();
  const { isSuccess } = useGetUserInfoQuery();
  const dispatch = useDispatch();

  // Lấy query params từ URL (ví dụ: ?continue=/profile)
  // -> trường hợp người dùng đang ở page khác ngoài home
  const [searchParams] = useSearchParams();
  const continueUrl = searchParams.get("continue") || "/"; // Mặc định là home

  // khi vào trang kiểm tra xem có đang được đăng nhập không?
  // nếu đăng nhập thì quay trở lại home
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  // Xử lý đăng nhập thành công
  useEffect(() => {
    if (response.isSuccess) {
      const { access_token, refresh_token } = response.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      navigate("/");
    }
  }, [response, navigate]);

  const loginHandler = async (credential) => {
    try {
      await loginFunc(credential).unwrap();
    } catch (error) {
      console.log(error?.response?.data);
      const serverErrors = error?.response?.data?.message;
      // nếu có lỗi và lỗi trả về là 1 object
      if (serverErrors && typeof serverErrors === "object") {
        Object.entries(serverErrors).forEach(([field, message]) => {
          console.log("object");
          setError(field, {
            type: "server",
            message: message[0],
          });
        });
      } else {
        // nếu không phải object
        console.log("server");
        setError("root", {
          type: "server",
          message: serverErrors || "Register was failed",
        });
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md border shadow-sm rounded-2xl p-6">
        <h1 className="font-bold text-2xl text-center mb-6">
          Log in to Threads
        </h1>
        <form
          action=""
          className="w-sm grid grid-cols-1 gap-2"
          onSubmit={handleSubmit(loginHandler)}
        >
          {/* email */}
          <div className="">
            <Input
              type="email"
              id="email"
              className={
                errors.email
                  ? "border-red-500"
                  : "p-4 bg-background-tertiary h-12 placeholder:text-neutral-400"
              }
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* password */}
          <div>
            <Label htmlFor="password" className="mb-1"></Label>
            <Input
              type="password"
              id="password"
              className={errors.password ? "border-red-500" : "block p-4"}
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
            {errors.root && (
              <p className="text-red-500 mt-1">{errors.root.message}</p>
            )}
          </div>

          {/* submit btn */}
          <Button className="mt-10" disabled={response.isLoading} type="submit">
            {response.isLoading ? "Logging in" : "Log in"}
          </Button>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
