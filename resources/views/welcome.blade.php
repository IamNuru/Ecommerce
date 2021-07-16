<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Shop</title>
        <script src="{{ asset('js/app.js') }}" defer></script>
        <script src="https://use.fontawesome.com/0ab3484c04.js"></script>
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <script>
            var csrf_token = '{{ csrf_token()}}';
        </script>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="root">

        </div>
       
    </body>
</html>
