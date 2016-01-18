<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name'     => 'Janak',
            'email'    => 'janakrajbhatta@gmail.com',
            'password' => bcrypt('j@n@k'),
        ]);
        DB::table('users')->insert([
            'name'     => 'admin',
            'email'    => 'admin@admin.com',
            'password' => bcrypt('@dm!n@123'),
        ]);
    }
}
