import { HomePage, homePageMetadata } from '@/components/pages/HomePage';
import { isLocale, type Locale } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

const toLocale = async (params: Props['params']): Promise<Locale> => {
  const { locale } = await params;
  return isLocale(locale) ? locale : 'en';
};

export async function generateMetadata({ params }: Props) {
  return homePageMetadata(await toLocale(params));
}

export default async function Page({ params }: Props) {
  return <HomePage locale={await toLocale(params)} />;
}
