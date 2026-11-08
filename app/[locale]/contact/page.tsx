import { ContactPage, contactPageMetadata } from '@/components/pages/ContactPage';
import { isLocale, type Locale } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

const toLocale = async (params: Props['params']): Promise<Locale> => {
  const { locale } = await params;
  return isLocale(locale) ? locale : 'en';
};

export async function generateMetadata({ params }: Props) {
  return contactPageMetadata(await toLocale(params));
}

export default async function Page({ params }: Props) {
  return <ContactPage locale={await toLocale(params)} />;
}
