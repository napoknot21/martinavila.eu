import { LegalNoticePage, legalNoticePageMetadata } from '@/components/pages/LegalNoticePage';

export const metadata = legalNoticePageMetadata('en');

export default function Page() {
  return <LegalNoticePage locale="en" />;
}
