// const PlayListPage = () => {
// const [finalList, setFinalList] = useState<any | null>(null);
// useEffect(() => {
//   const playListData = async () => {
//     const playList = await fetch(
//       `https://api.freeapi.app/api/v1/public/youtube/playlists?page=1&limit=6`
//     );
//     const list = await playList.json();
//     console.log("playList................", list.data.data);
//     setFinalList(list.data.data);
//   };
//   playListData();
// }, []);

export default async function PlayListPage() {
  async function finalListAction() {
    "use server";
    const playList = await fetch(
      `https://api.freeapi.app/api/v1/public/youtube/playlists?page=1&limit=6`
    );
    const list = await playList.json();
    console.log("playList................", list.data.data);
    return list.data.data;
  }

  const finalList = await finalListAction();
  return (
    <div className="container mx-auto mt-16">
      <div className="grid grid-cols-12 grid-flow-row gap-4">
        {finalList.map((list: any) => (
          <div className="col-span-4">
            <div className="bg-[#463b6d] rounded-xl shadow-md overflow-hidden">
              <div className="md:flex md:flex-col">
                <div className="md:flex-shrink-0">
                  <img
                    src={list.snippet.thumbnails.default.url}
                    id="profile-image"
                    className="h-48 w-full object-cover md:h-full md:w-48"
                    alt="Profile Image"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-lg text-white font-semibold">
                    {list.snippet.title}
                  </div>
                  <h2
                    className="block mt-1 text-base leading-tight font-medium text-white/80 hover:underline"
                    id="channel-title"
                  >
                    {list.snippet.channelTitle}
                  </h2>
                  <p className="mt-2 text-white/50" id="channel-description">
                    {list.snippet.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default PlayListPage;
