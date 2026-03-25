import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'translation_cache'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('source_hash', 64).notNullable().index()
      table.string('source_lang', 5).notNullable()
      table.string('target_lang', 5).notNullable()
      table.text('translated_text').notNullable()
      table.string('provider', 50).notNullable()
      table.timestamp('created_at')

      table.unique(['source_hash', 'source_lang', 'target_lang'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
