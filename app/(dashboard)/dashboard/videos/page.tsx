import { VideoList } from "@/components/videos/video-list";

export default function VideosPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Videos</h1>
      <VideoList />
    </div>
  );
}