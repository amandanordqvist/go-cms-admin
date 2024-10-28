import { TagDetailsClient } from "./tag-details-client";

// Mock data for group IDs
const MOCK_GROUP_IDS = ['1', '2', '3'];

export function generateStaticParams() {
  return MOCK_GROUP_IDS.map(groupId => ({
    groupId,
  }));
}

export default function TagDetailsPage({ params }: { params: { groupId: string } }) {
  return <TagDetailsClient siteId="global" groupId={params.groupId} />;
}