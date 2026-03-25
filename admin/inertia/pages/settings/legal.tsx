import { Head } from '@inertiajs/react'
import SettingsLayout from '~/layouts/SettingsLayout'
import { useTranslation } from 'react-i18next'

export default function LegalPage() {
  const { t } = useTranslation()
  return (
    <SettingsLayout>
      <Head title={t('settings.legal.pageTitle')} />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6 max-w-4xl">
          <h1 className="text-4xl font-semibold mb-8">{t('settings.legal.title')}</h1>

          {/* License Agreement */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.licenseAgreement')}</h2>
            <p className="text-text-primary mb-3">{t('settings.legal.copyright')}</p>
            <p className="text-text-primary mb-3">
              {t('settings.legal.licenseText')}{' '}
              You may obtain a copy of the License at
            </p>
            <p className="text-text-primary mb-3">
              <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.apache.org/licenses/LICENSE-2.0</a>
            </p>
            <p className="text-text-primary">
              Unless required by applicable law or agreed to in writing, software
              distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
              WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
              See the License for the specific language governing permissions and
              limitations under the License.
            </p>
          </section>

          {/* Third-Party Software */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.thirdParty')}</h2>
            <p className="text-text-primary mb-4">
              {t('settings.legal.thirdPartyDesc')}
            </p>
            <ul className="space-y-3 text-text-primary">
              <li>
                <strong>Kiwix</strong> - Offline Wikipedia and content reader (GPL-3.0 License)
                <br />
                <a href="https://kiwix.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://kiwix.org</a>
              </li>
              <li>
                <strong>Kolibri</strong> - Offline learning platform by Learning Equality (MIT License)
                <br />
                <a href="https://learningequality.org/kolibri" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://learningequality.org/kolibri</a>
              </li>
              <li>
                <strong>Ollama</strong> - Local large language model runtime (MIT License)
                <br />
                <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ollama.com</a>
              </li>
              <li>
                <strong>CyberChef</strong> - Data analysis and encoding toolkit by GCHQ (Apache 2.0 License)
                <br />
                <a href="https://github.com/gchq/CyberChef" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/gchq/CyberChef</a>
              </li>
              <li>
                <strong>FlatNotes</strong> - Self-hosted note-taking application (MIT License)
                <br />
                <a href="https://github.com/dullage/flatnotes" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/dullage/flatnotes</a>
              </li>
              <li>
                <strong>Qdrant</strong> - Vector search engine for AI knowledge base (Apache 2.0 License)
                <br />
                <a href="https://github.com/qdrant/qdrant" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/qdrant/qdrant</a>
              </li>
            </ul>
          </section>

          {/* Privacy Statement */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.privacy')}</h2>
            <p className="text-text-primary mb-3">
              {t('settings.legal.privacyDesc')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-primary">
              <li>{t('settings.legal.zeroTelemetry')}</li>
              <li>{t('settings.legal.localFirst')}</li>
              <li>{t('settings.legal.noAccounts')}</li>
              <li>{t('settings.legal.networkOptional')}</li>
            </ul>
          </section>

          {/* Content Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.contentDisclaimer')}</h2>
            <p className="text-text-primary mb-3">
              КАМРАД provides tools to download and access content from third-party sources
              including Wikipedia, Wikibooks, medical references, educational platforms, and other
              publicly available resources. Based on Project N.O.M.A.D. by Crosstalk Solutions LLC.
            </p>
            <p className="text-text-primary mb-3">
              Crosstalk Solutions, LLC does not create, control, verify, or guarantee the accuracy,
              completeness, or reliability of any third-party content. The inclusion of any content
              does not constitute an endorsement.
            </p>
            <p className="text-text-primary">
              Users are responsible for evaluating the appropriateness and accuracy of any content
              they download and use.
            </p>
          </section>

          {/* Medical Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.medicalDisclaimer')}</h2>
            <p className="text-text-primary mb-3">
              Some content available through КАМРАД includes medical references, first aid guides,
              and emergency preparedness information. This content is provided for general
              informational purposes only.
            </p>
            <p className="text-text-primary mb-3 font-semibold">
              {t('settings.legal.medicalNotSubstitute')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-primary mb-3">
              <li>Always seek the advice of qualified health providers with questions about medical conditions.</li>
              <li>Never disregard professional medical advice or delay seeking it because of something you read in offline content.</li>
              <li>In a medical emergency, call emergency services immediately if available.</li>
              <li>Medical information may become outdated. Verify critical information with current professional sources when possible.</li>
            </ul>
          </section>

          {/* Data Storage Notice */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.dataStorage')}</h2>
            <p className="text-text-primary mb-3">
              All data associated with КАМРАД is stored locally on your device:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-primary">
              <li><strong>Installation Directory:</strong> /opt/kamrad</li>
              <li><strong>Downloaded Content:</strong> /opt/kamrad/storage</li>
              <li><strong>Application Data:</strong> Stored in Docker volumes on your local system</li>
            </ul>
            <p className="text-text-primary mt-3">
              You maintain full control over your data. Uninstalling КАМРАД or deleting these
              directories will permanently remove all associated data.
            </p>
          </section>

        </main>
      </div>
    </SettingsLayout>
  )
}
