import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Roboto } from 'next/font/google';
import SearchForm from '@/component/SearchForm';
import Header from '@/component/Header';

const roboto = Roboto({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      locale,
    },
  };
}

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div className={roboto.className}>
      <Header />
      <main className="flex flex-col gap-8 p-6 lg:px-8 row-start-2 sm:items-start">
        <h1 className="text-3xl font-bold leading-tight self-center">
          {t('home-page-title')}
        </h1>
        <SearchForm />
      </main>
    </div>
  );
}
