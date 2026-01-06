import { useGetFeedsQuery } from "@/services/posts/postsApi";
import { PAGINATION } from "@/configs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { useGetFeedColumnsQuery } from "@/services/auth/authApi";
import { Spinner } from "@/components/ui/spinner";
import { useSelector } from "react-redux";
import { FeedNav, NavigationWrapper } from "@/components/Navigation";

function Home() {
  //Gọi API lấy feed
  const {
    data: feedData,
    isLoading,
    isError,
    refetch,
  } = useGetFeedsQuery({
    type: "for_you",
    page: 1,
    per_page: PAGINATION.DEFAULT_LIMIT,
  });

  // kiểm tra đăng nhập

  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log(isAuth);

  if (isAuth) {
    console.log("AuthState: ", isAuth, "Header đăng nhập");
    const { data: columnData, isSuccess } = useGetFeedColumnsQuery();
    console.log(columnData);
  } else {
    console.log("AuthState: ", isAuth, "Header đăng xuất");
  }

  if (isLoading)
    return (
      <div className="p-4 text-center">
        <Spinner />
      </div>
    );
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">Không thể tải dữ liệu.</div>
    );

  const posts = feedData?.data || [];
  console.log(posts);

  const renderPosts = () => {
    return <div>{}</div>;
  };
  return (
    <div className="">
      <FeedNav />

      <h1>Home</h1>
    </div>
  );
}

export default Home;
