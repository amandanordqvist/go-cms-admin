import { FriendLinksPageClient } from "./friend-links-page-client";

// Mock data for static site IDs
const MOCK_SITE_IDS = ['site1', 'site2', 'site3'];

export function generateStaticParams() {
  return MOCK_SITE_IDS.map((id) => ({
    siteId: id,
  }));
}

export default function FriendLinksPage({ params }: { params: { siteId: string } }) {
  return <FriendLinksPageClient siteId={params.siteId} />;
}