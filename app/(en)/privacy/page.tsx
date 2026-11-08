import { PrivacyPage, privacyPageMetadata } from '@/components/pages/PrivacyPage';

export const metadata = privacyPageMetadata('en');

export default function Page() {
  return <PrivacyPage locale="en" />;
}
