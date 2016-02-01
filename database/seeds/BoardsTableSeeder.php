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
        DB::table('boards')->insert([
            'title'          => 'To Do',
            'sprint_default' => 1,
            'task_default'   => 1,
        ]);

        DB::table('boards')->insert([
            'title'          => 'In Progress',
            'sprint_default' => 1,
            'task_default'   => 0,
        ]);

        DB::table('boards')->insert([
            'title'          => 'Done',
            'sprint_default' => 1,
            'task_default'   => 0,
        ]);
    }
}
