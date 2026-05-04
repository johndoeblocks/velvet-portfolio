'use client';

import { useTranslations } from 'next-intl';
import { ServicePage } from '@/components/service-page';

export function AutomacaoProcessosClient() {
  const t = useTranslations('automacaoProcessos');
  const sp = useTranslations('servicePage');

  const cardKeys = [1, 2, 3, 4, 5];
  const cards = cardKeys.map((i) => ({
    title: t(`card_${i}_title`),
    features: [
      t(`card_${i}_f1`),
      t(`card_${i}_f2`),
      t(`card_${i}_f3`),
      t(`card_${i}_f4`),
    ],
  }));

  const processSteps = [1, 2, 3, 4, 5, 6].map((i) => ({
    title: t(`step_${i}_title`),
    description: t(`step_${i}_desc`),
  }));

  return (
    <ServicePage
      backLabel={sp('back')}
      breadcrumbHome={sp('home')}
      breadcrumbCurrent={t('breadcrumb')}
      heroTitle={t('hero_title')}
      heroDescription={t('hero_description')}
      stats={[
        { value: t('stat_1_value'), label: t('stat_1_label') },
        { value: t('stat_2_value'), label: t('stat_2_label') },
        { value: t('stat_3_value'), label: t('stat_3_label') },
      ]}
      sectionTitle={t('section_title')}
      sectionDescription={t('section_description')}
      cards={cards}
      roiTitle={t('roi_title')}
      roiItems={[
        { text: t('roi_1') },
        { text: t('roi_2') },
        { text: t('roi_3') },
        { text: t('roi_4') },
        { text: t('roi_5') },
      ]}
      processTitle={t('process_title')}
      processDescription={t('process_description')}
      processSteps={processSteps}
      faqTitle={sp('faq_title')}
      faqItems={[
        { question: t('faq_1_q'), answer: t('faq_1_a') },
        { question: t('faq_2_q'), answer: t('faq_2_a') },
        { question: t('faq_3_q'), answer: t('faq_3_a') },
        { question: t('faq_4_q'), answer: t('faq_4_a') },
      ]}
      ctaTitle={sp('cta_title')}
      ctaDescription={sp('cta_description')}
      ctaButtonLabel={sp('cta_button')}
    />
  );
}
