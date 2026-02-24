import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'i9lae4hh',
    dataset: 'production'
  },
  /**
   * @see https://www.sanity.io/docs/help/configuring-typegen-in-sanity-cli-config
   */
  typegen: {
    path: './**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: './sanity.types.ts',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'lvqfhfzw52kw5rvpl465koaw'
  }
})
