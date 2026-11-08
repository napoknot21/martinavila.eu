import { HomePage, homePageMetadata } from '@/components/pages/HomePage';

export const metadata = homePageMetadata('en');

export default function Page() {
  return <HomePage locale="en" />;
}
