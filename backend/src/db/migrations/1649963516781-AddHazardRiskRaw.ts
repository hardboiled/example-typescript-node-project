import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddHazardRiskRaw1649963516781 implements MigrationInterface {
  name = 'AddHazardRiskRaw1649963516781'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`harzard_risk_raw\` (\`id\` int NOT NULL AUTO_INCREMENT, \`oid\` int NOT NULL, \`nriID\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`stateAbbr\` varchar(255) NOT NULL, \`stateFips\` int NOT NULL, \`county\` varchar(255) NOT NULL, \`countyFips\` int NOT NULL, \`rfldRisks\` double NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`harzard_risk_raw\``)
  }
}
