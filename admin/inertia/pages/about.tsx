import AppLayout from '~/layouts/AppLayout'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  return (
    <AppLayout>
      <div className="p-2">{t('about.hello')}</div>
    </AppLayout>
  )
}
