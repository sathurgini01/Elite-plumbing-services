import type { Metadata } from 'next';
import { BUSINESS_INFO, SERVICE_CATEGORIES, TESTIMONIALS } from './data';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.eliteplumbingservices.co.uk';

export const SITE_NAME = 'Elite Plumbing Services';
export const DEFAULT_OG_IMAGE = '/images/homepage-hero-van.jpg';

export const SERVICE_AREAS = [
  'London',
  'West London',
  'South West London',
  'Central London',
  'North London',
  'East London',
  'South East London',
  'Kensington',
  'Fulham',
  'Westminster',
  'Clapham',
  'Wandsworth',
  'Greenwich',
];

export const HOME_FAQS = [
  {
    question: 'Do plumbers deal with heating?',
    answer:
      'Yes. Our Gas Safe registered engineers work on heating systems, radiators, hot water faults, boilers, bathroom pipework, kitchens, and general plumbing repairs.',
  },
  {
    question: 'Do you charge a call out fee?',
    answer:
      'No. We provide clear pricing before work begins, and our standard policy is no separate call-out fee for booked visits inside our active London service area.',
  },
  {
    question: 'How quickly can your plumbing company send out an engineer?',
    answer:
      'For emergency plumbing issues such as burst pipes, flooding, or no hot water, our target response is usually 30-60 minutes depending on postcode and engineer availability.',
  },
  {
    question: 'What should I do if I get a water leak?',
    answer:
      'Turn off your stopcock if it is safe, switch off nearby electrics, move valuables away from the leak, and call our emergency line so an engineer can isolate and repair the fault.',
  },
  {
    question: 'Can I book non-emergency plumbing work?',
    answer:
      'Yes. You can book scheduled repairs, installations, inspections, radiator work, drainage jobs, bathroom plumbing, kitchen plumbing, and landlord maintenance through the booking form.',
  },
];

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function cleanServiceName(name: string) {
  return name.replace(/[^\w\s&/-]/g, '').replace(/\s+/g, ' ').trim();
}

export function getServiceCategoryBySlug(slug: string) {
  return SERVICE_CATEGORIES.find((category) => category.slug === slug);
}

export function getServiceCategoryHref(category: { slug: string }) {
  return `/services/${category.slug}`;
}

export function createPageMetadata({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: 'en_GB',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} London plumbing services`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 24/7 London Plumbers`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    '24/7 emergency plumbing, heating, drainage, leak repair, and Gas Safe services across London.',
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Plumbing Services',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const publicPages = [
  {
    path: '/',
    title: '24/7 Emergency Plumbers in London',
    description:
      'Call Elite Plumbing Services for 24/7 emergency plumbers in London, fast leak repairs, boiler and heating support, drainage services, and clear upfront pricing.',
  },
  {
    path: '/services',
    title: 'Plumbing Services in London',
    description:
      'Explore emergency plumbing, boiler repairs, heating, drainage, leak detection, bathroom, kitchen, gas, landlord, and commercial plumbing services in London.',
  },
  {
    path: '/areas',
    title: 'Areas Covered by Our London Plumbers',
    description:
      'Elite Plumbing Services covers West, South West, Central, North, East, and South East London for emergency and scheduled plumbing visits.',
  },
  {
    path: '/about',
    title: 'About Our Gas Safe London Plumbers',
    description:
      'Learn about Elite Plumbing Services, Gas Safe registration, insured workmanship, London service standards, and our 12-month plumbing guarantee.',
  },
  {
    path: '/contact',
    title: 'Contact Elite Plumbing Services',
    description:
      'Contact Elite Plumbing Services for 24/7 emergency plumbing dispatch, general enquiries, billing support, and London property maintenance requests.',
  },
  {
    path: '/terms',
    title: 'Terms and Conditions',
    description:
      'Read the booking, pricing, cancellation, parts, workmanship, and customer responsibility terms for Elite Plumbing Services.',
  },
];

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Plumber'],
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS_INFO.name,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    telephone: BUSINESS_INFO.phoneHref.replace('tel:', ''),
    email: BUSINESS_INFO.email,
    vatID: BUSINESS_INFO.vatReg,
    taxID: BUSINESS_INFO.vatReg,
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_INFO.addressLocality,
      addressRegion: BUSINESS_INFO.addressRegion,
      addressCountry: BUSINESS_INFO.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.latitude,
      longitude: BUSINESS_INFO.longitude,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.phoneHref.replace('tel:', ''),
        contactType: 'customer service',
        areaServed: BUSINESS_INFO.addressCountry,
        availableLanguage: ['English'],
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Gas Safe Registered',
        identifier: BUSINESS_INFO.gasSafeReg,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      bestRating: 5,
      reviewCount: TESTIMONIALS.length,
    },
    openingHours: 'Mo-Su 00:00-23:59',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    makesOffer: SERVICE_CATEGORIES.map((category) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: cleanServiceName(category.name),
        description: category.shortDescription,
        areaServed: 'London',
        provider: {
          '@id': `${SITE_URL}/#business`,
        },
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}/#business`,
    },
  };
}

export function serviceCategoryJsonLd(slug: string) {
  const category = getServiceCategoryBySlug(slug);

  if (!category) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(getServiceCategoryHref(category))}#service`,
    name: cleanServiceName(category.name),
    description: category.shortDescription,
    provider: {
      '@id': `${SITE_URL}/#business`,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: cleanServiceName(category.name),
      itemListElement: category.services.map((service) => ({
        '@type': 'Offer',
        name: service.name,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'GBP',
          description: service.estimatedPrice,
        },
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
      })),
    },
  };
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function reviewsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': TESTIMONIALS.map((testimonial) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating,
        bestRating: 5,
      },
      author: {
        '@type': 'Person',
        name: testimonial.name,
      },
      reviewBody: testimonial.text,
      itemReviewed: {
        '@id': `${SITE_URL}/#business`,
      },
    })),
  };
}
