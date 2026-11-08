import { AboutPage, aboutPageMetadata } from '@/components/pages/AboutPage';
import { isLocale, type Locale } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

const toLocale = async (params: Props['params']): Promise<Locale> => {
  const { locale } = await params;
  return isLocale(locale) ? locale : 'en';
};

export async function generateMetadata({ params }: Props) {
  return aboutPageMetadata(await toLocale(params));
}

export default async function Page({ params }: Props) {
  return <AboutPage locale={await toLocale(params)} />;
}
