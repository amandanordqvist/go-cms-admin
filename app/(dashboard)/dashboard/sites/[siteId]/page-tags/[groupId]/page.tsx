import { TagDetailsClient } from "./tag-details-client";

// Mock data for static site IDs and group IDs
const MOCK_SITE_IDS = ['site1', 'site2', 'site3'];
const MOCK_GROUP_IDS = ['1', '2', '3'];

export function generateStaticParams() {
  return MOCK_SITE_IDS.flatMap(siteId => 
    MOCK_GROUP_IDS.map(groupId => ({
      siteId,
      groupId,
    }))
  );
}

export default function TagDetailsPage({ params }: { params: { siteId: string; groupId: string } }) {
  return <TagDetailsClient siteId={params.siteId} groupId={params.groupId} />;
}