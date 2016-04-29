<?php

use Illuminate\Database\Seeder;

class TestBoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('lists')->insert([
            'title'                 => 'Testing Backlog',
            'board_default'        => 0,
            'task_default'          => 0,
            'testing_board_default' => 1,
            'bug_default'           => 1
        ]);

        DB::table('lists')->insert([
            'title'                 => 'In Progress',
            'board_default'        => 0,
            'task_default'          => 0,
            'testing_board_default' => 1,
            'bug_default'           => 0            
        ]);

        DB::table('lists')->insert([
            'title'                 => 'Done',
            'board_default'        => 0,
            'task_default'          => 0,
            'testing_board_default' => 1,
            'bug_default'           => 0
        ]);

        DB::table('lists')->insert([
            'title'                 => 'Redo',
            'board_default'        => 0,
            'task_default'          => 0,
            'testing_board_default' => 1,
            'bug_default'           => 0
        ]);        
    }
}
