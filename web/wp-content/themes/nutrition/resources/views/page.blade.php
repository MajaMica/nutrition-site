@extends(\App\is_editions_page() ? 'layouts.shop' : 'layouts.app')

@section('content')

    @if (\App\is_editions_page())

        <section class="ed-page editions-container">

            @while (have_posts())
                @php(the_post())

                <header class="ed-page-header">
                    <span class="editions-label">Nemanja Editions</span>
                    <h1>{{ get_the_title() }}</h1>
                </header>

                <div class="ed-page-content">
                    @php(the_content())
                </div>

            @endwhile

        </section>

    @else

        @while (have_posts())
            @php(the_post())

            @include('partials.page-header')
            @includeFirst(['partials.content-page', 'partials.content'])

        @endwhile

    @endif

@endsection
