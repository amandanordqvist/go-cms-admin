import { AdvertisementPageClient } from "./advertisement-page-client";

// Mock data for static site IDs
const MOCK_SITE_IDS = ['site1', 'site2', 'site3'];

export function generateStaticParams() {
  return MOCK_SITE_IDS.map((id) => ({
    siteId: id,
  }));
}

export default function AdvertisementsPage({ params }: { params: { siteId: string } }) {
  return <AdvertisementPageClient siteId={params.siteId} />;
}