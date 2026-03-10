import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {references} from 'sanity-plugin-references'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'petco-clone',

  projectId: 'i9lae4hh',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool(), colorInput(), references()],

  schema: {
    types: schemaTypes,
  },
})
