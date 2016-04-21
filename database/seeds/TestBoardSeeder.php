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

        DB::table('boards')->insert([
            'title'                 => 'Testing Backlog',
            'sprint_default'        => 0,
            'task_default'          => 0,
            'testing_board_default' => 1,
            'bug_default'           => 1
        ]);

        DB::table('boards')->insert([
            'title'                 => 'In Progress',
            'sprint_default'        => 0,
            'task_default'          => 0,
            'testing_board_default' => 1,
            'bug_default'           => 0            
        ]);

        DB::table('boards')->insert([
            'title'                 => 'Done',
            'sprint_default'        => 0,
            'task_default'          => 0,
            'testing_board_default' => 1,
            'bug_default'           => 0
        ]);

        DB::table('boards')->insert([
            'title'                 => 'Redo',
            'sprint_default'        => 0,
            'task_default'          => 0,
            'testing_board_default' => 1,
            'bug_default'           => 0
        ]);        
    }
}
