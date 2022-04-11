import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFemaDefinition1649787644834 implements MigrationInterface {
  name = 'AddFemaDefinition1649787644834'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`fema_definition\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fieldName\` varchar(255) NOT NULL, \`fieldAlias\` varchar(255) NOT NULL, \`fieldType\` varchar(255) NOT NULL, \`sort\` int NOT NULL, \`length\` int NOT NULL, \`relevantLayer\` varchar(255) NOT NULL, \`metricType\` varchar(255) NOT NULL, \`version\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`fema_definition\``)
  }
}
