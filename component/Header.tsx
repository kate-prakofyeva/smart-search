import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [locale, setLocale] = useState<string>(router.locale || 'en');

  useEffect(() => {
    setLocale(router.locale || 'en');
  }, [router.locale]);

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(router.asPath, router.asPath, { locale: newLocale });
  };

  return (
    <header className="bg-white">
      <nav
        aria-label="navigation"
        className="mx-auto flex justify-between max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex w-1/4">
          <Link href="/" className="p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              width={32}
              height={32}
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="w-8 h-8"
            />
          </Link>
        </div>
        <div className=" w-1/4">
          <label htmlFor="countries" className="sr-only">
            Language
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
            onChange={handleLocaleChange}
            value={locale}
          >
            <option value="en">{t('english-language')}</option>
            <option value="de">{t('german-language')}</option>
            <option value="uk">{t('ukrainian-language')}</option>
            <option value="ru">{t('russian-language')}</option>
            <option value="pl">{t('polish-language')}</option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Header;
