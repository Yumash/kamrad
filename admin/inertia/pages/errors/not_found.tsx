import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <>
      <div className="container">
        <div className="title">{t('errors.pageNotFound')}</div>

        <span>{t('errors.pageNotFoundDesc')}</span>
      </div>
    </>
  )
}