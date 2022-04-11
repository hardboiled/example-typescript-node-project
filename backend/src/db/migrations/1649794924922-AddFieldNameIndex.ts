import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFieldNameIndex1649794924922 implements MigrationInterface {
  name = 'AddFieldNameIndex1649794924922'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX \`IDX_0a35dacfa049a764c7c03c8aaa\` ON \`fema_definition\` (\`fieldName\`)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_0a35dacfa049a764c7c03c8aaa\` ON \`fema_definition\``)
  }
}
