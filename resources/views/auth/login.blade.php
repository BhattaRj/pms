@extends('layouts.auth')
@section('title','Login')
@section('heading','Login')
@section('content')

{!! Form::open() !!}

<div class="form-group">
    {!! Form::label('email') !!}
    {!! Form::text('email',null, ['class'=>'form-control']) !!}
</div>

<div class="form-group">
    {!! Form::label('password') !!}
    {!! Form::password('password',['class'=>'form-control']) !!}
</div>

{!! Form::submit('login',['class'=>'btn btn-primary']) !!}

<a href="{{route('auth.password.email')}}" class="small">Forgot Password</a>

{!! Form::close() !!}


@endsection
