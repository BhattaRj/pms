<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectTaskTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_task_type', function (Blueprint $table) {

            $table->increments('id');
            $table->timestamps();

            $table->integer('task_type_id')->unsigned();
            $table->foreign('task_type_id')->references('id')->on('task_types')->onDelete('cascade');
            $table->integer('project_id')->unsigned();
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
        Schema::drop('project_task_type');
    }
}
