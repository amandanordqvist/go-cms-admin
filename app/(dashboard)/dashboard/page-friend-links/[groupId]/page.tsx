import { LinkDetailsClient } from "./link-details-client";

// Mock data for group IDs
const MOCK_GROUP_IDS = ['1', '2', '3'];

export function generateStaticParams() {
  return MOCK_GROUP_IDS.map(groupId => ({
    groupId,
  }));
}

export default function LinkDetailsPage({ params }: { params: { groupId: string } }) {
  return <LinkDetailsClient siteId="global" groupId={params.groupId} />;
}