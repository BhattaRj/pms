<?php

use Illuminate\Database\Seeder;

class BoardsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('lists')->insert([
            'title'          => 'Active Backlog',
            'board_default' => 1,
            'task_default'   => 1,
        ]);

        DB::table('lists')->insert([
            'title'          => 'In Progress',
            'board_default' => 1,
            'task_default'   => 0,
        ]);

        DB::table('lists')->insert([
            'title'          => 'Done',
            'board_default' => 1,
            'task_default'   => 0,
        ]);
    }
}
