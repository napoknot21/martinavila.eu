import { ServicesPage, servicesPageMetadata } from '@/components/pages/ServicesPage';

export const metadata = servicesPageMetadata('en');

export default function Page() {
  return <ServicesPage locale="en" />;
}
