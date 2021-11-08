import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateOrder1636396173660 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'cod_fornecedor',
            type: 'varchar'
          },
          {
            name: 'cod_prod',
            type: 'varchar'
          },
          {
            name: 'cliente',
            type: 'varchar'
          },
          {
            name: 'documento',
            type: 'varchar'
          },
          {
            name: 'nome_prod',
            type: 'varchar'
          },
          {
            name: 'nome_categoria',
            type: 'varchar'
          },
          {
            name: 'nome_fornecedor',
            type: 'varchar'
          },
          {
            name: 'valor_original',
            type: 'numeric'
          },
          {
            name: 'data_compra',
            type: 'timestamp'
          },
          {
            name: 'valor_desconto',
            type: 'numeric'
          },
          {
            name: 'valor_final',
            type: 'numeric'
          },
          {
            name: 'data_pgto',
            type: 'timestamp'
          },
          {
            name: 'data_devolucao',
            type: 'timestamp'
          },
          {
            name: 'status_situacao',
            type: 'varchar'
          },
          {
            name: 'status_pgto',
            type: 'varchar'
          },
          {
            name: 'taxa_aplicada',
            type: 'numeric'
          },
          {
            name: 'taxa_original',
            type: 'numeric'
          },
          {
            name: 'id_file',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'OrderFile',
            referencedTableName: 'files',
            referencedColumnNames: ['id'],
            columnNames: ['id_file'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders')
  }
}
