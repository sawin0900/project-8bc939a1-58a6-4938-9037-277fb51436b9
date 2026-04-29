interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string;
}

export function ServiceSchema({
  name,
  description,
  url,
  provider = 'Центр Притяжения',
  areaServed = 'Приморский край',
}: ServiceSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `https://centr-prityazheniya.ru${url}`,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://centr-prityazheniya.ru',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: areaServed,
    },
    serviceType: name,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
