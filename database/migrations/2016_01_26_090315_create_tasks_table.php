<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('title');
            $table->string('description');
            $table->integer('order');
            
            $table->string('priority')->default('High'); // Highest , High, Low , lowest

            $table->string('task_type')->default('Task'); // Bug, Story, Epic , Task

            $table->integer('story_point');

            $table->integer('board_id')->unsigned()->nullable();
            $table->foreign('board_id')->references('id')->on('boards')->onDelete('cascade');

            $table->integer('list_id')->unsigned()->nullable();
            $table->foreign('list_id')->references('id')->on('lists')->onDelete('cascade');

            $table->integer('author_id')->unsigned()->nullable();
            $table->foreign('author_id')->references('id')->on('users');

            $table->integer('reporter_id')->unsigned()->nullable();
            $table->foreign('reporter_id')->references('id')->on('users');

            $table->integer('assigne_id')->unsigned()->nullable();
            $table->foreign('assigne_id')->references('id')->on('users');
            
            $table->integer('project_id')->unsigned()->nullable();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tasks');
    }
}
