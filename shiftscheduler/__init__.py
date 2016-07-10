from pyramid.config import Configurator
from pyramid.session import SignedCookieSessionFactory


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_static_view('js', 'js')
    config.add_route('form', '/form');
    config.add_route('login', '/')
    config.add_route('logme', '/logme')
    config.add_route('home', '/home')
    config.add_route('home_json', '/home')
    config.add_route('scheduler', '/scheduler')
    config.add_route('personel', '/personel')
    config.add_route('reserve', '/reserve')

    my_session_factory = SignedCookieSessionFactory('shsch')
    config.set_session_factory(my_session_factory)
    config.scan()

    return config.make_wsgi_app()
