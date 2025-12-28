import { useGetUserInfoQuery, useLoginMutation } from "@/services/auth/authApi";
import { useDispatch } from "react-redux";

import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/schemas/loginSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setAuth } from "@/features/auth/authSlice";

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
      return <Navigate to={continueUrl} replace />;
    }
  }, [isSuccess, navigate]);

  // Xử lý đăng nhập thành công
  useEffect(() => {
    console.log(response);
    if (response.isSuccess) {
      const { access_token, refresh_token } = response.data.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      navigate("/");
    }
  }, [response, navigate]);

  const loginHandler = async (credential) => {
    try {
      await loginFunc(credential).unwrap();

      // cập nhật Reducer auth
      dispatch(setAuth(true));
    } catch (error) {
      console.log(error?.data);
      const serverErrors = error?.data?.message;
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
          className="w-[370px] grid grid-cols-1 gap-2"
          onSubmit={handleSubmit(loginHandler)}
        >
          {/* email */}
          <div className="">
            <Input
              type="login"
              id="login"
              className={cn(
                "p-4 bg-background-tertiary h-13.5 border-transparent focus-visible:ring-0 rounded-xl",
                errors.login && "border-red-500"
              )}
              placeholder="Email"
              {...register("login")}
            />
            {errors.login && (
              <p className="text-red-500 mt-1">{errors.login.message}</p>
            )}
          </div>

          {/* password */}
          <div>
            <Label htmlFor="password" className="mb-1"></Label>
            <Input
              type="password"
              id="password"
              className={cn(
                "p-4 bg-background-tertiary font-normal h-13.5 border-transparent focus-visible:ring-0 rounded-xl",
                errors.password && "border-red-500"
              )}
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
          <Button
            className="mt-5 h-13.5 rounded-xl"
            disabled={response.isLoading}
            type="submit"
          >
            {response.isLoading ? "Logging in" : "Log in"}
          </Button>

          <span className="text-center text-text-secondary">
            <Link>Forgot password?</Link>
          </span>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium underline">
              Sign up
            </Link>
          </p>
        </form>

        {continueUrl !== "/" && (
          <p className="mt-4 text-xs text-gray-500 italic">
            * Bạn sẽ được chuyển hướng về: {continueUrl} sau khi đăng nhập.
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
