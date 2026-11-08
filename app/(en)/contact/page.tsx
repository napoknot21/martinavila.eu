import { ContactPage, contactPageMetadata } from '@/components/pages/ContactPage';

export const metadata = contactPageMetadata('en');

export default function Page() {
  return <ContactPage locale="en" />;
}
