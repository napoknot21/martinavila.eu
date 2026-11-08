import { AboutPage, aboutPageMetadata } from '@/components/pages/AboutPage';

export const metadata = aboutPageMetadata('en');

export default function Page() {
  return <AboutPage locale="en" />;
}
