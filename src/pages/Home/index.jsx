import { useGetFeedsQuery } from "@/services/posts/postsApi";
import { PAGINATION } from "@/configs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";

function Home() {
  //Gọi API lấy feed
  const { data, isLoading, isError, refetch } = useGetFeedsQuery({
    type: "for_you",
    page: 1,
    per_page: PAGINATION.DEFAULT_LIMIT,
  });

  if (isLoading)
    return <div className="p-4 text-center">Đang tải bảng tin...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">Không thể tải dữ liệu.</div>
    );

  const posts = data?.data || [];
  console.log(data);
  return (
    <div className="">
      <h1>Home</h1>
      <Tabs defaultValue="for_you">
        {/* Tab header */}
        <TabsList className="sticky top-0 right-0">
          <TabsTrigger value="for_you">For you</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="ghost_posts">Ghost Posts</TabsTrigger>
        </TabsList>

        {/* Tab content */}
        <TabsContent value="for_you">For you</TabsContent>
        <TabsContent value="following">Following</TabsContent>
        <TabsContent value="ghost_posts">Ghost Posts</TabsContent>
      </Tabs>
    </div>
  );
}

export default Home;
