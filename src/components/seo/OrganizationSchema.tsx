export function OrganizationSchema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Центр Притяжения',
    alternateName: 'ЦентрПритяжения',
    url: 'https://centr-prityazheniya.ru',
    logo: 'https://centr-prityazheniya.ru/favicon.ico',
    description: 'Профессиональный судоподъём затонувших судов, водолазные обследования акваторий и подготовка проектной документации по Приказу Минтранса РФ №176 в Приморском крае.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Владивосток',
      addressRegion: 'Приморский край',
      addressCountry: 'RU',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Владивосток',
      },
      {
        '@type': 'City',
        name: 'Находка',
      },
      {
        '@type': 'City',
        name: 'Большой Камень',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Приморский край',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-999-123-45-67',
      contactType: 'customer service',
      availableLanguage: 'Russian',
    },
    sameAs: [
      'https://t.me/morproekt',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
