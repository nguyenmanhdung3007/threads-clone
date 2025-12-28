import { useGetFeedsQuery } from "@/services/posts/postsApi";
import { PAGINATION } from "@/configs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { useGetFeedColumnsQuery } from "@/services/auth/authApi";
import { Spinner } from "@/components/ui/spinner";

function Home() {
  //Gọi API lấy feed
  const { data, isLoading, isError, refetch } = useGetFeedsQuery({
    type: "for_you",
    page: 1,
    per_page: PAGINATION.DEFAULT_LIMIT,
  });

  const {data, isSuccess} = useGetFeedColumnsQuery();
  console.log(response);

  if (isLoading)
    return <div className="p-4 text-center"><Spinner/></div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">Không thể tải dữ liệu.</div>
    );

  const posts = data?.data || [];

  
  }


  const renderPosts = ()=> {
    return (<div>{posts.map((post)=> (<Posts))}</div>)
  console.log(data);
  return (
    <div className="">
      <h1>Home</h1>

    </div>
  );
}

export default Home;
