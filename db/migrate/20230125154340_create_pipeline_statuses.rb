class CreatePipelineStatuses < ActiveRecord::Migration[7.0]
  def change
    create_table :pipeline_statuses do |t|
      t.boolean :passed, null: false, default: false
      t.datetime :reported_time, null: false
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
