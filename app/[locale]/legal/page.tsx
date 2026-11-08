import { LegalNoticePage, legalNoticePageMetadata } from '@/components/pages/LegalNoticePage';
import { isLocale, type Locale } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

const toLocale = async (params: Props['params']): Promise<Locale> => {
  const { locale } = await params;
  return isLocale(locale) ? locale : 'en';
};

export async function generateMetadata({ params }: Props) {
  return legalNoticePageMetadata(await toLocale(params));
}

export default async function Page({ params }: Props) {
  return <LegalNoticePage locale={await toLocale(params)} />;
}
